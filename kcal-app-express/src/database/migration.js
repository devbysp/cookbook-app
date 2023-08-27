const logger = require('../logger');
const queries = require('./queries');

function insertDefaultValues(db) {
  logger.info('Insert initial data into the database');
  db.run(queries.INSERT_INITIAL_DATA, (error) => {
    if (error) {
      logger.error(`Failed to insert initial data! ${error}`);
    }
  });
}

function execIfFoodTableEmpty(db, insertValues) {
  db.all(queries.COUNT_FOOD, (error, rows) => {
    if (error) {
      logger.error(`Failed to count foods in food table. ${error}`);
      return;
    }

    if (rows[0].cnt === 0) {
      logger.info('Food table is empty!');
      insertValues(db);
    }
  });
}

function createFoodTable(db) {
  db.run(queries.CREATE_TABLE_FOOD, (error) => {
    if (error) {
      logger.error(`Failed to create food table. ${error}`);
      return;
    }

    execIfFoodTableEmpty(db, insertDefaultValues);
  });
}

module.exports = {
  createFoodTable,
};
