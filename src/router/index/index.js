import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: resolve => require(['components/index/index'], resolve)
    },
    {
      path: '/cms/index',
      name: '首页',
      component: resolve => require(['components/index/index'], resolve)
    },
    {
      path: '/cms/goodsManage',
      name: '商品管理',
      component: resolve => require(['components/goodsManage/goodsManage'], resolve)
    },
    {
      path: '/cms/orderManage',
      name: '订单管理',
      component: resolve => require(['components/orderManage/orderManage'], resolve)
    },
    {
      path: '/cms/serveManage',
      name: '售后管理',
      component: resolve => require(['components/serveManage/serveManage'], resolve)
    },
    {
      path: '/cms/addStepOne',
      name: '编辑基本信息',
      component: resolve => require(['components/addStepOne/addStepOne'], resolve)
    },
    {
      path: '/addStepTwo',
      name: '编辑商品属性信息',
      component: resolve => require(['components/addStepTwo/addStepTwo'], resolve)
    },
    {
      path: '/addStepThree',
      name: '编辑商品sKu',
      component: resolve => require(['components/addStepThree/addStepThree'], resolve)
    },
    {
      path: '/noPermission',
      name: '无权限页，禁止访问',
      component: resolve => require(['components/noPermission/noPermission'], resolve)
    }
  ]
})