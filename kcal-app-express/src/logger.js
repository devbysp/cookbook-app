const winston = require('winston');
const app = require('./.logger.config');

// Set up logger
const customColors = {
  trace: 'white',
  debug: 'green',
  info: 'green',
  warn: 'yellow',
  crit: 'red',
  fatal: 'red',
};

const myformat = winston.format.combine(
  winston.format.cli({ colors: customColors }),
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  level: app.settings.logLevel,
  transports: [
    new (winston.transports.Console)({
      format: myformat,
    }),
    // new (winston.transports.File)({ filename: 'server.log' }),
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
    logger.trace('testing');
    logger.debug('testing');
    logger.info('testing');
    logger.warn('testing');
    logger.error('testing');
    logger.fatal('testing');
*/

module.exports = logger;
