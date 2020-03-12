import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locationUserInfo: {},
    load: true,
    showNull: false,
    data: []
  },
  getters: {
    //控制内容是否加载
    loading(state) {
      return state.load;
    },
    //控制内容是否已经空了
    isShowNull(state) {
      return state.showNull
    },
    //最终要传递的第一波数据
    dynamicInfoData(state) {
      return state.data
    }
  },
  //同步，用于更改state当中的值
  mutations: {
    changeLocationUserInfo (state,payload) {
      state.locationUserInfo = payload;
    },
    changeData(state,payload) {
      state.data = payload;
    },
    changeLoading(state,payload) {
      state.load = payload;
    },
    changeShowNull(state,payload) {
      state.showNull = payload;
    }
    
  },
  //异步，
  actions: {
    
  },
  modules: {
  }
})
