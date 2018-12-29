import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode:process.env.NODE_ENV === 'production' ?'history':'hash',
  routes: [
    {
      path: '/cms/index',
      name: '首页',
      component: r => require.ensure([], () => r(require('components/index/index')), 'spa-cms-index')
    },
    {
      path: '/cms/goodsManage',
      name: '商品管理',
      component: r => require.ensure([], () => r(require('components/goodsManage/goodsManage')), 'spa-cms-goodsManage')
    },
    {
      path: '/cms/orderManage',
      name: '订单管理',
      component: r => require.ensure([], () => r(require('components/orderManage/orderManage')), 'spa-cms-orderManage')
    },
    {
      path: '/cms/serveManage',
      name: '售后管理',
      component: r => require.ensure([], () => r(require('components/serveManage/serveManage')), 'spa-cms-serveManage')
    },
    {
      path: '/cms/addStepOne',
      name: '编辑基本信息',
      component: r => require.ensure([], () => r(require('components/addStepOne/addStepOne')), 'spa-cms-addStepOne')
    },
    {
      path: '/cms/addStepTwo',
      name: '编辑商品属性信息',
      component: resolve => require(['components/addStepTwo/addStepTwo'], resolve)
    },
    {
      path: '/cms/addStepThree',
      name: '编辑商品sKu',
      component: resolve => require(['components/addStepThree/addStepThree'], resolve)
    }
  ]
})