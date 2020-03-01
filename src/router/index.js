import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue';
import Main from '@/components/Main.vue';
import TextAndDynamic from '@/components/TextAndDynamic.vue'
import Dynamic from '@/components/Dynamic.vue';
Vue.use(VueRouter)
const secondRoutes = [
  {
    path:'firstpage',
    component: Main,
    redirect: 'firstpage/TextAndDynamic',
    children: [
      {
        path: 'TextAndDynamic',
        name: 'TextAndDynamic',
        component: TextAndDynamic
      },
      {
        path: 'myfocus',
        name: 'myfocus',
        component: Dynamic
      },
      {
        path: 'msg',
        name: 'msg',
        component: import ('@/components/Msg.vue')
      }
    ]
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
  },
  {
    path: 'personCenter',
    name: 'personCenter',
    component: () => import ('@/components/PersonCenter.vue'),
    redirect: 'personCenter/mydynamic',
    children: [
      {
        path: 'mydynamic',
        name: 'mydynamic',
        component: () => import ('@/components/TextAndDynamic.vue')
      },
      {
        path: 'messageBoard',
        name: 'messageBoard',
        component: () => import ('@/components/MessageBoard.vue')
      }
    ]
  }
];
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home,
    redirect: 'home/firstpage',
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
