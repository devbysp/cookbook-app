const mysql = require('mysql2/promise');
jest.mock('mysql2/promise');
const pool = {
  on: jest.fn(),
  getConnection: jest.fn(),
}
mysql.createPool.mockReturnValue(pool);

const logger = require('../../../../src/utils/logger/logger');
jest.mock('../../../../src/utils/logger/logger');
logger.debug.mockImplementation((message) => console.log(message)); 

const config = {
    connectionLimit: 10,
    waitForConnections: true,
    host: 'https://localhost',
    port: 3306,
    database: 'cookbook',
    user: 'testuser',
    password: 'passwd'
}

Object.defineProperty(process, 'env', {
  value: { 
    DATABASE_HOST: config.host,
    DATABASE_PORT: config.port,
    DATABASE_NAME: config.database,
    DATABASE_USER: config.user,
    DATABASE_PASSWD: config.password
  },
});

const db = require('../../../../src/infrastructure/database/adapters/mysql-adapter');

describe('MySQL adapter', () => {

  describe('import module', () => {
    test('on inporting the database adapter -> creates a connection pool', () => {
      expect(logger.debug).toBeCalledWith(JSON.stringify(config, undefined, 2));
      expect(mysql.createPool).toBeCalledWith(config);
    });
  });

  describe('connect and execute queries', () => {
    const sql = 'select * from foods';

    beforeEach(() => {
      logger.debug.mockClear();
    });

    test('when sql query is executed -> connection pool is accessed for a new connection', () => {
      db.run(sql);
      expect(pool.getConnection).toBeCalled();
    });

    test('if get connection fails -> throws and logs the exception', async () => {
      pool.getConnection.mockRejectedValue(new Error('error'));
      await expect(db.run(sql)).rejects.toThrow('Error getting a connection from connection pool.');
      await expect(logger.debug).toHaveBeenCalledWith('Error: Error getting a connection from connection pool.');
    });
  });

});
