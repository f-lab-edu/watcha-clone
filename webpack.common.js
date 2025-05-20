const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// 공통 설정
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      "@Constants": path.resolve(__dirname, 'src/constants/'),
      "@Types": path.resolve(__dirname, 'src/types/'), 
      "@Components": path.resolve(__dirname, 'src/components/'),
      "@Apis": path.resolve(__dirname, 'src/apis/'),
      "@Assets": path.resolve(__dirname, 'src/assets/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`
    })
  ],
};