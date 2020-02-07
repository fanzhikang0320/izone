import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Error from '@/views/Error.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '*',
    component: Error
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
