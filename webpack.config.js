/* eslint-env node */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var indexHTMLBuilder = new HtmlWebpackPlugin({
    template: 'index.ejs',
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
  build: path.join(__dirname, 'build')
};

var env = new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')});

module.exports = {
  context: PATHS.src,
  entry: 'index.js',

  output: {
    publicPath: 'http://localhost:8080/',
    path: PATHS.build,
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules', 'src']
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
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'bundle.common.js'
    })
  ],

  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: path.resolve('./build')
  }
};
