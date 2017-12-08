require('shelljs/global')//地址 https://github.com/shelljs/shelljs
env.NODE_ENV = 'production'
var path = require('path')
var config = require('../config')
var ora = require('ora')
var fs = require('fs')
var cmd = require('node-cmd')
var childProcess = require('child_process')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
var modulePath = path.join(config.build.assetsRoot, config.build.assetsModuleDirectory)
rm('-rf', assetsPath)
rm('-rf', modulePath)
// cmd.run('rm -rf '+modulePath+'/*')
mkdir('-p', assetsPath)
mkdir('-p', modulePath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
  var fileLength = fs.readdirSync(modulePath)
  for(i=0;i<fileLength.length;i++){
    var fileName = fileLength[i].split('.').shift();
    var rs = fs.createReadStream(modulePath+'/'+fileName+'.html')
    var ws = fs.createWriteStream(modulePath+'/'+fileName+'.ejs')
    rs.pipe(ws);
    console.log(fileName)
  }
  setTimeout(()=>{
    for(i=0;i<fileLength.length;i++){
      var fileName = fileLength[i].split('.').pop();
      if(fileName=='html'){
        fs.unlinkSync(modulePath+'/'+fileLength[i])
      }
    }
    console.log("html文件删除完成")
  },1000)
})
