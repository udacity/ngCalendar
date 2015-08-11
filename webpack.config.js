module.exports =  {
  output: {
    filename: 'ng-calendar.js',
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
  }
};