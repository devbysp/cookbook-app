FROM node:16.14.2-alpine

# Create app directory
WORKDIR /usr/src/kcal-app

# Boundle app sources
COPY build/app.js* .

# Copy certificates
COPY build/.certs .certs

ARG BASE_PATH
ARG PORT

ENV BASE_PATH=${BASE_PATH}
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["node", "app.js"]
