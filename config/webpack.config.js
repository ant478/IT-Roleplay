const path = require('path');

module.exports = {
  entry: './frontend/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../frontend/build'),
  },
};
