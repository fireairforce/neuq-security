module.exports = {
  entry: 'src/index.js',
  hash:true,
  extraBabelPlugins: [
    ["import", { libraryName: "antd-mobile", libraryDirectory: "es", style: true }],
    ["import", { libraryName: "antd", "libraryDirectory": "lib",style:true} ,"ant"],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
    production: {
      publicPath: 'http://wdlj.zoomdong.xin/wd/',
      ignoreMomentLocale: true,
      exclude:[/node_modules/],
      define: {
        "__CDN__": "http://wdlj.zoomdong.xin/wd/"
      }
    }
  },
}
