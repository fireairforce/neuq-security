
const webpack = require('webpack')
const QiniuPlugin = require('qiniu-webpack-plugin')
const config = require('./secret')
module.exports = function (webpackConfig, env) {
  if (env !== 'production') {} else {
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      }),
      new QiniuPlugin({
        ACCESS_KEY: config.ACCESS_KEY,
        SECRET_KEY: config.SECRET_KEY,
        bucket: 'zoomdong',
        path: 'wd/'
      })
    )
  }
  return webpackConfig
}
