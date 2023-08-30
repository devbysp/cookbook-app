FROM node:16.14.2-alpine

# Create app directory
WORKDIR /usr/src/kcal-app

# Install app dependencies
# A wildchar is used to ensure both package.json and package-lock.json are
# copied where available.
COPY package*.json .

# Building code for production, otherwise
# RUN npm install
RUN npm ci --omit=dev

# Sqlite can not create the database folder. It needs to exist already.
RUN mkdir db

# Boundle app sources
COPY . .

# Expose the port on which the app listens
EXPOSE 4000

CMD ["node", "src/index.js"]
