const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const env = process.env.NODE_ENV
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const devConfig = {
	mode: env,
  devtool: 'source-map',
  output: {
    filename: 'js/[name]/index.js',
    path: path.resolve(__dirname, '../public')
  },
  module: {
		rules: [{
			test: /\.scss$/,
			use: [
        'vue-style-loader',
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'postcss-loader',
				'sass-loader'
      ]
		}, {
			test: /\.css$/,
			use: [
        'vue-style-loader',
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
  devServer: {
    overlay: true,
    contentBase: path.resolve(__dirname, '../public'),
    // publicPath: '/assets/',
    // inline: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/public/index/index.html' }
      ]

    },
    // disableHostCheck: true,
    // overlay: {
    //   errors: true,
    //   warnings: true,
    // },
    compress: true,
    host: '0.0.0.0',
		open: false,
    hot: true,
    // port: 9002,
    proxy: {
      '/meshHotUpdate': {
        target: 'http://localhost:3000/',
        secure: true,
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/api': {
        target: 'http://localhost:3000/',
        secure: true,
        changeOrigin: true,
        logLevel: 'debug',
      }
      // 'sockjs-node': {
      //   target: 'http://localhost:3000/',
      //   ws: false,
      //   changeOrigin: true
      // },
      // '/socket': {
      //   target: 'http://localhost:3000/',
      //   ws: false,
      //   changeOrigin: true
      // },
    }
  },
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        }
      }
    }
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
  ]
}

module.exports = merge(commonConfig, devConfig)
