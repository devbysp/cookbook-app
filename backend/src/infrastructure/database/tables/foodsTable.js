// -----------------------------------------------------------------------------
// Adapts the access of the data in the food table to an interface used by the 
// application.
//
// Decouples the way that data is accessd in the database from the rest of the 
// code. This helps to switch easily to a different framework (for instance ORM)
// if needed. By doing such thing the rest of the code won't be affected.
// -----------------------------------------------------------------------------
const database = require('../adapters');
const sql = require('./foodsQueries');

async function getAllFoods() {
  return database.run(sql.SELECT_ALL_FOODS)
    .then(({ records }) => records)
    .catch((error) => {
      throw new Error('Failed to select foods from food table.', {cause: error});
    });
}

async function addNewFood(food) {
  return database.run(sql.INSERT_FOOD, [
    food.name,
    food.protein,
    food.fat,
    food.saturatedFat,
    food.carbs,
    food.sugar,
    food.fiber,
  ])
    .catch((error) => {
      throw new Error(`Failed to insert new food '${food}'`, {cause: error});
    });
}

async function deleteFood(id) {
  return database.run(sql.DELETE_FOOD, id)
    .catch((error) => {
      throw new Error(`Failed to delete food with '${id}'`, {cause: error});
    });
}

// Interface
module.exports = {
  getAllFoods,
  addNewFood,
  deleteFood,
};
