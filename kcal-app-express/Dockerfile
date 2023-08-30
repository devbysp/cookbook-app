FROM node:16.14.2-alpine

# Create app directory
WORKDIR /usr/src/kcal-app

# Boundle app sources
COPY build/bundle.js bundle.js

CMD ["node", "bundle.js"]
