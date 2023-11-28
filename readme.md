# KCal App React

Hosting: http://devbysp.com/kcal-app-react

Github: https://github.com/devbysp/kcal-app

## Architecture

This section describes the architecture of this application.

- [Data model](doc/datamodel/readme-datamodel.md)
- [Backend architecture](doc/backend/readme-backend.md)

## Build & Run

### Local dev environment

1. Starting the server

   - Open the [.env](./kcal-app-express/.env) file and enter the correct password in the `DATABASE_PASSWD` evironment variable.
     ```env
     DATABASE_PASSWD='real-password'
     ```
   - Download the CA certificate of the database inside the [.certs](./kcal-app-express/src/database/.certs) folder under the name _portfolio-db-ca-certificate.crt_.
   - Go inside the folder [kcal-app-express](./kcal-app-express) and execute:
     ```bash
     npm install
     npm start
     ```
   - The server will be available on http://localhost:4001/kcal-app-backend/food.
   - The port _4001_ and the base path _kcal-app-backend_ can be customized in the [package.json](./kcal-app-express/package.json)s _start_ script
     ```json
     "scripts": {
       "start": "cross-env PORT=4001 cross-env BASE_PATH=kcal-app-backend node -r dotenv/config src/index.js"
     }
     ```

2. Starting the client
   - Go inside the folder [kcal-app-react](./kcal-app-react) and execute:
     ```bash
     npm install
     npm start
     ```
   - The client app will be available on http://localhost:3001.
   - Depending on the domain on which you are running the client, a preconfigured endpoint will be selected. The endpoint configurantions can be found in the [endpoints-config.json](./kcal-app-react/src/endpoints-config.json) file.
   - The _localhost_ has no entry in the _endpoints-config.json_ it will use the default config. The default config can be set by changing the _envBaseUrl_:
     ```json
     "urls": {
       "baseUrl": "${envBaseUrl}/${BACKEND_BASE_PATH}",
       "envBaseUrl": "${localhost}"
     },
     ```
   - The `${BACKEND_BASE_PATH}` in the _endpoints-config.json_ will be replaced by the value `REACT_APP_BACKEND_BASE_PATH` from [.env](./kcal-app-react/.env)
   - The port _3001_ and the base path _kcal-app-react_ can be customized in the [package.json](./kcal-app-react/package.json)s _start_ script
     ```json
     "scripts": {
       "start": "cross-env PORT=3001 react-scripts start"
     },
     ```

### Prod docker environment

1. Building the server

   - Open the [.env](./kcal-app-express/.env) file and enter the correct password in the `DATABASE_PASSWD` evironment variable.
     ```env
     DATABASE_PASSWD='real-password'
     ```
   - Download the CA certificate of the database inside the [.certs](./kcal-app-express/src/database/.certs) folder under the name _portfolio-db-ca-certificate.crt_.
   - Go inside the folder [kcal-app-express](./kcal-app-express) and execute:
     ```bash
     npm install
     npm run build
     ```

2. Building the client

   - Go inside the folder [kcal-app-react](./kcal-app-react) and execute:
     ```bash
     npm install
     npm run build
     ```

3. Build & Run docker containers

   - Go inside the porject root folder [kcal-app](./) and execute:
     ```bash
     docker-compose -f compose.yaml up --build -d
     ```
   - Starting the docker containers with _docker-compose_ has the advantage that a docker network will be also created and the containers will be wired up.

4. Opening the app from browser

   - The server will be available on http://devbysp.com/kcal-app-backend/food.
   - The url base path _kcal-app-backend_ should be configured in the following files:

     - _compose.yaml_
       ```yaml
       backend:
         args:
           BASE_PATH: "kcal-app-backend"
       frontend:
         args:
           BACKEND_BASE_PATH: "kcal-app-backend"
       ```
     - _nginx/nginx.conf_

       ```yaml
       location /kcal-app-backend/food {

       }
       ```

   - The client app will be available on http://devbysp.com/kcal-app.
   - The url base path _kcal-app_ should be configured in the following files:

     - _compose.yaml_
       ```yaml
       frontend:
         args:
           BASE_PATH: "kcal-app"
       ```
     - _kcal-app-react/package.json_
       ```yaml
       "homepage": "http://devbysp.com/kcal-app"
       ```
     - _nginx/nginx.conf_

       ```yaml
       location /kcal-app {

       }
       ```

### Local docker environment

In case the app is deployed on a _local docker environment_, every step is the same as deploying it on the _prod docker enviroment_, except that an additional 5th step needs to be done:

5. Add to your _hosts_ file the following entry:
   ```
   127.0.0.1   devbysp.com
   ```
   Because of the _homepage_ entry in the _kcal-app-react/package.json_ the app expects, that it is hosted on the _devbysp.com_ domain. The entry in the _hosts_ file simulates app hosted on _devbysp.com_ domain.
