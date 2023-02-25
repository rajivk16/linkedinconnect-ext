const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    background: './background.js',
    content_script: './content_script.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};