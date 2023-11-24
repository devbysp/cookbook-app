const { foodsTable } = require('../../infrastructure/database');
const { GetAllFoodsDTO } = require('./DTO');

async function getAllFoods() {
  return foodsTable.getAllFoods()
    .then((foods) => {
        foods.map(food => new GetAllFoodsDTO(food))
    })
    .catch((error) => {
      throw new Error('Get all foods from repository failed', {cause: error})
    })
}

module.exports = {
  getAllFoods
}
