FROM maven:3-eclipse-temurin-21 AS builder

LABEL maintainer="cmahnke@gmail.com"
LABEL org.opencontainers.image.source=https://github.com/cmahnke/map-tools

ENV BUILD_DEPS="git" \
    BUILD_DIR=/tmp/build \
    PLANETILER_DIR=/opt/planetiler

RUN --mount=target=/mnt/build-context \
    apt-get update && apt-get upgrade -y && \
    apt-get install -y $BUILD_DEPS $RUN_DEPS && \
    mkdir -p $BUILD_DIR $PLANETILER_DIR && \
# Install Planetiler Openmaptiles
    cd $BUILD_DIR && \
    cp -r /mnt/build-context/dependencies/planetiler-openmaptiles . && \
    cp -r /mnt/build-context/dependencies/patches . && \
    cd planetiler-openmaptiles && \
    rm -rf .git && \
    git apply --ignore-space-change --ignore-whitespace ../patches/planetiler-openmaptiles-*.patch && \
    mvn -DskipTests=true clean install package && \
    mv /root/.m2/repository/org/openmaptiles/planetiler-openmaptiles $PLANETILER_DIR && \
# Cleanup
    rm -rf $BUILD_DIR /root/.m2 && \
    apt-get remove -y $BUILD_DEPS && \
    apt-get clean autoclean && \
    apt-get autoremove --yes && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT /usr/bin/bash
