<template>
<section id="topMenu">
	<a href="javascript:;" class="cmslogo">混合模式下的CMS系统</a>
	<section class="user_info">
		<div class="user_name">
			<span>{{userName}}</span>
			<i class="icon iconfont icon-yonghu"></i>
		</div>
		<div class="login_out">
			<span @click="loginOut">注销</span>
			<i class="icon iconfont icon-zhuxiao2"></i>
		</div>
	</section>
</section>
</template>
<script>
	import Vue from 'vue'
	export default {
		name:'topMenu',
	    data() {
        	return {
	      		userName:''
	      	}
	    },
	    created(){
	    	// this.$store.commit('set_isLoading',{isLoading:true})
	    	this.$ajax.get('/user/getSellerUser')
			.then((response)=>{
				var data = response.data.content;
				if(data.userId == undefined){
					window.location.href = '/noPermission';
					return;
				}
	    		this.$store.commit('SET_USER',{user:data})
	    		this.userName = data.sellerUserName;
	    		// this.$store.commit('set_isLoading',{isLoading:false})
			})
			.catch(error=>{
				console.log(error)
				this.goodsListLoading = false;
				// this.$store.commit('set_isLoading',{isLoading:false})
			})
	    },
	    methods: {
	      	loginOut(){
	      		window.location.href = '/noPermission';
	      	},
	      	clearCookie(){ 
	      		window.location.href="https://ac.ppdai.com/User/Logout?redirect=http%3A%2F%2Fstoresop.ppdai.com%2F";
				// var iframe = document.createElement('iframe'); 
				// iframe.src="https://ac.ppdai.com/User/Logout";  
				// document.body.appendChild(iframe);
				// setTimeout(()=>{
				// 	window.location.reload();
				// },1000)
			} 
	    },
	    mounted(){
	    	setTimeout(()=>{
	    		this.$message({
		          	showClose: true,
		          	message: '本平台建议使用谷歌或者火狐浏览器浏览',
		          	type: 'error'
		        });
	    	},1000)
	    }
    }
</script>
<style scoped lang="css" src="./topMenu.css">
</style>