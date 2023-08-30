FROM node:18-alpine AS build_stage

WORKDIR /react-app/

COPY public/ /react-app/public
COPY package.json /react-app/
RUN npm install

COPY src/ /react-app/src
RUN npm run build


FROM nginx:1.25.2-alpine-slim AS deployed_stage

WORKDIR /react-app/
COPY --from=build_stage build/ /usr/share/nginx/html
