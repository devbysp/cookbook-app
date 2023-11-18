const express = require('express');
const cors = require('cors');
const terminate = require('./helpers/terminate');
const logger = require('./helpers/logger/logger');

const db = require('./database');
const { withSlash } = require('./helpers/utils');
const { validateNewFood } = require('./helpers/validation');

const app = express();
const port = process.env.PORT;
const basePath = withSlash(process.env.BASE_PATH);

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
  logger.info(`Cookbook app server is up. Listens on port: '${port}' base path: '${basePath}'.`);
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

/* -------------------------------------------------------------------------- *
 * API endpoints
 * -------------------------------------------------------------------------- */
app.get(`${basePath}/food`, (req, res) => {
  logger.debug(`GET ${req.url}`);

  db.getAllFoods()
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

app.post(`${basePath}/food`, (req, res) => {
  logger.debug(`POST ${req.url} ${req.body}`);

  validateNewFood(req.body)
    .then((food) => {
      db.addNewFood(res, food);
      res.send();
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.delete(`${basePath}/food/:id`, (req, res) => {
  logger.debug(`DELETE ${req.url}`);

  db.deleteFood(req.params.id)
    .then(() => res.send());
});
