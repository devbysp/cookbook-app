// -----------------------------------------------------------------------------
// Adapts the express library to an interface used by the application.
//
// Configures and starts an express server, serving REST api calls with json 
// format.
// -----------------------------------------------------------------------------

const express = require('express');
const cors = require('cors');

const { logger, withSlash } = require('../../../utils');
const { terminate } = require('./terminate');

const app = express();
const port = process.env.PORT;
const basePath = withSlash(process.env.BASE_PATH);

// Application configurations
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Application init
const server = app.listen(port, () => {
  logger.info(`Cookbook app server is up. Listens on port: '${port}' and base path: '${basePath}'.`);
});

 // Error handling
const exitHandler = terminate(server);

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));

module.exports = app; 
