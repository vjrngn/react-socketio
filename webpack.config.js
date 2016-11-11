module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'app.js',
    path: __dirname + '/public'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel" },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
