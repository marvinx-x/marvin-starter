const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		main: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: isDevelopment ? '[name].bundle.js' : '[name].bundle.[hash].js',
		pathinfo: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: isDevelopment ? true : false
						}
					}
				]
			}
		]
	},
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/assets/images/*', to: 'assets/images', flatten: true }
			]
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, './src/index.pug'),
			chunks: ['main']
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css'
		})
	],
	mode: isDevelopment ? 'development' : 'production',
	devtool: isDevelopment ? 'source-map' : 'eval',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		watchContentBase: true,
		inline: true,
		open: true,
		writeToDisk: true,
		port: 8000
	}
};
