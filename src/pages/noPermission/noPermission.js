import Vue from 'vue'
import App from './App'
import 'common/css/reset.css'
var app;
var noPermission = {
	init(){
		app = new Vue({
	    	el: '#app',
		  	template: '<App/>',
		  	components: { App }
		});
	}
}
noPermission.init();
