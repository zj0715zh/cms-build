var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var fs = require('fs')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var port = process.env.PORT || config.dev.port

var proxyTable = config.dev.proxyTable

var app = express()

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.set('views','./dist/pages')
app.set('view engine','ejs')
app.use(staticPath, express.static('./dist/static'))

//要使这个生效必须注释掉connect-history-api-fallback这个方法
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

// 本地路由
app.get('/', function (req, res) {
  res.render('cms')
});
app.get('/cms/*', function (req, res) {
  res.render('cms')
});
app.get('/noPermission', function (req, res) {
  res.render('noPermission')
});

//get方式返回json数据
app.get('/data/:page/:file', function (req, res) {
  var pageName = req.params.page;
  var fileName = req.params.file;
  var fielString = fs.readFileSync(path.resolve(__dirname, '../data/'+pageName+'/'+fileName),"utf-8");
  // var jsonDate = JSON.stringify(fielString)//会被转义
  var jsonDate = JSON.parse(fielString)
  setTimeout(()=>{
    res.json(jsonDate);//json格式输出
    res.end();
  },0)
});
//post方式返回json数据
app.post('/data/:page/:file', function (req, res) {
  var pageName = req.params.page;
  var fileName = req.params.file;
  var fielString = fs.readFileSync(path.resolve(__dirname, '../data/'+pageName+'/'+fileName),"utf-8");
  // var jsonDate = JSON.stringify(fielString)//会被转义
  var jsonDate = JSON.parse(fielString)
  setTimeout(()=>{
    res.json(jsonDate);//json格式输出
    res.end();
  },0)
});


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})
