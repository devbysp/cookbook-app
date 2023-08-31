const webpack = require('webpack');
const { resolve } = require('path');
const base = require('./webpack.base.conf');

base.mode = 'production';
base.plugins = [
  new webpack.ContextReplacementPlugin(
    /express\/lib/,
    resolve(__dirname, '../node_modules'),
    {
      cors: 'cors',
      sqlite3: 'sqlite3',
      winston: 'winston',
      express: 'express',
    },
  ),
];
base.stats = {
  warningsFilter: /require\.extensions/,
};

module.exports = base;
