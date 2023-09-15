FROM nginx:1.25.2-alpine-slim

ARG BASE_PATH
ARG BACKEND_BASE_PATH
ARG BACKEND_PORT

ENV REACT_APP_BACKEND_BASE_PATH=${BACKEND_BASE_PATH}
ENV REACT_APP_BACKEND_PORT=${BACKEND_PORT}

WORKDIR /usr/share/nginx/html/$BASE_PATH

COPY build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
