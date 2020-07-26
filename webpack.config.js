const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
		styleguide: path.resolve(__dirname, './src/app/styleguide/styleguide.js')
	},
	output: {
		path: path.resolve(__dirname, './dist'),
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
				{
					from: './src/app/assets/images/*',
					to: 'assets/images',
					flatten : true
				}
			]
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, './src/app/index.pug'),
			chunks: ['main']
		} ),
		new HtmlWebpackPlugin({
			filename: 'styleguide.html',
			template: path.join(__dirname, './src/app/styleguide/styleguide.pug'),
			chunks: ['styleguide']
		} ),
		new FaviconsWebpackPlugin({
			logo: './src/app/assets/favicon/logo-40x40.svg',
			prefix : 'assets/favicon/'
	}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css'
		})
	],
	mode: isDevelopment ? 'development' : 'production',
	devtool: isDevelopment ? 'source-map' : 'eval',
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		watchContentBase: true,
		inline: true,
		open: true,
		writeToDisk: true,
		port: 8000
	}
};
