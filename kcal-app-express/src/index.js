const express = require('express');
const cors = require('cors');
const logger = require('./frameworks/logger/logger');

const db = require('./database/data-access-layer');
const { withSlash } = require('./helpers/utils');
const { validateNewFood } = require('./helpers/validation');
const { createTechnicalException } = require('./frameworks/database/db-utils');

const server = express();
const port = process.env.BACKEND_PORT;
const basePath = withSlash(process.env.BACKEND_BASE_PATH);

/* -------------------------------------------------------------------------- *
 * Application configurations
 * -------------------------------------------------------------------------- */
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* -------------------------------------------------------------------------- *
 * Application init
 * -------------------------------------------------------------------------- */
server.listen(port, () => {
  logger.info(`KCal app server is up. Listens on port: '${port}' base path: '${basePath}'.`);
  db.createFoodTable()
    .catch((error) => {
      throw createTechnicalException('Unexpected error occured. Server listening stops!', error);
    });
});

/* -------------------------------------------------------------------------- *
 * API endpoints
 * -------------------------------------------------------------------------- */
server.get(`${basePath}/food`, (req, res) => {
  logger.debug(`GET ${req.url}`);

  db.getAllFoods()
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

server.post(`${basePath}/food`, (req, res) => {
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

server.delete(`${basePath}/food/:id`, (req, res) => {
  logger.debug(`DELETE ${req.url}`);

  db.deleteFood(req.params.id)
    .then(() => res.send());
});
