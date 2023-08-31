const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new NodePolyfillPlugin(),
  ],
  module: {
    rules: [
      {
        test: /index.html$/i,
        loader: 'file-loader',
        options: {
          name: 'index.html',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.cs$/i,
        loader: 'raw-loader',
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      nock: false,
      'aws-sdk': false,
      'mock-aws-s3': false,
      asyn_hooks: false,
      bluebird: false,
      npm: false,
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
