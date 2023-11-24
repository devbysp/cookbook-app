// -----------------------------------------------------------------------------
// Adapts the mysql2 library to an interface used by the application. 
//
// This application uses the database in a old fashioned way by not using ORM.
// In order to be able to switch easily to another database the mysql library
// is adapted to the interface used by the application.
// -----------------------------------------------------------------------------
const mysql = require('mysql2');
const { logger } = require('../../../utils');

// Two different calls to query(sql), may use two different connections and run
// in parallel
const connectionData = {
  connectionLimit: 10,
  waitForConnections: true,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWD,
};

logger.debug(JSON.stringify(connectionData, undefined, 2));
const pool = mysql.createPool(connectionData);

pool.on('acquire', (connection) => {
  logger.debug(`Connection ${connection.threadId} acquired`);
});

pool.on('release', (connection) => {
  logger.debug(`Connection ${connection.threadId} released`);
});

async function run(sql, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(new Error('Error getting a connection from connection pool.', {cause: connectionError}));
        return;
      }

      connection.query(sql, params, (queryError, records, fields) => {
        connection.release();
        if (queryError) {
          reject(new Error(`Error executing query. '${sql}'`, {cause: queryError}));
          return;
        }

        logger.debug(`SQL was executed successfully: '${sql}'`);
        resolve({ records, fields });
      });
    });
  });
}

module.exports = {
  run
};
