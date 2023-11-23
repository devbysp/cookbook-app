// Libraries
const express = require('express');
const cors = require('cors');

// Frameworks
const { logger } = require('..');

// Internal
const { terminate } = require('./terminate');

// Globals
const app = express();
const port = process.env.PORT;

/* -------------------------------------------------------------------------- *
 * Application configurations
 * -------------------------------------------------------------------------- */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* -------------------------------------------------------------------------- *
 * Application init
 * -------------------------------------------------------------------------- */
const server = app.listen(port, () => {
  logger.info(`Cookbook app server is up. Listens on port: '${port}'.`);
});

/* -------------------------------------------------------------------------- *
 * Error handling
 * -------------------------------------------------------------------------- */
const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500,
});

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));

exports.module = { app }
