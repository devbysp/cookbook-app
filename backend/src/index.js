// Frameworks
const { app, logger } = require('./frameworks')

// Internal
const { withSlash } = require('./utils/path');
const foodTable = require('./datalayer/food/table');
const { validateNewFood } = require('./business/food/validation');

// Global
const basePath = withSlash(process.env.BASE_PATH);

/* -------------------------------------------------------------------------- *
 * API endpoints
 * -------------------------------------------------------------------------- */
app.get(`${basePath}/food`, (req, res) => {
  logger.debug(`GET ${req.url}`);

  foodTable.getAllFoods()
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

app.post(`${basePath}/food`, (req, res) => {
  logger.debug(`POST ${req.url} ${req.body}`);

  validateNewFood(req.body)
    .then((food) => {
      foodTable.addNewFood(res, food);
      res.send();
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.delete(`${basePath}/food/:id`, (req, res) => {
  logger.debug(`DELETE ${req.url}`);

  foodTable.deleteFood(req.params.id)
    .then(() => res.send());
});
