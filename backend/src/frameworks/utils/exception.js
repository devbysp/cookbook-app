function createException(message, error) {
  return new Error(message, { cause: error });
}

module.exports = {
  createException
};
