# Stage 1: Build dependencies
FROM node:16.13.1-alpine as base
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache --virtual build-base \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    python3 \
    make \
    g++ && yarn install && apk del build-base \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    python3 \
    make \
    g++

# Stage 2: Build app
FROM base as builder
COPY . .
RUN yarn build && rm -rf .babelrc fonts/ jsconfig.json locales/ utils/ tailwind.config.js postcss.config.js styles/ components/ assets/ scripts/ && npm prune --production && rm -rf ./node_modules/@hint \
./node_modules/@eslint \
./node_modules/@typescript-eslint \
./node_modules/@testing-library

# Stage 3: Serve app
LABEL author="Konstantinos Angelopoulos"
EXPOSE 1237
CMD yarn start
