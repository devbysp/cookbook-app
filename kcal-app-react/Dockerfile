FROM nginx:1.25.2-alpine-slim

WORKDIR /usr/share/nginx/html
COPY build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
