const path = require('path')

module.exports = () => {
  return {
    target: 'nodenext',
    experiments: {
      outputModule: true
    },
    entry: './public/js/main.js',
    output: {
      filename: 'bundle.js',
      module: true,
      path: path.resolve(__dirname, 'public/js/build')
    },
    externalPresets: { type: 'module' },
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
    }
  }
}