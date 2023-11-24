// -----------------------------------------------------------------------------
// foods
// -----------------------------------------------------------------------------
const SELECT_ALL_FOODS = 'SELECT * FROM foods';

const INSERT_FOOD = `
    INSERT INTO foods (name, protein, fat, saturated_fat, carbohidrates, sugar, dietary_fiber)
    VALUES ('?', ?, ?, ?, ?, ?, ?)
`;

const DELETE_FOOD = `
    DELETE FROM foods
    WHERE id = ?
`;

// Interface
module.exports = {
  SELECT_ALL_FOODS,
  INSERT_FOOD,
  DELETE_FOOD,
};
