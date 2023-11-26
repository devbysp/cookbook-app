const mysql = require('mysql2/promise');
const { 
  logger, 
  createTechnicalException,
  createCriticalException
} = require('../../../utils');

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
  try {
    const connection = await pool.getConnection();
    try {
      const [rows, fields] = connection.query(sql, params);

      logger.debug(`SQL was executed successfully: '${sql}'`);
      return { rows, fields };
    } 
    catch(error) {
      throw createTechnicalException(`Error executing query. '${sql}'`, error);
    }
  } 
  catch(error) {
    throw createCriticalException('Error getting a connection from connection pool.', error);
  }
}

module.exports = {
  run
};
