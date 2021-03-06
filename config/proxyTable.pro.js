module.exports = {
    '/order':{
        target:'http://172.20.19.13:8087/',
        changeOrigin:true,
        pathRewrite:{
            '^/order':'/order'//如果是接口多出来的一层目录，则设为空字符串，如：/liuyong/discount/getIndex
        }
    },
    '/user':{
        target:'http://172.20.19.13:8087/',
        changeOrigin:true,
        pathRewrite:{
            '^/user':'/user'//如果是接口多出来的一层目录，则设为空字符串，如：/liuyong/discount/getIndex
        }
    },
    '/main':{
        target:'http://172.20.19.13:8087/',
        changeOrigin:true,
        pathRewrite:{
            '^/main':'/main'//如果是接口多出来的一层目录，则设为空字符串，如：/liuyong/discount/getIndex
        }
    }
}
