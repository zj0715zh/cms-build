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
app.set('views','./dist/module')
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
  res.render('index')
});
app.get('/category/:id', function (req, res) {
  res.render('category')
});
app.get('/product/:id', function (req, res) {
  res.render('pro_detail')
});
app.get('/user/index', function (req, res) {
  res.render('user_center')
});
app.get('/user/myorder', function (req, res) {
  res.render('my_order')
});
app.get('/user/myaddress', function (req, res) {
  res.render('my_address')
});
app.get('/user/mycard', function (req, res) {
  res.render('my_card')
});
app.get('/user/addressedit', function (req, res) {
  res.render('edite_address')
});
app.get('/user/mycollected', function (req, res) {
  res.render('my_collected')
});
app.get('/user/help', function (req, res) {
  res.render('help')
});
app.get('/order/submit/:id', function (req, res) {
  res.render('order_confirm')
});
app.get('/pay/:id', function (req, res) {
  res.render('pay_confirm')
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
  },1000)
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
  },1000)
});


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})
