const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const config = {
  mode: "development",
  entry: {
    'index': resolveApp('./src/page/index.js'),
    'es5-polyfill': 'es5-polyfill'
  },
  output: {
    path: resolveApp('./dist'),
    filename: 'js/[name].[hash:4].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss'],
    alias: {
      'react': 'nervjs',
      'react-dom': 'nervjs'
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        'babel-loader', {
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true
        }
      }]
    },
    {
      test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader'
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: resolveApp('./src/page/index.html'),
      favicon: resolveApp('./src/assets/favicon.png'),
    })
  ]
}

module.exports = config
