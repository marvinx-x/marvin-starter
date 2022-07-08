const webpack = require( 'webpack' );
const path = require( "path" );
const fs = require( 'fs' );
const chalk = require( "chalk" );
const ProgressBarPlugin = require( "progress-bar-webpack-plugin" );
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const CssMinimizerPlugin = require( "css-minimizer-webpack-plugin" );
const flattenObjSass = require("js-to-scss");
const SVGSpritemapPlugin = require( 'svg-spritemap-webpack-plugin' );
const FaviconsWebpackPlugin = require( 'favicons-webpack-plugin' );
const ImageminWebpack = require( 'image-minimizer-webpack-plugin' );
const TerserPlugin = require("terser-webpack-plugin");
const SitemapPlugin = require('sitemap-webpack-plugin').default;


/* NAME | DESCRIPTION */
const domain = 'https://marvinstarter.marvinx.com';
const firstLastName = 'Marvin Starter';
const description = "A starter and styleguide for any quick setup of HTML/CSS components";

/* URLS */
const paths = [`/index.html/`];

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const entry = path.join( __dirname, "src/index.js" );
const output = path.join( __dirname, "dist" );

/* PATHS */
const pathImgs = "assets/images";
// const pathVideos = "assets/videos";

/* ARRAYS */
const arrImages = fs.readdirSync( path.join( __dirname, `src/app/${pathImgs}` ) );
// const arrVideos = fs.readdirSync(path.join(__dirname,`src/app/${pathVideos}`));

/* OBJECTS */
const sizeMedias = { mobile : 320, tablet : 480,  tabletLandscape : 768, smallDesktop : 1024, desktop : 1200, mediumDesktop : 1336, largeDesktop : 1600, maxDesktop : 1920};

const paramHtmls = {
  inject: 'body',
  minify: isDev ? false : {
    collapseWhitespace: true,
    removeComments: true,
    useShortDoctype: true,
    removeRedundantAttributes: false,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  },
  templateParameters: {
    ENV : process.env.NODE_ENV,
    DOMAIN: domain,
    DESCRIPTION : description,
    NAME_FIRSTNAME: firstLastName,
    PATH_IMGS: pathImgs,
    // PATH_VIDEOS: pathVideos,
  }
};


const entries = { main: entry }
const config = {
  entry: isProd ? { ...entries } :
  {...entries, styleguide: path.join( __dirname, "src/app/styleguide/styleguide.js" )},
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
        test: /\.(css|scss)$/,
        use: [ {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: `src/app/${pathImgs}/`,
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev ? true : false,
              url: false,
              modules: {
                mode: "global",
              },
            },
          },
          {
            loader: "sass-loader",
            options :{
              sourceMap: isDev ? true : false,
              additionalData :  `$PATH_IMGS:"${pathImgs}"; ${flattenObjSass(sizeMedias)};`
            }
          },
        ],
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
    }),
    isProd ? new SitemapPlugin({ base: domain,paths }) : false,
    new webpack.DefinePlugin({
      ENV : JSON.stringify(process.env.NODE_ENV),
      PATH_IMGS: JSON.stringify(pathImgs),
      // PATH_VIDEOS: JSON.stringify(pathVideos),
      OBJ_IMGS: JSON.stringify(arrImages),
      // OBJ_VIDEOS: JSON.stringify(arrVideos),
      SIZE_MEDIAS: JSON.stringify(sizeMedias)
    }),
    new CopyWebpackPlugin( {
      patterns: [{
        from: `./src/app/assets/fonts/*.woff2`,
        to: `assets/fonts/[name][ext][query]`
      },
      {
        from: `./src/app/${pathImgs}/*.gif`,
        to: `${pathImgs}/[name][ext][query]`
      },
      // {
      //   from: `./src/app/${pathVideos}/*.mp4`,
      //   to: `${pathVideos}/[name][ext][query]`
      //   },
      ]
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
    } ),
    new HtmlWebpackPlugin( {
      filename: "index.html",
      template: path.join( __dirname, "src/app/index.pug" ),
      chunks: [ "main" ],
      title: `${firstLastName} - Homepage`,
      ...paramHtmls,
    } ),
    !isProd ? new HtmlWebpackPlugin( {
      filename: "styleguide.html",
      template: path.join( __dirname, "src/app/styleguide/styleguide.pug" ),
      chunks: [ "styleguide" ],
      title: `${firstLastName} - Styleguide`,
      ...paramHtmls,
    } ) : false,
  ].filter(n => n),
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
              discardComments: isDev ? false : true,
              normalizeWhitespace: isDev ? false : true
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
