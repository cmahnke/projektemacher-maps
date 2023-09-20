# syntax=docker/dockerfile:experimental

ARG COVERAGE=central-europe

FROM --platform=linux/amd64 ghcr.io/cmahnke/map-action/data/${COVERAGE}:latest as data

FROM node:20-alpine as builder

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
LABEL org.opencontainers.image.source https://github.com/cmahnke/map-action

ENV DATA_DIR=/data \
    WEB_ROOT=/usr/share/nginx/html/

COPY --from=data $DATA_DIR $WEB_ROOT/
COPY --from=builder $WEB_ROOT/dist/ $WEB_ROOT/
COPY conf/default.conf /etc/nginx/conf.d/
