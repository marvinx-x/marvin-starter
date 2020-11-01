const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const imageminMozjpeg = require( 'imagemin-mozjpeg' );
const imageminPngquant = require( 'imagemin-pngquant' );
const imageminGifsicle = require( 'imagemin-gifsicle' );
const imageminSvgo = require( 'imagemin-svgo' );

const isDev = process.env.NODE_ENV !== 'production';

const entry = path.resolve( __dirname, './src/index.js' );
const output = path.resolve( __dirname, './dist' );

if ( isDev ){
  module.exports.plugins.push(
    new HtmlWebpackPlugin( {
      filename: 'styleguide.html',
      template: path.join( __dirname, './src/app/styleguide/styleguide.pug' ),
      chunks: [ 'main' ],
      title : 'Marvin Starter - Styleguide',
    } ),
  );
}

module.exports = {
  entry: {
    main: isDev ? [entry, path.resolve( __dirname, './src/app/styleguide/styleguide.js' )] : entry
  },
  output: {
    path: output,
    filename: isDev ? '[name].bundle.js' : '[name].bundle.[hash].js',
    pathinfo: true
  },
  module: {
    rules: [ {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
    },
    {
      test: /\.pug$/,
      exclude: /node_modules/,
      use: [{
        loader: 'pug-loader',
        options: {
          pretty: isDev ? true : false
        }
      }]
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader' ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            url: false,
            sourceMap: isDev ? true : false
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: isDev ? true : false
          }
        }
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /assets\/icons\/.*\.svg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: (url, resourcePath) => {
              if ( /assets\/fonts/.test( resourcePath ) )
              {
                return `/assets/fonts/${url}`;
              }
              if ( /node_modules/.test( resourcePath ) )
              {
                return `/assets/icons/${url}`;
              }
              return `/assets/${url}`;
            },
          }
        }
      ]
     },
     {
      test: /assets\/icons\/.*\.svg$/,
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        spriteFilename: './assets/icons/custom/sprite.svg'
        }
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: [ {
          loader: 'responsive-loader',
          options: {
            name: '[name]-[width].[ext]',
            outputPath: './assets/images',
            placeholder: true,
            adapter: require( 'responsive-loader/sharp' )
          }
        } ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin( {
    patterns: [ {
        from: './src/app/assets/images/*.gif',
        to: 'assets/images/[name].[ext]'
        },
        {
          from: './src/app/assets/images/*.svg',
          to: 'assets/images/[name].[ext]'
        }
      ]
    } ),
    new HtmlWebpackPlugin( {
      filename: 'index.html',
      template: path.join( __dirname, './src/app/index.pug' ),
      chunks: ['main'],
      title : 'Marvin Starter - Homepage',
    } ),
    new MiniCssExtractPlugin( {
      filename: isDev ? '[name].css' : '[name].[hash].css'
    } ),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new ImageminPlugin( {
      disable: isDev,
      test: /\.(jpe?g|png|gif|svg|webp)$/,
      plugins: [
        imageminMozjpeg( {
          quality: 80,
          progressive: true
        } ),
        imageminGifsicle( {
          interlaced: false,
          optimizationLevel: 3,
          colors: 150
        } ),
        imageminPngquant( {
          speed: 6,
          strip: true,
          quality: [ 0.5, 0.8 ]
        } ),
        imageminSvgo( {
          removeViewBox: true
        } )
      ]
    } )
  ],
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : 'eval',
  devServer: {
    contentBase: output,
    watchContentBase: true,
    inline: true,
    open: false,
    writeToDisk: true,
    port: 8000
  }
};
