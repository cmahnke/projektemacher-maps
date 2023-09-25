# syntax=docker/dockerfile:experimental


FROM --platform=linux/amd64 ghcr.io/cmahnke/map-data/central-europe:latest as central-europe
FROM --platform=linux/amd64 ghcr.io/cmahnke/map-data/goettingen:latest as goettingen
FROM --platform=linux/amd64 ghcr.io/cmahnke/map-data/sylt:latest as sylt
FROM ghcr.io/cmahnke/projektemacher-maps/viewer:latest as viewer

FROM nginx:alpine

LABEL maintainer="cmahnke@gmail.com"
LABEL org.opencontainers.image.source https://github.com/cmahnke/map-data

ENV DATA_DIR=/data \
    WEB_ROOT=/usr/share/nginx/html/

COPY --from=central-europe $DATA_DIR $WEB_ROOT/central-europe
COPY --from=goettingen $DATA_DIR $WEB_ROOT/goettingen
COPY --from=sylt $DATA_DIR $WEB_ROOT/sylt
COPY --from=viewer $WEB_ROOT $WEB_ROOT/
COPY conf/default.conf /etc/nginx/conf.d/

EXPOSE 80
