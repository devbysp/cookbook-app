const mysql = require('mysql2');
const { createException, logger } = require('..');

// Two calls to query(sql) may use two different connections and run in parallel
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

async function query(sql, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(createException('Error getting a connection from connection pool.', connectionError));
        return;
      }

      connection.query(sql, params, (queryError, records, fields) => {
        connection.release();
        if (queryError) {
          reject(createException(`Error executing query. '${sql}'`, queryError));
          return;
        }

        logger.debug(`SQL was executed successfully: '${sql}'`);
        resolve({ records, fields });
      });
    });
  });
}

module.exports = {
  query
};
