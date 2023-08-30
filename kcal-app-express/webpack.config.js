const path = require('path');
const nodeExternals = require('webpack-node-externals');
const nodeExternals = () => ['rimraf', 'lru-cache', 'nock', 'p-map', 'aws-sdk',
  'mock-aws-s3', 'supports-color', 'npm', 'yallist', 'bluebird'];

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './src/index.js',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.cs$/,
        use: 'ignore-loader',
      },
      {
        test: /\.html$/,
        use: 'ignore-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
  },
  externals: nodeExternals(),
  watch: NODE_ENV === 'development',
};
