// Frameworks
const { query, createException } = require('../../frameworks');

// Internal
const sql = require('./queries');

async function getAllFoods() {
  return query(sql.SELECT_ALL_FOODS)
    .then(({ records }) => records)
    .catch((error) => {
      throw createException('Failed to select foods from food table.', error);
    });
}

async function addNewFood(food) {
  return query(sql.INSERT_FOOD, [
    food.foodName,
    food.kcal,
    food.fat,
    food.saturatedFat,
    food.carbs,
    food.sugar,
    food.fiber,
    food.protein,
  ])
    .catch((error) => {
      throw createException(`Failed to insert new food '${food}'`, error);
    });
}

async function deleteFood(id) {
  return query(sql.DELETE_FOOD, id)
    .catch((error) => {
      throw createException(`Failed to delete food with '${id}'`, error);
    });
}

module.exports = {
  getAllFoods,
  addNewFood,
  deleteFood,
};
