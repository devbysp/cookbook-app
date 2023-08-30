FROM node:16.14.2-alpine

# Create app directory
WORKDIR /usr/src

COPY package.json package.json

# Boundle app sources
COPY build/index.js kcal-app/index.js

CMD ["node", "kcal-app/index.js"]
