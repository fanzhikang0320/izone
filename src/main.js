/*
 * @Description: 
 * @version: 
 * @Author: Zhikang Fan
 * @Date: 2020-04-03 06:46:26
 * @LastEditors: Zhikang Fan
 * @LastEditTime: 2020-04-03 08:01:38
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);


axios.defaults.baseURL = 'http://127.0.0.1:8080';
Vue.use(VueAxios,axios);
var cookieUtil = require('./utils/cookie.js');
var sessionStorageUtil = require('./utils/sessionStorage.js');
//做登录判断
router.beforeEach((to,from,next) => {
  var cookieAccount = cookieUtil.getCookie('account');
  var sessionAccount = sessionStorageUtil.getSessionStorage('account');
  //判断当前cookie当中有没有记录登录账号,或者session中有没有记录
  if (!cookieAccount && !sessionAccount) {
    //判断是不是要去登录或者注册页面
      if (to.name == 'login' || to.name == 'register') {
        next();
        return;
      } 
      next({path: '/login'})
  } else {
    if (cookieAccount) {
      //如果用户是直接利用cookie直接访问的，需要种session
      sessionStorageUtil.setSessionStorage('account',cookieAccount)
    }
    next();
  }
  
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

