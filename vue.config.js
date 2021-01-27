module.exports = {
  publicPath: '/',

  configureWebpack: {
    externals: {

    }
  },

  lintOnSave: false,

  productionSourceMap:false,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8180/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  },

}