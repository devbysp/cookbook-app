# KCal App React

Hosting: http://devbysp.com/kcal-app-react

Github: https://github.com/devbysp/kcal-app

## Build & Run

### Local environment

1. Starting the server

   - Open the [.env](./kcal-app-express/.env) file and enter the correct password in the `DATABASE_PASSWD` evironment variable.
     ```env
     DATABASE_PASSWD='real-password'
     ```
   - Download the CA certificate of the database inside the inside [.certs](./kcal-app-express/src/database/.certs) folder under the name _portfolio-db-ca-certificate.crt_.
   - Go inside the folder [kcal-app-express](./kcal-app-express) and execute:
     ```bash
     npm start
     ```
   - The server will be available on http://localhost:4001/kcal-app/food.
   - The port _4001_ and the base path _kcal-app_ can be customized in the [package.json](./kcal-app-express/package.json)s _start_ script
     ```json
     "scripts": {
       "start": "cross-env PORT=4001 cross-env BASE_PATH=kcal-app node -r dotenv/config src/index.js"
     }
     ```

2. Starting the client
   - Go inside the folder [kcal-app-react](./kcal-app-react) and execute:
     ```bash
     npm start
     ```
   - The server will be available on http://localhost:3001/kcal-app-react.
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
