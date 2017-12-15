# 分期商城商家管理后台，基于vue的单页和多页双重架构

### git仓库地址：git@github.com:zj0715zh/cms-build.git

## Build Setup

``` bash
# 第一步下载仓库
git clone git@github.com:zj0715zh/cms-build.git

# 第二步安装依赖
npm install（这里建议用node8.1.4版本，如果你安装的是低版本，先将package-lock.json文件删除再安装）

# 第三步启动本地服务器，默认端口为8384
npm run dev

# 第四步本地部署
npm run build（本地部署的具体配置查看config/index.js文件）

# 云服务器部署
第一步：将仓库clone到云服务器
第二步：安装依赖（npm i）
第三步：构建页面和静态文件（node build/ali-build.js）因为本人时部署在阿里云ECS上的，所以取了个这个名字
第四步：安装pm2，具体安装步骤可以百度
第五步：pm2 start build/ali-server.js
第六步：查看运行的项目列表（pm2 ls）
```

## 线上访问地址
服务器：阿里云ECS，部署框架：PM2，数据基于Mock
http://47.89.249.180:8384/ 双重架构的后台系统


## 多页架构的商城系统
#git仓库地址：git@github.com:zj0715zh/cms-build.git
#线上访问地址 http://47.89.249.180:8181/

