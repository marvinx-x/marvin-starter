const path = require( "path" );
const chalk = require( "chalk" );
const ProgressBarPlugin = require( "progress-bar-webpack-plugin" );
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const CssMinimizerPlugin = require( "css-minimizer-webpack-plugin" );
const SVGSpritemapPlugin = require( 'svg-spritemap-webpack-plugin' );
const FaviconsWebpackPlugin = require( 'favicons-webpack-plugin' );
const ImageminWebpack = require( 'image-minimizer-webpack-plugin' );
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";
const entry = path.join( __dirname, "src/index.js" );
const output = path.join( __dirname, "dist" );

const pathImgs = "assets/images";
const paramHtmls = {
  inject: 'body',
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
    styleguide: path.join( __dirname, "src/app/styleguide/styleguide.js" ),
  },
  output: {
    path: output,
    filename: isDev ? "[name].bundle.js" : "[name].bundle.[contenthash].js",
    assetModuleFilename: '[name][ext][query]'
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
        use: [ {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev ? true : false,
              url: false
            },
          },
          {
            loader: "sass-loader",
            options :{
              sourceMap: isDev ? true : false,
              additionalData: `$pathImgs:"${pathImgs}";`
            }
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/i,
        include: [ path.join( __dirname, "src/app/assets/fonts" ) ],
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        }
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
        test: /assets\/icons\/.*\.svg$/,
        include: [ path.join( __dirname, "src/app/assets/icons" ) ],
        type: 'asset/source',
      },
      {
        test: /\.svg$/,
        include: [ path.join( __dirname, `src/app/${pathImgs}` ) ],
        type: 'asset/resource',
        generator: {
          filename: `${pathImgs}/[name][ext][query]`
        },
        use: isDev ? [] : [ {
          loader: 'svgo-loader',
          options: {
            removeViewBox: true,
            removeXMLNS: true,
            convertStyleToAttrs: true,
            cleanupListOfValues: true,
            removeDimensions: true,
            removeAttrs: true,
            removeAttributesBySelector: true,
            removeElementsByAttr: true,
            removeStyleElement: true,
            removeScriptElement: true,
          }
        } ]
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        include: [ path.join( __dirname, `src/app/${pathImgs}` ) ],
        use: [ {
          loader: 'responsive-loader',
          options: {
            name: "[name].[ext]",
            outputPath: `./${pathImgs}`,
            placeholder: true,
            placeholderSize: 40,
            quality: isDev ? 100 : 80,
            publicPath: `${pathImgs}/`,
            emitFile : true,
            adapter: require( "responsive-loader/sharp" )
          },
        }, ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin( {
      format: chalk.yellow( "build :bar " ) + chalk.green( ":percent" ) + chalk.cyan( " :elapsed seconds " ),
      clear: false,
    } ),
    new CopyWebpackPlugin( {
      patterns: [ {
        from: `./src/app/${pathImgs}/*.gif`,
        to: `${pathImgs}/[name][ext][query]`,
      }, ],
    } ),
    new HtmlWebpackPlugin( {
      filename: "index.html",
      template: path.join( __dirname, "src/app/index.pug" ),
      chunks: [ "main" ],
      title: "Marvin Starter - Homepage",
      ...paramHtmls,
    } ),
    new HtmlWebpackPlugin( {
      filename: "styleguide.html",
      template: path.join( __dirname, "src/app/styleguide/styleguide.pug" ),
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
        filename: path.join( __dirname, 'src/app/assets/styles/_sprites.scss' ),
        format: 'fragment',
        keepAttributes: false,
        callback: ( content ) => `.sprite-cover { background-size: cover; } ${content}`
      }
    } ),
    new FaviconsWebpackPlugin( {
      logo: path.join( __dirname, 'src/app/assets/favicon/favicon.png' ),
      outputPath: path.join( __dirname, 'dist/assets/favicon/' ),
      prefix: '/assets/favicon/',
      cache: true,
      inject: true,
      mode: 'light'
    } ),
    new ImageminWebpack( {
      test: /\.(png|gif)$/i,
      include: [ path.join( __dirname, `src/app/${pathImgs}` ) ],
      minimizerOptions: {
        plugins: [
          [ 'gifsicle', {
            interlaced: true,
            optimizationLevel: 3,
            colors: 150
          } ],
          [ 'optipng', {
            optimizationLevel: 5
          } ],
        ]
      }
    } )
  ],
  optimization: {
    minimize: isDev ? false : true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /\/node_modules/,
        extractComments : false,
        terserOptions: {
          compress: isDev ? false : true,
          module : true,
          mangle : true,
          toplevel: true,
          safari10: false,
          format: {
            comments: false,
          },
        },
      }),
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
  performance: {
    maxEntrypointSize: 600000,
    maxAssetSize: 3000000
  },
  mode: isDev ? "development" : "production",
  devtool: false,
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
    static: {
      directory: output,
    },
  },
}

module.exports = () => {

  return config;
};
