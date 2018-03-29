const helpers = require('./helpers')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')

const config = {
  entry: {
    'index': helpers.root('./src/page/index.js'),
    'es5-polyfill': 'es5-polyfill'
  },
  output: {
    path: helpers.root('/dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
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
    }]
  },
  plugins: [
    new NamedModulesPlugin()
  ]
}

module.exports = config
