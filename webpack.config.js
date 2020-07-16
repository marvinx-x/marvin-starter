const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    form: path.join(__dirname, "src/form/form.js"),
    topbar: path.join(__dirname, "src/assets/js/topbar.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
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
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.scss$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
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
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: path.join(__dirname, "./src/form/form.pug"),
      chunks: ["form", "topbar"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    contentBase: ["./src", "./dist"],
    watchContentBase: true,
    inline: true,
    open: true,
    hot: true,
    port: 8000,
  },
};
