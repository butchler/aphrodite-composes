module.exports = {
  entry: './example/index.js',
  output: {
    path: __dirname + '/example',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel" }
    ]
  }
}
