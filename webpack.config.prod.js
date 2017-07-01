/* eslint-env node */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
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
  entry: './src/index',
  target: 'web',
  output: {
    path: PATHS.dist,
    publicPath: '/synth-react-redux',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /^(?!.*\.story\.js$).*\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /^(?!.*\.story\.js$).*\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(gif|svg|otf|eot|ttf|woff[2]?|png|jpe?g|wav)(\?[a-z0-9=\.]+)?$/i,
        loader: 'url-loader?limit=8192'
      }
    ]
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
