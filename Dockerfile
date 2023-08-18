FROM node:latest

# Create app directory
WORKDIR /usr/src/kcal-app

# Install app dependencies
# A wildchar is used to ensure both package.json and package-lock.json are
# copied where available.
COPY package*.json ./

# Building code for production, otherwise
# RUN npm install
RUN npm ci --omit=dev

# Boundle app sources
COPY . .

# Expose the port on which the app listens
EXPOSE 8080

CMD ["node", "src/index.js"]
