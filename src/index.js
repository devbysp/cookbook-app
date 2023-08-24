const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const logger = require('./logger');

const { withSlash } = require('./helpers/utils');
const { validateNewFood } = require('./helpers/validation');
const { createFoodTable } = require('./database/migration');
const { getAllFoods, addNewFood, deleteFood } = require('./database/database');

const app = express();
const port = process.env.PORT || 8080;
// const server = process.env.SERVER || '*';
const basePath = withSlash(process.env.BASE_PATH || 'kcal-app');
const db = new sqlite3.Database('db/food.db');

/* -------------------------------------------------------------------------- *
 * Application configurations
 * -------------------------------------------------------------------------- */
app.use(cors());

// app.use(cors({
//   origin: `${server}`,
//   allowedHeaders: ['Origin', 'Content-Type', 'Authorization', 'Accept'],
//   maxAge: 600,
//   credentials: true,
// }));

// app.use((_req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Vary', 'Origin');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* -------------------------------------------------------------------------- *
 * Application init
 * -------------------------------------------------------------------------- */
app.listen(port, (res) => {
  logger.debug(`KCal app server is up. Listens on port: '${port}' base path: '${basePath}'.`);
  createFoodTable(res, db);
});

/* -------------------------------------------------------------------------- *
 * API endpoints
 * -------------------------------------------------------------------------- */
app.get(`${basePath}/food`, (req, res) => {
  logger.debug(`GET ${req.url}`);
  getAllFoods(res, db);
});

app.post(`${basePath}/food`, (req, res) => {
  logger.debug(`POST ${req.url} ${req.body}`);
  validateNewFood(
    req.body,
    () => addNewFood(res, db, req.body),
    (message) => {
      logger.debug({ message });
      res.status(400).send(message);
    },
  );
});

app.delete(`${basePath}/food/:id`, (req, res) => {
  logger.debug(`DELETE ${req.url}`);
  deleteFood(res, db, req.params.id);
});
