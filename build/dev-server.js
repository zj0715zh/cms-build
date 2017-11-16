var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
var path = require('path')
var express = require('express')
var webpack = require('webpack')
// var bodyParser = require('body-parser')
var fs = require('fs')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

app.set('views','./views')
app.set('view engine','ejs')
// app.use(bodyParser.urlencoded({extended:true}))//接受form表单提交的数据
// app.use(bodyParser.json())//接受json数据格式提交的数据

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})
app.use(devMiddleware)

app.use(hotMiddleware)

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.get('/express/abc', function (req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});  
  var otherArray = ["item1", "item2"];  
  var otherObject = { item1: "item1val", item2: "item2val" };  
  var json = JSON.stringify({   
    anObject: otherObject,   
    anArray: otherArray,  
  });
  res.end(json);
});


//get方式返回json数据
app.get('/data/:page/:file', function (req, res) {
  var pageName = req.params.page;
  var fileName = req.params.file;
  var fielString = fs.readFileSync(path.resolve(__dirname, '../data/'+pageName+'/'+fileName),"utf-8");
  // var jsonDate = JSON.stringify(fielString)//会被转义
  var jsonDate = JSON.parse(fielString);
  setTimeout(()=>{
    res.json(jsonDate);
    res.end()
  },2000)
});
//post方式返回json数据
app.post('/data/:page/:file', function (req, res) {
  var pageName = req.params.page;
  var fileName = req.params.file;
  var fielString = fs.readFileSync(path.resolve(__dirname, '../data/'+pageName+'/'+fileName),"utf-8");
  var jsonDate = JSON.parse(fielString);
  setTimeout(()=>{
    res.json(jsonDate);
    res.end()
  },2000)
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
