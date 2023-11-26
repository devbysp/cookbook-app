const { logger } = require('../../../utils');

function logErrorStack(error, reason, code) {
  let errorIterator = error;

  logger.debug('--- Error Stack -----------------------------------------------------------------');
  logger.error(`${reason} {error code: ${code}}`)

  while (errorIterator) {
    logger.error(`${errorIterator.message}`);
    errorIterator = errorIterator.cause;
  }

  logger.debug('---------------------------------------------------------------------------------');
}

function terminate(server, options = { coredump: false, timeout: 500 }) {
  
  // Exit function
  const exit = (code) => {
    if (options.coredump) {
      logger.warn('Process aborted');
      process.abort();
    } 
    else {
      logger.warn('Server stopped');
      process.exit(code);
    }
  };

  return (code, reason) => (error, _promise) => {
    if (error && error instanceof Error) {
      logErrorStack(error, reason, code);
      logger.warn('Shutting down server ...');
    }

    // Attempt a graceful shutdown
    server.close(exit);
    setTimeout(exit, options.timeout).unref();
  };
}

module.exports = { terminate };
