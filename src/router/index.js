import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue';
import Main from '@/components/Main.vue';
Vue.use(VueRouter)
const secondRoutes = [
  {
    path:'firstpage',
    component: Main
  },
  {
    path: 'diarypage',
    component: () => import ('@/components/Diary.vue')
  },
  {
    path: 'otherpage',
    component: () => import ('@/components/Other.vue')
  },
  {
    path: 'aboutpage',
    component: () => import ('@/components/About.vue')
  }
];
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/firstpage',
    children: secondRoutes
  },
  {
    path: '/login',
    component: () => import ('@/views/Login.vue')
  },
  {
    path: '/register',
    component: () => import ('@/views/Register.vue')
  },
  {
    path: '*',
    component: () => import ('@/views/Error.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
