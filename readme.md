# KCal App React

Hosting: https://devbysp.github.io/kcal-app-react

Github: https://github.com/devbysp/kcal-app

## Build & Run

### Local environment

1. Starting the server

- Open the [localevn](./kcal-app-express/env/localenv) file and enter the correct password in the `DATABASE_PASSWD` evironment variable.
  ```env
  ...
  DATABASE_PASSWD='realpassword'
  ...
  ```
- Create a _certs_ folder inside [database](./kcal-app-express/src/database) folder. Copy the CA certificate of the database inside the _certs_ folder under the name _portfolio-db-ca-certificate.crt_.
- Go inside the folder [kcal-app-express](./kcal-app-express) and execute:
  ```bash
  npm start
  ```
- The server will be available on http://localhost:4000/kcal-app/food.
- The port _4000_ and the base path _kcal-app_ can be customized in the [package.json](./kcal-app-express/package.json)s _start_ script
  ```json
   "scripts": {
     "prestart": "mkdirp ../db",
     "start": "cross-env PORT=4000 cross-env BASE_PATH=kcal-app cross-env DB=../db/food.db node src/index.js"
   }
  ```

2. Starting the client
   - Go inside the folder [kcal-app-react](./kcal-app-react) and execute:
     ```bash
     npm start
     ```
   - The server will be available on http://localhost:3000/kcal-app-react.
   - Depending on the domain on which you are running the client, a preconfigured endpoint will be selected. The endpoint configurantions can be found in the [endpoints-config.json](./kcal-app-react/src/endpoints-config.json) file.
   - The _localhost_ has no entry in the _endpoints-config.json_ it will use the default config. The default config can be set by changing the _envBaseUrl_:
     ```json
     "urls": {
       "baseUrl": "${envBaseUrl}/kcal-app",
       "envBaseUrl": "${localhost}"
     }
     ```
