const CopyPlugin = require('copy-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const base = require('./base.config');

base.mode = 'production';
base.plugins = [
  ...base.plugins,
  new CopyPlugin({
    patterns: [
      {
        context: '.', from: '.env', to: '.env', toType: 'file',
      },
    ],
  }),
];
module.exports = base;
