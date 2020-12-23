const webpack = require('webpack')
const fs = require('fs')
const path = require('path')

let nodeModules = {}
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  cache: true,
  entry: {
    app: path.resolve(__dirname, '../service/app.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist-service'),
    filename: 'app.js'
  },
  context: __dirname,
  node: {
    __filename: false,
    __dirname: false
  },
  target: 'node',
  externals: nodeModules,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [
        path.resolve(__dirname, "node_modules"),
      ],
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0'],
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.json']
  }
}