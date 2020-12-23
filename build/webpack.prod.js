const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const devConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  bail: true,
  output: {
    filename: 'js/[name]/index-[contenthash:5].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  module: {
		rules:[{
			test: /\.scss$/,
			use: [
        MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
        {
          loader: 'postcss-loader',
          options: {
          }
        },
        'sass-loader'
			]
		}, {
			test: /\.css$/,
			use: [
        MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1
					}
				},
				'postcss-loader'
			]
		}]
  },
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		// usedExports: false,
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(s?css)$/,
          chunks: 'all',
          enforce: true,
        },
      	vendors: {
      		test: /[\\/]node_modules[\\/]/,
      		priority: -10,
      		name: 'vendors',
      	}
      }
    }
	},
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]/style-[hash:5].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.(s?css)$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [  'default', {
          discardComments: { removeAll: true}, //对注释的处理
          normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
        }]
      }
    })
  ]
}
module.exports = merge(commonConfig, devConfig)
