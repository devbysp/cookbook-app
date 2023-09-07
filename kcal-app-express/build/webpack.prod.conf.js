const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const CopyPlugin = require('copy-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const { resolve } = require('path');
const base = require('./webpack.base.conf');

base.mode = 'production';
base.plugins = [
  new webpack.ContextReplacementPlugin(
    /express\/lib/,
    resolve(__dirname, '../node_modules'),
    {
      cors: 'cors',
      winston: 'winston',
    },
  ),
  new CopyPlugin({
    patterns: [
      { context: 'src/database', from: 'certs', to: 'certs' },
      {
        context: 'env_vars', from: 'prodenv', to: '.env', toType: 'file',
      },
    ],
  }),
];
base.stats = {
  warningsFilter: /require\.extensions/,
};

module.exports = base;
