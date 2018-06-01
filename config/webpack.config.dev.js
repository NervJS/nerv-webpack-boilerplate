const helpers = require('./helpers')
const webpackConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const env = require('../environment/dev.env')

webpackConfig.module.rules = [
  ...webpackConfig.module.rules,
  {
    test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    loader: 'file-loader'
  },
  {
    test: /\.s?css$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }
]

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  new DefinePlugin({
    'process.env': env
  }),
  new HtmlWebpackPlugin({
    inject: false,
    template: helpers.root('./src/page/index.html'),
    favicon: helpers.root('./src/assets/favicon.png')
  })
]

webpackConfig.devServer = {
  port: 10088,
  host: 'localhost',
  historyApiFallback: true,
  disableHostCheck: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  contentBase: './src',
  open: true,
  stats: {
    colors: true,
    modules: false
  }
}

module.exports = webpackConfig
