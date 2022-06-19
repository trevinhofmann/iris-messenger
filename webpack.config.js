const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 8080,
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.tsx',
    ],
    alias: {
      react: 'preact/compat',
      "react-dom": 'preact/compat',
    },
    fallback: {
      crypto: false, // require.resolve('crypto-browserify'),
      http: false, // require.resolve('stream-http'),
      https: false, // require.resolve('https-browserify'),
      fs: false,
      os: false ,
      path: false, // require.resolve('path-browserify'),
      stream: false, // require.resolve('stream-browserify'),
      sys: false,
    },
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    // new SourceMapDevToolPlugin({
    //   filename: '[file].map',
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js/u,
        resolve: {
          fullySpecified: false,
        },
      },
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
      {
        test: /\.css$/ui,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProduction
                  ? '[hash:base64]'
                  : '[path][name]__[local]',
              },
            },
          },
          // {
          //   loader: 'sass-loader',
          // },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|mp4|ttf)$/ui,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};
