const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

const isDevelopment = process.env.NODE_ENV !== 'production';

const entry = path.resolve(__dirname, './src/index.js');
const output = path.resolve(__dirname, './dist');

module.exports = {
	entry: {
		main: entry,
		styleguide: path.resolve(__dirname, './src/app/styleguide/styleguide.js')
	},
	output: {
		path: output,
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
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
				options: {
					limit: 8192,
					name: isDevelopment ? '[name].[ext]' : '[name].[hash].[ext]',
					outputPath: 'assets/icons/',
					emitFile: true
				}
			},
			{
				test: /\.(css)$/,
				use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.(scss)$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false
						}
					},
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
					to: 'assets/images/[name].[ext]',
					flatten: true,
					cacheTransform : true
				}
			]
		}),
		new ImageminPlugin({
			disable: isDevelopment,
			test: /\.(jpe?g|png|gif|svg)$/,
			plugins: [
				imageminMozjpeg({
					quality: 2,
					progressive: true
				}),
				imageminGifsicle({
					interlaced: false,
					optimizationLevel: 3,
					colors: 2
				}),
				imageminPngquant({
					floyd: 0.5,
					speed: 2,
					quality: [0.02, 0.02]
				}),
				imageminSvgo({
					removeViewBox: true
			})
			]
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, './src/app/index.pug'),
			chunks: ['main']
		}),
		new HtmlWebpackPlugin({
			filename: 'styleguide.html',
			template: path.join(__dirname, './src/app/styleguide/styleguide.pug'),
			chunks: ['styleguide']
		}),
		new FaviconsWebpackPlugin({
			logo: './src/app/assets/favicon/logo-40x40.svg',
			prefix: 'assets/favicon/',
			cache: true,
			inject: true,
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css'
		})
	],
	mode: isDevelopment ? 'development' : 'production',
	devtool: isDevelopment ? 'source-map' : 'eval',
	devServer: {
		contentBase: output,
		watchContentBase: true,
		inline: true,
		open: false,
		writeToDisk: true,
		port: 8000
	}
};
