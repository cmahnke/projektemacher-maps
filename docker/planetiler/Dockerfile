# syntax=docker/dockerfile:experimental

FROM maven:3-eclipse-temurin-19-focal AS builder

ENV BUILD_DEPS="git" \
    BUILD_DIR=/tmp/build \
    PLANETILER_GIT_URL=https://github.com/onthegomap/planetiler.git \
    PLANETILER_TAG=main \
    PLANETILER_DIR=/opt/planetiler

RUN --mount=target=/mnt/build-context \
    mkdir -p $BUILD_DIR $PLANETILER_DIR && \
# Install Planetiler
    cd $BUILD_DIR && \
    git clone --recurse-submodules $PLANETILER_GIT_URL --branch $PLANETILER_TAG --single-branch && \
    cd planetiler && \
    rm -rf planetiler-openmaptiles && \
    cp -r /mnt/build-context/dependencies/planetiler-openmaptiles . && \
    cp -r /mnt/build-context/dependencies/patches . && \
    cd planetiler-openmaptiles && \
    rm -rf .git && \
    git apply --ignore-space-change --ignore-whitespace ../patches/planetiler-openmaptiles-*.patch && \
    cd .. && \
    mvn -DskipTests=true clean install package && \
    mv planetiler-dist/target/*with-deps.jar $PLANETILER_DIR

FROM alpine:3.18

LABEL maintainer="cmahnke@gmail.com"
LABEL org.opencontainers.image.source https://github.com/cmahnke/map-tools

ENV RUN_DEPS="openjdk17-jre-headless" \
    PLANETILER_DIR=/opt/planetiler

COPY --from=builder $PLANETILER_DIR/*with-deps.jar $PLANETILER_DIR/

RUN apk --update upgrade && \
    apk add --no-cache $RUN_DEPS && \
    mkdir -p $PLANETILER_DIR/bin && \
    printf "#!/bin/sh\njava -Xmx2g -jar /opt/planetiler/planetiler*-with-deps.jar" > /opt/planetiler/bin/planetiler && \
    chmod +x /opt/planetiler/bin/planetiler && \
    export PATH=$PATH:$PLANETILER_DIR/bin && \
# Cleanup
    rm -rf /var/cache/apk/* /root/.cache
