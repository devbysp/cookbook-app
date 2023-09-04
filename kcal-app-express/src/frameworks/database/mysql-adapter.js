const fs = require('fs');
const mysql = require('mysql');
const logger = require('../logger/logger');
const { createTechnicalException } = require('./db-utils');

// Two calls to query(sql) may use two different connections and run in parallel
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWD,
  database: process.env.DATABASE_NAME,
  ssl: {
    ca: fs.readFileSync(`${__dirname}/../../../certs/portfolio-db-ca-certificate.crt`),
  },
});

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
        reject(createTechnicalException('Error getting a connection from connection pool.', connectionError));
      }

      connection.query(sql, params, (error, records, fields) => {
        connection.release();
        if (error) {
          reject(createTechnicalException(`Error executing query. '${sql}'`, error));
        }

        logger.debug(`SQL was executed successfully: '${sql}'`);
        resolve({ records, fields });
      });
    });
  });
}

module.exports = {
  query,
};
