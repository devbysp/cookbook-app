const CopyPlugin = require('copy-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const base = require('./webpack.base.conf');

base.mode = 'development';
base.externals = [
  (_context, request, callback) => {
    if (request[0] === '.') {
      callback();
    } else {
      callback(null, `require('${request}')`);
    }
  },
];

base.plugins = [
  new CopyPlugin({
    patterns: [
      { context: 'src/database', from: 'certs', to: 'certs' },
      {
        context: 'env', from: 'local.env', to: '.env', toType: 'file',
      },
    ],
  }),
];

module.exports = base;
