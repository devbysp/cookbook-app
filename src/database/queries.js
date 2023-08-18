/* -------------------------------------------------------------------------- *
 * Migration scripts
 * -------------------------------------------------------------------------- */
const CREATE_TABLE_FOOD = `
    CREATE TABLE IF NOT EXISTS food (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        foodName VARCHAR(255) NOT NULL,
        kcal INTEGER NOT NULL,
        fat REAL NOT NULL,
        saturatedFat REAL NOT NULL,
        carbs REAL NOT NULL,
        sugar REAL NOT NULL,
        fiber REAL NOT NULL,
        protein REAL NOT NULL
    )
`;

const INSERT_INITIAL_DATA = `
    INSERT INTO food (foodName, kcal, fat, saturatedFat, carbs, sugar, fiber, protein)
    VALUES ('Coocked Broccoli', 35, 4, 0, 7.2, 1.4, 3.3, 2.4),
           ('Lemon Chicker', 226, 11.8, 1.9, 19.1, 8.7, 1.1, 10.8),
           ('Corn', 106, 2.1, 1.1, 21.9, 0, 0, 3.1),
           ('Sushi Salmon', 180, 8.1, 1.8, 13, 2, 0, 13)
`;

const COUNT_FOOD = 'SELECT COUNT(*) as cnt FROM food';

/* -------------------------------------------------------------------------- *
 * Application data manipulation scripts
 * -------------------------------------------------------------------------- */
const SELECT_ALL_FOODS = 'SELECT * FROM food';

const INSERT_FOOD = (foodName, kcal, fat, saturatedFat, carbs, sugar, fiber, protein) => (`
    INSERT INTO food (foodName, kcal, fat, saturatedFat, carbs, sugar, fiber, protein)
    VALUES ('${foodName}', ${kcal}, ${fat}, ${saturatedFat}, ${carbs}, ${sugar}, ${fiber}, ${protein})
`);

const DELETE_FOOD = (id) => (`
    DELETE FROM food
    WHERE id = ${id}
`);

/* -------------------------------------------------------------------------- *
 * Export
 * -------------------------------------------------------------------------- */
module.exports = {
  CREATE_TABLE_FOOD,
  COUNT_FOOD,
  SELECT_ALL_FOODS,
  INSERT_INITIAL_DATA,
  INSERT_FOOD,
  DELETE_FOOD,
};
