FROM nginx:1.25.2-alpine-slim

ARG BASE_PATH

WORKDIR /usr/share/nginx/html/${BASE_PATH}
COPY build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
