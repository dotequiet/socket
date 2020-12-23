const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		vue: ['vue'],
    moment: ['moment']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../fe/dll'),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../fe/dll/[name].manifest.json')
		})
	]
}