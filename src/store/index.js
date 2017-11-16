import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutation'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    isCollapse: true,
    webloglist:[],
    userInfo:{},
    isLoading:false,
    goodsInfo:{
        typeOne: '',
        typeTwo:'',
        name: 'dadas',
        brand:'',
        saleStartDate:'',
        saleEndDate:'',
        goodsDesc:''
    },
    BreadcrumbList:[]
  },
  mutations,	
  actions,
  getters,
  strict: debug,
})
