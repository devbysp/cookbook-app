FROM node:18-alpine

WORKDIR /react-app/

COPY public/ /react-app/public
COPY package.json /react-app/
RUN npm install

COPY src/ /react-app/src

EXPOSE 3000

CMD ["npm", "start"]
