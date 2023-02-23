const path = require('path')

module.exports = () => {
  return {
    entry: './public/js/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public/js/build')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react']
          }
        }
      ]
    },
    optimization: {
      minimize: false
    }
  }
}