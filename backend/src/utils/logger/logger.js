const winston = require('winston');
const { customColors, logLevel } = require('./.logger.config');

const customFormat = winston.format.combine(
  winston.format.cli({ colors: customColors }),
  winston.format.timestamp({
    format: 'YYYY-MM-DD - hh:mm:ss - SSS',
  }),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  level: logLevel,
  format: customFormat,
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'server.log' }),
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

module.exports = logger;
