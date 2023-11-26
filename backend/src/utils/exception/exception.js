const { isFunction } = require('../helper/typecheck');

function withExceptionHandling(fn, message) {

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
        return await fn(...args);
      }
      catch(error) {
        throw createError(message, error);
      }
    }
  }

  throw new Error('Not a function');
}

module.exports = {
  withExceptionHandling
}
