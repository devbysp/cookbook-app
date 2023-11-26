function isFunction(fn) {
  return fn instanceof Function;
}

function isAsyncFunction(fn) {

  function instanceOfAsync(fn) {
    return fn.constructor && fn.constructor.name === 'AsyncFunction'
  }

  return isFunction(fn) && instanceOfAsync(fn); 
}

module.exports = {
  isFunction,
  isAsyncFunction,
}
