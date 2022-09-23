# # Stage 1: Build dependencies
# FROM node:16.13.1-alpine as base
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN apk add --no-cache --virtual build-base \
#     jpeg-dev \
#     cairo-dev \
#     giflib-dev \
#     pango-dev \
#     python3 \
#     make \
#     g++ && yarn install && apk del build-base \
#     jpeg-dev \
#     cairo-dev \
#     giflib-dev \
#     pango-dev \
#     python3 \
#     make \
#     g++

# # Stage 2: Build app
# FROM base as builder
# COPY . .
# RUN yarn build && npm prune --production

# # Stage 3: Serve app
# LABEL author="Konstantinos Angelopoulos"
# EXPOSE 1237
# CMD yarn start

FROM node:alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

FROM node:alpine AS sourcer
RUN apk update
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build test --scope=web --includeDependencies --no-deps

LABEL author="Konstantinos Angelopoulos"
EXPOSE 1237
cmd yarn start
