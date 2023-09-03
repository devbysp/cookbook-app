const { createTechnicalException } = require('../frameworks/database/db-utils');
const db = require('../frameworks/database/mysql-adapter');

const migration = require('../migration/2023_09_03_create_food_table');
const sql = require('./queries');

// TODO: This method will be turned into a general migration method. Insted of
//       just creating a table it will execute all kind of migration method.
async function createFoodTable() {
  return migration.createFoodTable();
}

async function getAllFoods() {
  return db.query(sql.SELECT_ALL_FOODS)
    .then(({ records }) => records)
    .catch((error) => {
      throw createTechnicalException('Failed to select foods from food table.', error);
    });
}

async function addNewFood(food) {
  return db.query(sql.INSERT_FOOD, [
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
      throw createTechnicalException(`Failed to insert new food '${food}'`, error);
    });
}

async function deleteFood(id) {
  return db.run(sql.DELETE_FOOD, id)
    .catch((error) => {
      throw createTechnicalException(`Failed to delete food with '${id}'`, error);
    });
}

module.exports = {
  createFoodTable,
  getAllFoods,
  addNewFood,
  deleteFood,
};
