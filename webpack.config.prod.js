/* eslint-env node */
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const indexHTMLBuilder = new HtmlWebpackPlugin({
    template: 'src/index.ejs',
    title: 'Synth-React-Redux',
    minify: {
      removeComments: true,
      collapseWhitespace: true
    },
    inject: true
});

// DEFINE ROOT PATHS
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const env = new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')});

export default {
  debug: true,
  noInfo: true,
  entry: './src/index',
  target: 'web',
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],

    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
        exclude: /thirdparty/
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
        include: /thirdparty/,
      },
      {
        test: /\.(gif|svg|otf|eot|ttf|woff[2]?|png|jpe?g|wav)(\?[a-z0-9=\.]+)?$/i,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  postcss: () => {
    return [
      require('stylelint')({
        rules: {
          'property-no-unknown': [
            true,
            {ignoreProperties: ['composes']}
          ],
        }
      }),
      require('postcss-import')({ path: ['src/styles'] }),
      require('postcss-simple-vars'),
      require('postcss-cssnext')({
        broswers: 'last 2 versions'
      }),
      require('postcss-reporter')()
    ];
  },

  plugins: [
    indexHTMLBuilder,
    env,
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'bundle.common.js'
    }),
    new webpack.ProvidePlugin({
      'regeneratorRuntime': 'regenerator-runtime/runtime'
    })
  ]
};
