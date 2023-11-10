const logger = require('./logger/logger');

function logErrorStack(error) {
  let errorIterator = error;
  logger.debug('--- Error Stack ----');

  while (errorIterator) {
    logger.debug(` ${errorIterator.message}`);
    errorIterator = errorIterator.cause;
  }

  logger.debug('--------------------');
}

function terminate(server, options = { coredump: false, timeout: 500 }) {
  // Exit function
  const exit = (code) => {
    if (options.coredump) {
      logger.debug('Process aborted');
      process.abort();
    } else {
      logger.debug('Server stopped');
      process.exit(code);
    }
  };

  // eslint-disable-next-line no-unused-vars
  return (_code, _reason) => (error, _promise) => {
    if (error && error instanceof Error) {
      logErrorStack(error);
      logger.debug('Shutting down server ...');
    }

    // Attempt a graceful shutdown
    server.close(exit);
    setTimeout(exit, options.timeout).unref();
  };
}

module.exports = terminate;
