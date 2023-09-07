const { resolve } = require('path');

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: ['./src/index.js'],
  output: {
    filename: 'app.js',
    path: resolve(__dirname, './../dist'),
    clean: true,
  },
  // Webpack (in production mode) is putting your code through a minimiser, and
  // the mysql module that serverless-mysql is using is not compatible with
  // minimising.
  optimization: {
    minimize: false,
  },
};
