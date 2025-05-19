const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');

// 공통 설정
const commonConfig = {
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

// 개발 환경 설정
const developmentConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    hot: true,
    open: true
  }
};

// 운영 환경 설정
const productionConfig = {
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
    })
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    }
  }
};

// 실행 환경에 따라 설정 병합
module.exports = (env) => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  return merge(
    commonConfig,
    isDevelopment ? developmentConfig : productionConfig
  );
};