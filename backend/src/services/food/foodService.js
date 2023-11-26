const { foodsTable } = require('../../infrastructure/database');
const { GetAllFoodsDTO } = require('./DTO');
const { wrapException } = require('../../utils');

async function getAllFoods() {
  try {
    const foods = await foodsTable.getAllFoods();
    return foods.map(food => new GetAllFoodsDTO(food))
  } 
  catch(error) {
    throw wrapException('Get all foods from repository failed', error);
  }
}

module.exports = {
  getAllFoods
}
