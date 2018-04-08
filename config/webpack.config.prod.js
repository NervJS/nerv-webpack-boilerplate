const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer')
const webpackConfig = require('./webpack.config.base')
const helpers = require('./helpers')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const env = require('../environment/prod.env')

const extractStyle = new MiniCssExtractPlugin({
  filename: 'css/[name].css',
  chunkFilename: "[id].css",
  disable: process.env.NODE_ENV === 'development'
})

webpackConfig.mode = "production";
webpackConfig.optimization = {
  minimizer: [
    new UglifyJSPlugin({
      uglifyOptions: {
        beautify: false,
        ie8: true,
        mangle: {
          // screw_ie8: false,
          keep_fnames: true,
          properties: false,
          // keep_quoted: true
        },
        compress: {
          warnings: false,
          // screw_ie8: false,
          properties: false
        },
        output: {
          keep_quoted_props: true
        },
        comments: false
      }
    })
  ]
};

webpackConfig.module.rules = [...webpackConfig.module.rules,
{
  test: /\.s?css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        importLoaders: 2
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          autoprefixer
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded'
      }
    }],
},
{
  test: /\.(jpg|png|gif)$/,
  loader: 'file-loader?name=assets/img/[name].[ext]'
},
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  loader: 'file-loader?name=fonts/[name].[ext]'
}
]

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  extractStyle,
  new HtmlWebpackPlugin({
    inject: false,
    template: helpers.root('/src/page/index.html'),
    favicon: helpers.root('/src/assets/favicon.png'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new DefinePlugin({
    'process.env': env
  })
]

module.exports = webpackConfig
