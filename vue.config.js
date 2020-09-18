const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {

  // 基本路径
  // tomcat => "./"
  // nginx => "/"
  publicPath: './',

  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: true,
  devServer: {
    before: app => {

    }
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
  }
};
