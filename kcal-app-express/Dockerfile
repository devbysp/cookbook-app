FROM node:16.14.2-alpine

# Create app directory
WORKDIR /usr/src/kcal-app

# Boundle app sources
COPY dist/app.js* .

# Copy certificates
COPY dist/certs .

# Create mount folder for database
RUN mkdir db

CMD ["node", "app.js"]
