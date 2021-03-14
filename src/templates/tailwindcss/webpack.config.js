const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {}

config.entry = './src/main.js'

config.output = {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash].js',
  assetModuleFilename: 'assets/images/[hash][ext]'
}

config.resolve = {
  extensions: ['.js', '.pug'],
  alias: {
    '@styles': path.resolve(__dirname, 'src/styles/'),
    '@images': path.resolve(__dirname, 'src/assets/images/'),
    '@fonts': path.resolve(__dirname, 'src/assets/fonts/')
  }
}

config.module = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.pug$/,
      use: {
        loader: 'pug3-loader',
        options: {
          pretty: true
        }
      }
    },
    {
      test: /\.pcss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource'
    },
    {
      test: /\.(woff|woff2)$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[name].[contenthash].[ext]'
      }
    }
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.mode = 'development'

    config.devServer = {
      open: true,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      port: 2303
    }

    config.devtool = 'source-map'

    config.plugins = [
      new Dotenv(),
      new CleanWebpackPlugin(),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'json'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/home.pug',
        inject: true
      })
    ]
  }

  if (argv.mode === 'production') {
    config.mode = 'production'

    config.plugins = [
      new Dotenv(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/home.pug',
        inject: true
      })
    ]

    config.optimization = {
      minimize: true,
      minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()]
    }
  }

  return config
}
