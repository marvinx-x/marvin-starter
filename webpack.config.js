const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
    ],
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false
  },
  plugins: [
    new CleanWebpackPlugin( {
      dry: true,
      verbose: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets/images/*", to: "assets/images", flatten: true },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/index.pug"),
      chunks: ["main", "topbar"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    } ),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    contentBase: ["./src", "./dist"],
    watchContentBase: true,
    inline: true,
    open: false,
    hot: true,
    port: 8000,
  },
};
