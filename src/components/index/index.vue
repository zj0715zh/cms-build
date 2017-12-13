<template>
  <section class="index">
    <p>欢迎来到商家后台</p>
    <section class="modules">
      <div class="module"><a href="javascript:;" @click="jump('/cms/goodsManage')">商品管理</a></div>
      <div class="module"><a href="javascript:;" @click="jump('/cms/orderManage')">订单管理</a></div>
      <div class="module"><a href="javascript:;" @click="jump('/cms/serveManage')">售后管理</a></div>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'index',
    created(){
      this.$store.commit('set_BreadcrumbList',{})
      this.$store.commit('set_isCollapse',{isCollapse:true})
    },
    mounted(){

    }
  }
</script>

<style scoped lang="css" src="./index.css">
</style>
