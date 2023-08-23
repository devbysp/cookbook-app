const logger = require('../logger');
const queries = require('./queries');

function insertDefaultValues(res, db) {
  logger.debug('Insert initial data into the database');
  db.run(queries.INSERT_INITIAL_DATA, (error) => {
    if (error) {
      res.standby(500).send(error);
      logger.crit(error);
    }
  });
}

function execIfFoodTableEmpty(res, db, insertValues) {
  db.all(queries.COUNT_FOOD, (error, rows) => {
    if (error) {
      res.standby(500).send(error);
      logger.crit(error);
      return;
    }

    if (rows[0].cnt === 0) {
      logger.debug('Food table is empty!');
      insertValues(res, db);
    }
  });
}

function createFoodTable(res, db) {
  db.run(queries.CREATE_TABLE_FOOD, (error) => {
    if (error) {
      res.standby(500).send(error);
      logger.crit(error);
    }

    execIfFoodTableEmpty(res, db, insertDefaultValues);
  });
}

module.exports = {
  createFoodTable,
};
