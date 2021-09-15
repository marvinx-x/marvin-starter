const path = require( "path" );
const chalk = require( "chalk" );
const ProgressBarPlugin = require( "progress-bar-webpack-plugin" );
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const CssMinimizerPlugin = require( "css-minimizer-webpack-plugin" );
const SVGSpritemapPlugin = require( 'svg-spritemap-webpack-plugin' );
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isDev = process.env.NODE_ENV !== "production";
const entry = path.resolve( __dirname, "./src/index.js" );
const output = path.resolve( __dirname, "./public" );

const paramHtmls = {
  inject: 'body',
  cache : false,
  minify: isDev ?
    false : {
      collapseWhitespace: true,
      removeComments: true,
      useShortDoctype: true,
    },
};

const config = {
  entry: {
    main: entry,
    styleguide: path.resolve( __dirname, "./src/app/styleguide/styleguide.js" ),
  },
  output: {
    path: output,
    publicPath: path.resolve( __dirname, "./public/assets/" ),
    filename: isDev ? "[name].bundle.js" : "[name].bundle.[contenthash].js",
    assetModuleFilename: 'assets/[name][ext][query]'
  },
  module: {
    rules: [ {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [ {
          loader: "pug-loader",
          options: {
            pretty: isDev ? true : false,
          },
        }, ],
      },
      {
        test: /\.css$/,
        use: [ {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              url: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev ? true : false,
              url : false
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev ? true : false,
            },
          },
        ],
      },
      {
        test: /assets\/icons\/.*\.svg$/,
        include: [ path.resolve( __dirname, "./src/app/assets/icons" ) ],
        type: 'asset/source'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2)$/i,
        include: [ path.resolve( __dirname, "./src/app/assets/fonts" ) ],
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        }
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        include: [ path.resolve( __dirname, "./src/app/assets/images" ) ],
        use: [ {
          loader: 'responsive-loader',
          options: {
            name: "[name]-[width].[ext]",
            outputPath: "./assets/images",
            placeholder: true,
            placeholderSize : 40,
            adapter: require( "responsive-loader/sharp" ),
          },
        },
      ]
      },
    ],
  },
  optimization: {
    minimize: isDev ? false : true,
    minimizer: [
      new CssMinimizerPlugin( {
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true
              },
            },
          ],
        },
      } ),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin( {
      format: chalk.yellow( "build :bar " ) +
        chalk.green( ":percent" ) +
        chalk.cyan( " :elapsed seconds " ),
      clear: false,
    } ),
    new CopyWebpackPlugin( {
      patterns: [ {
          from: "./src/app/assets/images/*.gif",
          to: "assets/images/[name][ext][query]",
        },
        {
          from: "./src/app/assets/images/*.svg",
          to: "assets/images/[name][ext][query]",
        },
      ],
    } ),
    new HtmlWebpackPlugin( {
      filename: "index.html",
      template: path.resolve( __dirname, "./src/app/index.pug" ),
      chunks: [ "main" ],
      title: "Marvin Starter - Homepage",
      ...paramHtmls,
    } ),
    new HtmlWebpackPlugin( {
      filename: "styleguide.html",
      template: path.resolve( __dirname, "./src/app/styleguide/styleguide.pug" ),
      chunks: [ "styleguide" ],
      title: "Marvin Starter - Styleguide",
      ...paramHtmls,
    } ),
    new MiniCssExtractPlugin( {
      filename: isDev ? "[name].css" : "[name].[contenthash].css",
    } ),
    new SVGSpritemapPlugin( 'src/app/assets/icons/*.svg', {
      output: {
        filename: 'assets/icons/custom/sprite.svg',
        svg: {
          sizes: false
        }
      },
      sprite: {
        prefix: 'sprite-',
        gutter: false,
        generate: {
          title: false,
          symbol: true,
          use: true,
          view: '-fragment'
        },
      },
      styles: {
        filename: path.resolve( __dirname, './src/app/assets/styles/_sprites.scss' ),
        format: 'fragment',
        keepAttributes: false,
        callback: ( content ) => `.sprite-cover { background-size: cover; } ${content}`
      }
    } ),
    new FaviconsWebpackPlugin({
      logo: path.resolve( __dirname, 'src/app/assets/favicon/favicon.png' ),
      outputPath:  path.resolve( __dirname, './public/assets/favicons/' ),
      prefix : '/assets/favicons/',
      cache: true,
      inject: true,
      mode : 'light'
    }),
    // new ImageminPlugin( {
    //   // disable: isDev,
    //   test: /\.(jpe?g|png|gif|svg|webp)$/,
    //   plugins: [
    //     imageminMozjpeg( {
    //       quality: 80,
    //       progressive: true,
    //       arithmetic: false,
    //       smooth : 1
    //     } ),
    //     imageminPngquant( {
    //       speed: 6,
    //       strip: true,
    //       quality: [0.5, 0.8]
    //     } ),
    //     imageminGifsicle( {
    //       interlaced: true,
    //       optimizationLevel: 3,
    //       colors: 150
    //     } ),
    //     imageminSvgo( {
    //       removeViewBox: true,
    //       removeXMLNS: true,
    //       convertStyleToAttrs: true,
    //       cleanupListOfValues: true,
    //       removeDimensions: true,
    //       removeAttrs: true,
    //       removeAttributesBySelector: true,
    //       removeElementsByAttr: true,
    //       removeStyleElement: true,
    //       removeScriptElement: true,
    //     } )
    //   ]
    // } ),
  ],
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : "eval",
  devServer: {
    port: 8000,
    open: false,
    liveReload: true,
    hot: false,
    watchFiles: [ "src/**/*" ],
    client: {
      progress: false,
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
}

module.exports = () => {
  return config;
};
