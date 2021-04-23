// Require dependencies
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')
const Dotenv = require('dotenv-webpack')
require('dotenv').config()

const config = {}

module.exports = (env, argv) => {
  // Detect webpack mode
  const Development = argv.mode === 'development'
  const Production = argv.mode === 'production'

  // Get enviroment variables from .env file
  const { HOST, PORT } = process.env

  config.entry = './src/index.js'

  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  }

  config.resolve = {
    extensions: ['.js', '.jsx'],
    alias: {
      '@images': path.resolve(__dirname, 'src/assets/images/'),
      '@icons': path.resolve(__dirname, 'src/assets/icons/'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@containers': path.resolve(__dirname, 'src/containers/'),
      '@styles': path.resolve(__dirname, 'src/styles/')
    }
  }

  // Enable webpack dev server in development mode
  if (Development) {
    config.devServer = {
      host: HOST,
      port: PORT,
      contentBase: path.join(__dirname, 'dist'),
      compress: true
    }
  }

  config.module = {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(css|pcss|sss)$/i,
        use: [
          Production ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }

  config.plugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true
      // favicon: './src/assets/icons/favicon.svg'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),

    new CleanWebpackPlugin(),

    new Dotenv(),

    new WebpackBar()
  ]

  // Enable optimizations in production mode
  if (Production) {
    config.optimization = {
      minimize: true,
      minimizer: [new TerserWebpackPlugin()]
    }
  }

  return config
}
