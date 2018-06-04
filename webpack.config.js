const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const extractStyle = new ExtractTextPlugin({
  filename: 'css/[name].[hash:4].css'
})
const config = {
  mode: "production",
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
      test: /\.(jpe?g|png|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'assets/img/' // 图片打包后存放的目录
          }
        }
      ]
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?outputPath=fonts/'
    },
    {
      test: /\.s?css$/,
      use: extractStyle.extract({
        use: [{
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
        }
        ],
        fallback: 'style-loader'
      })
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: resolveApp('./src/page/index.html'),
      favicon: resolveApp('./src/assets/favicon.png'),
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
    extractStyle
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          ie8: true,
          keep_fnames: true
        }
      })
    ]
  }
}

module.exports = config
