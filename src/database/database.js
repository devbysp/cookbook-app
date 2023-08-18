const queries = require('./queries');

function getAllFoods(res, db) {
  db.all(queries.SELECT_ALL_FOODS, (error, foods) => {
    if (error) {
      res.status(500).send(error);
      console.error(error);
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
      res.status(500).send(error);
      console.error(error);
      return;
    }
    res.send();
  });
}

function deleteFood(res, db, id) {
  db.run(queries.DELETE_FOOD(id), (error) => {
    if (error) {
      res.status(500).send(error);
      console.error(error);
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
