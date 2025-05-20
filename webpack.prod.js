const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new Dotenv({
      path: './.env.production'
    })
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    }
  }
});