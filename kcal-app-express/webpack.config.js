const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
  name: 'kcal-app-backend',
  target: 'node',
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      { test: /\.json$/, use: 'json-loader' },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
