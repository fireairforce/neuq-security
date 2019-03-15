const path = require('path')
export default {
  entry: 'src/index.js',
  // disableCSSModules: true,
  ignoreMomentLocale: true,
  // theme: './theme.config.js',
  hash: true,
  html:{
    template:"./src/index.ejs"
  },
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        ["import", { libraryName: "antd-mobile", libraryDirectory: "es", style: true }],
        ["import", { libraryName: "antd", "libraryDirectory": "lib",style:true} ,"ant"],
      ],
      autoprefixer: {
        browsers: [
          'iOS >= 8', 'Android >= 4'
        ]
      }
    },
    production: {
       
      publicPath: 'http://wdlj.zoomdong.xin/',
      extraBabelPlugins: [
        'dva-hmr',
        ["import", { libraryName: "antd-mobile", libraryDirectory: "es", style: true }],
        ["import", { libraryName: "antd", "libraryDirectory": "lib",style:true} ,"ant"],
      ],
      autoprefixer: {
        browsers: [
          'iOS >= 8', 'Android >= 4'
        ]
      },
      define: {
        __CDN__: "http://wdlj.zoomdong.xin/"
      }
    }
  }
}
