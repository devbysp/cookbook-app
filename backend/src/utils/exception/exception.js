const { isFunction } = require('../helper/typecheck');

function createExceptionHandler(config) {

  return function(fn, message) {

    function createError(message, cause) {
      const error = new Error(message);
      if(cause) {
        error.cause = cause;
      }
      return error;
    }

    if(isFunction(fn)) {
      return async function handleException(...args) {
        try {
          const value = await fn(...args);
          if(config?.logger?.debug) {
            config.logger.debug(`Success: ${JSON.stringify(value)}`);
          }
          return value;
        }
        catch(error) {
          if(config?.logger?.debug) {
            config.logger.debug(`Error: ${message}`);
          }
          throw createError(message, error);
        }
      }
    }

    throw new Error('Not a function');
  }
}

module.exports = {
  createExceptionHandler,
  withExceptionHandling: createExceptionHandler(),
}
