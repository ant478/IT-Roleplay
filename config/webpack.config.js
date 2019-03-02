const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './frontend/app.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../frontend/build'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
        },
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: ['grunt eslint:frontend'],
    }),
    new CopyPlugin([
      { from: 'frontend/index.html', to: 'index.html' },
    ]),
  ],
  stats: 'errors-only',
};
