const path = require('path');

module.exports = {
  entry: './frontend/app.js',
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
};
