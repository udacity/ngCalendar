var webpack = require('webpack');

var minifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});


module.exports = {
  output: {
    filename: 'ng-calendar.min.js',
    libraryTarget: 'umd',
    library: 'ngCalendar'
  },

  externals: {
    angular: {
      root: 'angular',
      commonjs2: 'angular',
      commonjs: 'angular',
      amd: 'angular'
    }
  },

  devtool: 'sourcemap',

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?stage=1', exclude: [/node_modules/] }
    ]
  },

  plugins: [minifyPlugin]
};