const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('../paths');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: paths.appBuild,
    publicPath: '/',
  },
  devServer: {
    compress: true,
    open: false,
    historyApiFallback: true,
    client: {
      overlay: true,
    },
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
});
