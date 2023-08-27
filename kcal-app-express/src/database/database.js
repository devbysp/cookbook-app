const logger = require('../logger');
const queries = require('./queries');

function getAllFoods(res, db) {
  db.all(queries.SELECT_ALL_FOODS, (error, foods) => {
    if (error) {
      logger.error(`Failed to select foods from food table. Reason: ${error}`);
      res.status(500).send(error);
      return;
    }

    res.send(foods);
  });
}

function addNewFood(res, db, food) {
  db.run(queries.INSERT_FOOD(
    food.foodName,
    food.kcal,
    food.fat,
    food.saturatedFat,
    food.carbs,
    food.sugar,
    food.fiber,
    food.protein,
  ), (error) => {
    if (error) {
      logger.error(`Faield to insert new food. Reason: ${error}`);
      res.status(500).send(error);
      return;
    }
    res.send();
  });
}

function deleteFood(res, db, id) {
  db.run(queries.DELETE_FOOD(id), (error) => {
    if (error) {
      logger.error(`Failed to delete food. Reason: ${error}`);
      res.status(500).send(error);
      return;
    }
    res.send();
  });
}

module.exports = {
  getAllFoods,
  addNewFood,
  deleteFood,
};
