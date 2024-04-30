# syntax=docker/dockerfile:experimental

FROM node:22-alpine as builder

ENV WEB_ROOT=/usr/share/nginx/html/

RUN --mount=target=/mnt/build-context \
    npm install --global esbuild-wasm && \
    mkdir -p $WEB_ROOT && \
    cp -ra /mnt/build-context/site/. $WEB_ROOT && \
    cd $WEB_ROOT && \
    yarn install && \
    yarn run build

FROM nginx:alpine

LABEL maintainer="cmahnke@gmail.com"
LABEL org.opencontainers.image.source https://github.com/cmahnke/map-data

ENV WEB_ROOT=/usr/share/nginx/html/

COPY --from=builder $WEB_ROOT/viewer/dist/. $WEB_ROOT/
COPY conf/default.conf /etc/nginx/conf.d/
