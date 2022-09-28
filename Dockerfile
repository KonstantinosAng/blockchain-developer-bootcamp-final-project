# Stage 1: Make apps distinct
FROM node:alpine AS builder
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=crypto-lottery --docker

# Stage 2: Isntall dependencies
FROM node:alpine AS installer
RUN apk update && apk add --no-cache git openssh
WORKDIR /app
# Add lockfile and package.json's of isolated subworkspace
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
# First install the dependencies (as they change less often)
RUN yarn install


# Stage 3: Build the project
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/packages/tailwindcss-config ./packages/tailwindcss-config
COPY turbo.json turbo.json

RUN yarn turbo run build --scope=crypto-lottery --no-deps

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/crypto-lottery/next.config.js ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/crypto-lottery/package.json ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/crypto-lottery/.next ./.next
COPY --from=installer --chown=nextjs:nodejs /app/node_modules ./node_modules/
COPY --from=installer --chown=nextjs:nodejs /app/packages/ui/ ./packages/ui/

LABEL author="Konstantinos Angelopoulos"
EXPOSE 1237
CMD yarn start
