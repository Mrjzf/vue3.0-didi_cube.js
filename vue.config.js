const Timestamp = new Date().getTime()
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  publicPath: './',
  outputDir: 'dist/',
  assetsDir: './static',
  productionSourceMap: false,
  parallel: false,

  // configureWebpack: { // webpack 配置,  vue cli3.0 build 打包 的 js 文件时间戳 解决 js 缓存问题
  //   output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】  会覆盖 assetsDir 的配置
  //     filename: `[name].${Timestamp}.js`,
  //     chunkFilename: `[name].${Timestamp}.js`
  //   },
  // }
  devServer: {
    // 配置自动启动浏览器
    proxy: {
      '/cms/*': {
        target: 'https://app.jscncs.site', // 设置你调用的接口域名和端口号
        changeOrigin: true, // 跨域
        ws: false, // websocket支持
        secure: false // 安全协议
      }
    },
    overlay: { // 关闭eslint提示的错误
      warnings: true,
      errors: true
    },
    hotOnly: false
  },
  lintOnSave: false,
  runtimeCompiler: true
}
