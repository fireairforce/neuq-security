const QiniuPlugin = require('qiniu-webpack-plugin')
const config = require('./secret')

module.exports = function (webpackConfig, env) {
  // console.log(process.env);
  if(process.env.NODE_ENV==='production'){
    webpackConfig.plugins.push(
      new QiniuPlugin({
        ACCESS_KEY: config.ACCESS_KEY,
        SECRET_KEY: config.SECRET_KEY,
        bucket: 'zoomdong',
        path: '/'
      })
    )
  }
  return webpackConfig
}