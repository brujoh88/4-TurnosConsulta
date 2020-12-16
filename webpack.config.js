const path = require('path')

module.exports = {
  entry: './dev/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './server/public'),
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
}
