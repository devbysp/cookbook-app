const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const { withSlash } = require('./helpers/utils');
const { validateNewFood } = require('./helpers/validation');
const { createFoodTable } = require('./database/migration');
const { getAllFoods, addNewFood, deleteFood } = require('./database/database');

const app = express();
const port = process.env.PORT || 8080;
const basePath = withSlash(process.env.BASE_PATH || 'kcal-app');
const db = new sqlite3.Database('db/food.db');

/* -------------------------------------------------------------------------- *
 * Application configurations
 * -------------------------------------------------------------------------- */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* -------------------------------------------------------------------------- *
 * Application init
 * -------------------------------------------------------------------------- */
const sslServer = https.createServer({
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem'),
}, app);

sslServer.listen(port, (res) => {
  console.debug(`KCal app server is up. Base path is '${basePath}'. Listens on port ${port}`);
  createFoodTable(res, db);
});

/* -------------------------------------------------------------------------- *
 * API endpoints
 * -------------------------------------------------------------------------- */
app.get(`${basePath}/food`, (req, res) => {
  console.debug('GET', req.url);
  getAllFoods(res, db);
});

app.post(`${basePath}/food`, (req, res) => {
  console.debug('POST', req.url, req.body);
  validateNewFood(
    req.body,
    () => addNewFood(res, db, req.body),
    (message) => {
      console.debug({ message });
      res.status(400).send(message);
    },
  );
});

app.delete(`${basePath}/food/:id`, (req, res) => {
  console.debug('DELETE', req.url);
  deleteFood(res, db, req.params.id);
});
