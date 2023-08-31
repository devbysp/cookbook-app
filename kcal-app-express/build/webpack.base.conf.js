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
  },
  externals: { sqlite3: 'commonjs sqlite3' },
};
