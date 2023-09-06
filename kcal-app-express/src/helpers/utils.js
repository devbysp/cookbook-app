const logger = require('./logger/logger');

function withSlash(path) {
  const slash = (path.charAt(0) === '/') ? '' : '/';
  return `${slash}${path}`;
}

function createTechnicalException(message, error) {
  logger.error(message);
  return new Error(message, { cause: error, type: 'technical' });
}

function createBusinessException(message, error) {
  logger.warning(message);
  return new Error(message, { cause: error, type: 'business' });
}

module.exports = {
  withSlash,
  createTechnicalException,
  createBusinessException,
};
