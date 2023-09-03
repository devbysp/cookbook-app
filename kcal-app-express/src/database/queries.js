/* -------------------------------------------------------------------------- *
 * Application data manipulation scripts
 * -------------------------------------------------------------------------- */
const SELECT_ALL_FOODS = 'SELECT * FROM food';

const INSERT_FOOD = `
    INSERT INTO food (foodName, kcal, fat, saturatedFat, carbs, sugar, fiber, protein)
    VALUES ('?', ?, ?, ?, ?, ?, ?, ?)
`;

const DELETE_FOOD = `
    DELETE FROM food
    WHERE id = ?
`;

/* -------------------------------------------------------------------------- *
 * Export
 * -------------------------------------------------------------------------- */
module.exports = {
  SELECT_ALL_FOODS,
  INSERT_FOOD,
  DELETE_FOOD,
};
