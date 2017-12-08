var path = require('path')
var config = require('../config')
var utils = require('./utils')
var vuxLoader = require('vux-loader')
var webpack = require('webpack')
var projectRoot = path.resolve(__dirname, '../')
var glob = require('glob');
var entries = getEntry(['./src/pages/*.js', './src/pages/**/*.js']); // 获得入口js文件

var env = process.env.NODE_ENV
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var originalConfig = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  //webpack2.X版本的写法,去除了空字符串
  resolve: {
    extensions: ['.js', '.vue','.less'],
    // fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  //webpack1.X版本的写法
  // resolve: {
  //   extensions: ['', '.js', '.vue'],
  //   fallback: [path.join(__dirname, '../node_modules')],
  //   alias: {
  //     'vue$': 'vue/dist/vue',
  //     'src': path.resolve(__dirname, '../src'),
  //     'common': path.resolve(__dirname, '../src/common'),
  //     'components': path.resolve(__dirname, '../src/components')
  //   }
  // },
  // resolveLoader: {
  //   fallback: [path.join(__dirname, '../node_modules')]
  // },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: [
          {
            loader:'babel-loader',
            options:{
              presets: ['es2015', 'stage-2'],  
              plugins: ['transform-runtime']
              // plugins: ['transform-runtime','babel-polyfill','transform-vue-jsx']  //使用transform-vue-jsx来装换jsx语法,babel-polyfill转换ES6新的API，比如Set、Maps、Promise                     
            }
          }
        ],
        include: projectRoot,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use:[
          {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use:[
          {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.LoaderOptionsPlugin({
      test:/\.vue$/,
      options: {
        vue: {
          loaders: utils.cssLoaders({
            sourceMap: useCssSourceMap
          })
        }
      }
    }),
  ]
  // vue: {
  //   loaders: utils.cssLoaders({
  //     sourceMap: useCssSourceMap
  //   }),
  //   postcss: [
  //     require('autoprefixer')({
  //       browsers: ['last 2 versions']
  //     })
  //   ]
  // }
}

// module.exports = vuxLoader.merge(originalConfig, {
//   plugins: ['vux-ui']
// })

module.exports = originalConfig

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;
  if (typeof (globPath) != "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      if (entry.split('/').length > 4) {
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
      } else {
        entries[basename] = entry;
      }
    });
  });
  return entries;
}
