const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { SourceMapDevToolPlugin } = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.tsx',
    ],
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html',
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'index.css',
    // }),
    // new SourceMapDevToolPlugin({
    //   filename: '[file].map',
    // }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.js/u,
      //   resolve: {
      //     fullySpecified: false,
      //   },
      // },
      // {
      //   test: /\.js$/u,
      //   enforce: 'pre',
      //   use: ['source-map-loader'],
      // },
      {
        test: /\.[jt]sx?$/u,
        use: 'ts-loader',
        exclude: /node_modules/u,
      },
    ],
  },
};
