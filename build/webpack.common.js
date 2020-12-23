const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const htmlTitle = require('./config')
const _env = process.env.npm_lifecycle_event
const makePlugins = (configs) => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env.BUILD_MODE': JSON.stringify(_env) // 利用 process.env.ASSET_PATH 保证模板文件中引用正确的静态资源地址
    })
  ]
  if (_env !== 'dev') {
    plugins.push(new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: true,
      cleanBeforeBuildPatterns: [
        path.resolve(__dirname, '../view'),
        path.resolve(__dirname, '../public'),
      ]
    }))
  }
  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        title: htmlTitle[item],
        template: 'fe/src/index.html',
        filename: _env === 'dev' ? `${item}/index.html` : path.join(__dirname, `../view/${item}/index.html`),
        chunks: ['runtime', 'vendors', item],
        minify: false
      })
    )
  })
	const files = fs.readdirSync(path.resolve(__dirname, '../fe/dll'));
	files.forEach(file => {
		if(/.*\.dll.js/.test(file)) {
			plugins.push(new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../fe/dll', file),
          publicPath: _env === 'dev' ? '/' : '/',
			}))
		}
		if(/.*\.manifest.json/.test(file)) {
			plugins.push(new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, '../fe/dll', file)
			}))
		}
  })
  plugins.push(new VueLoaderPlugin())
  return plugins
}
const configs = {
  entry: {
    logs: './fe/src/pages/logs/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../fe/src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
	},
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.jsx?$/,
      exclude: file => (
        /node_modules/.test(file) &&
        !/\.vue\.js/.test(file)
      ),
      include: [path.resolve(__dirname, '../fe/src')],
      use: ['babel-loader', 'eslint-loader']
    }, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
          esModule: false,
					name: '[name]-[hash:5].[ext]',
          outputPath: '../public/images',
          publicPath: _env === 'dev' ? '/images' : '/images',
					limit: 10240
				}
			}
		}, {
			test: /\.(eot|ttf|svg|woff|woff2)$/,
			use: {
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:5].[ext]',
          outputPath: '../public/fonts',
          publicPath:  _env === 'dev' ? '/fonts' : '/fonts',
        }
			}
		}]
  },
  performance: false,
  plugins: []
}
configs.plugins = makePlugins(configs)

module.exports = configs
