const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/assets/js/app.js',
  output: {
    filename: 'assets/js/bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/',
    assetModuleFilename: 'assets/images/[hash][ext]',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
  },
  experiments: {
    asset: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 5 * 1024,
          },
        },
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  watchOptions: {
    ignored: '**/node_modules',
  },
  target: ['web', 'es5'],
};
