function withSlash(path) {
  const slash = (path.charAt(0) === '/') ? '' : '/';
  return `${slash}${path}`;
}

module.exports = {
  withSlash,
};
