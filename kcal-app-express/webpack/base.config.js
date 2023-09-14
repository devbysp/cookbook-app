const { resolve } = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: ['./src/index.js'],
  output: {
    filename: 'app.js',
    path: resolve(__dirname, './../build'),
    clean: true,
  },
  // The Webpack (in production mode) is putting your code through a minimiser,
  // which messes up class and function name. The mysql module is not compatible
  // with that. This is a workaround:
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /express\/lib/,
      resolve(__dirname, '../node_modules'),
      {
        cors: 'cors',
        winston: 'winston',
      },
    ),
  ],
  stats: {
    warningsFilter: /require\.extensions/,
  },
};
