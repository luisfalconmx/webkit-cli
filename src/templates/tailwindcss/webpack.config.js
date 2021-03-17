const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  config.entry = './src/index.js'

  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext]'
  }

  config.resolve = {
    extensions: ['.js', '.jsx'],
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts/')
    }
  }

  config.target = isProduction ? 'browserslist' : 'web'

  config.devServer = isProduction
    ? {}
    : {
        port: 2303,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true
      }

  config.devtool = isProduction ? 'source-map' : false

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
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: require('responsive-loader/sharp'),
              disable: isProduction ? false : true,
              outputPath: 'assets/images'
            }
          },
          'webp-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash].[ext]'
        }
      }
    ]
  }

  config.plugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
      favicon: './src/assets/icons/favicon.svg'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),

    new CleanWebpackPlugin(),

    new Dotenv(),

    new BundleAnalyzerPlugin({
      analyzerMode: isProduction ? 'disabled' : 'json'
    })
  ]

  config.optimization = {
    minimize: isProduction ? true : false,
    minimizer: isProduction ? [new TerserWebpackPlugin()] : []
  }

  return config
}
