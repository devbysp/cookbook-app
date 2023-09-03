const db = require('../frameworks/database/mysql-adapter');
const logger = require('../frameworks/logger/logger');
const { createTechnicalException } = require('../frameworks/database/db-utils');

/* -------------------------------------------------------------------------- *
 * Migration queries
 * -------------------------------------------------------------------------- */
const CREATE_TABLE_FOOD = `
    CREATE TABLE IF NOT EXISTS food (
        id            INT             NOT NULL    AUTO_INCREMENT,
        foodName      VARCHAR(255)    NOT NULL,
        kcal          INT             NOT NULL,
        fat           FLOAT           NOT NULL,
        saturatedFat  FLOAT           NOT NULL,
        carbs         FLOAT           NOT NULL,
        sugar         FLOAT           NOT NULL,
        fiber         FLOAT           NOT NULL,
        protein       FLOAT           NOT NULL,
        PRIMARY KEY (id)
    )
`;

const INSERT_INITIAL_DATA = `
    INSERT INTO food 
          (foodName,            kcal,   fat,  saturatedFat,   carbs,  sugar,  fiber,  protein)
    VALUES 
          ('Coocked Broccoli',    35,   4.0,             0,     7.2,    1.4,    3.3,     2.4),
          ('Lemon Chicker',      226,  11.8,           1.9,    19.1,    8.7,    1.1,    10.8),
          ('Corn',               106,   2.1,           1.1,    21.9,      0,      0,     3.1),
          ('Sushi Salmon',       180,   8.1,           1.8,    13.0,    2.0,      0,    13.0)
`;

const COUNT_FOOD = 'SELECT COUNT(*) as cnt FROM food';

/* -------------------------------------------------------------------------- *
 * Migration methods
 * -------------------------------------------------------------------------- */
async function insertDefaultValues() {
  logger.info('Inserting initial data into database ...');

  return db.query(INSERT_INITIAL_DATA)
    .then(() => {
      logger.info('Initial data has been inserted into food table!');
    })
    .catch((error) => {
      throw createTechnicalException('Failed to insert initial data!', error);
    });
}

async function execIfFoodTableEmpty(insertValues) {
  logger.info('Checking food table ...');

  return db.query(COUNT_FOOD)
    .then((count) => {
      if (!count) {
        logger.info('Food table is empty!');
        return insertValues(db);
      }

      return logger.info('Food table already exists and has content!');
    })
    .catch((error) => {
      throw createTechnicalException('Error checking if food table is empty!', error);
    });
}

async function createFoodTable() {
  return db.query(CREATE_TABLE_FOOD)
    .then(() => execIfFoodTableEmpty(insertDefaultValues))
    .catch((error) => {
      throw createTechnicalException('Error creating food table', error);
    });
}

/* -------------------------------------------------------------------------- *
 * Exports
 * -------------------------------------------------------------------------- */
module.exports = {
  createFoodTable,
};
