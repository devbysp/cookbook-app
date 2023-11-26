const sql = require('./foodsQueries');

function getFoodTable(database) {
  return {
    getAllFoods: async () => {
      try {
        const { rows } = await database.run(sql.SELECT_ALL_FOODS);
        return rows;
      } 
      catch(error) {
        throw wrapException('Failed to select foods from food table.', error);
      }
    }

  }
}

module.exports = {
  getAllFoods,
//  addNewFood,
//  deleteFood,
};
