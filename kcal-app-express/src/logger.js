const winston = require('winston');
const app = require('./.logger.config');

// Set up logger
const customColors = {
  debug: 'blue',
  info: 'green',
  warn: 'yellow',
  error: 'red',
};

const customFormat = winston.format.combine(
  winston.format.cli({ colors: customColors }),
  winston.format.timestamp({
    format: 'YYYY-MM-DD - hh:mm:ss - SSS',
  }),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  level: app.settings.logLevel,
  format: customFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' }),
  ],
});

winston.addColors(customColors);

// Extend logger object to properly log 'Error' types
const origLog = logger.log;
logger.log = (level, msg) => {
  const objType = Object.prototype.toString.call(msg);
  if (objType === '[object Error]') {
    origLog.call(logger, level, msg.toString());
  } else {
    origLog.call(logger, level, msg);
  }
};

/* LOGGER EXAMPLES
    logger.debug('testing');
    logger.info('testing');
    logger.warn('testing');
    logger.error('testing');
*/

module.exports = logger;
