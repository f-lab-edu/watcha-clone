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
      minSize: 20000,
      maxSize: 200000,
      maxAsyncSize: 200000,
      maxInitialSize: 200000,
      cacheGroups: {
        default: false,
        vendors: false,
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 30,
          enforce: true,
        },
        reactQuery: {
          test: /[\\/]node_modules[\\/]@tanstack[\\/]/,
          name: 'react-query',
          chunks: 'async',
          priority: 25,
        },
        icons: {
          test: /[\\/]node_modules[\\/]react-icons[\\/]/,
          name: 'icons',
          chunks: 'async',
          priority: 20,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'async',
          priority: 10,
          minChunks: 1,
        },
      },
    },
    usedExports: true,
    sideEffects: false,
  },
  performance: {
    hints: false,
  },
  resolve: {
    alias: {
      'msw/node': false,
      'msw/browser': false,
      'msw': false,
    }
  }
});