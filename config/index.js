var path = require('path')
var proxyDev = require('./proxyTable.dev')
var proxyPro = require('./proxyTable.pro')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    // assetsSubDirectory: 'www.baidu.com',//assetsSubDirectory和assetsPublicPath决定了生成的静态文件的相对路径
    // assetsPublicPath: 'http://',
    assetsSubDirectory:'loanm.ppdaicdn.com/sellercms/static',
    assetsPublicPath:'https://',
    assetsModuleDirectory: 'pages',
    htmlRoot: 'D://project/ppdai-store-sop/sop-site/src/main/resources/templates',//页面的产出目录
    javaRoot: 'D://project/ppdai-store-sop/', //后端文件路径
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8384,
    assetsSubDirectory: 'static',//静态文件生成路径为/static/js/***
    assetsPublicPath: '/',
    proxyTable: proxyDev,
    cssSourceMap: false
  }
}
