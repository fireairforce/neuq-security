module.exports = {
    fjPublish: {
      modules: [{
        name: '生产环境',
        env: 'prod',
        ssh: {
          host: '47.95.194.10',     // 服务器地址
          port: 22,                 // 端口
          username: 'root',         // 用户名
          password: 'Wd1344492820.'          // 密码
        },
        buildCommand: 'build',    // 构建命令  === npm run build:sit
        localPath: './dist',            // 构建后上传文件
        remotePath: '/var/neuq_security/dist'       // 服务端路径
      }]
    }
  }
  