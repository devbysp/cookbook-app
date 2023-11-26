const logger = require('./logger/logger');
const { withSlash } = require('./path/path');
const exception = require('./exception/exception');
const typecheck = require('./helper/typecheck');

module.exports = {
  ...exception,
  ...typecheck,
  withSlash,
  logger,
};
