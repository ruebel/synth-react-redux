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
  build: path.join(__dirname, 'build')
};

const env = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

export default {
  entry: ['webpack-hot-middleware/client?reload=true', './src/index.js'],
  output: {
    publicPath: 'http://localhost:3000/',
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    modules: ['node_modules', 'src']
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
        test: /\.(gif|svg|otf|eot|ttf|woff[2]?|png|jpe?g|wav)(\?[a-z0-9=.]+)?$/i,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    indexHTMLBuilder,
    env,
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'bundle.common.js'
    }),
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime/runtime'
    })
  ],
  devServer: {
    stats: 'errors-only'
  }
};
