import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue';
import Main from '@/components/Main.vue';
import TextAndDynamic from '@/components/TextAndDynamic.vue'
import MyFocus from '@/components/MyFocus.vue'
import Msg from '@/components/Msg.vue'
import SearchDynamic from '@/components/SearchDynamic.vue'
Vue.use(VueRouter)
const secondRoutes = [
  {
    path:'firstpage',
    component: Main,
    name: 'firstpage',
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
        component: MyFocus
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg
      },
      {
        path: 'search',
        name: 'search',
        component: SearchDynamic
      }
    ]
  },
  {
    path: 'diarypage',
    name: 'diarypage',
    component: () => import ('@/components/Diary.vue')
  },
  {
    path: 'otherpage',
    name: 'otherpage',
    component: () => import ('@/components/Other.vue')
  },
  {
    path: 'aboutpage',
    name: 'aboutpage',
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
        component: () => import ('@/components/CenterTextAndDynamic.vue')
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
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    redirect: 'home/firstpage',
    children: secondRoutes
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
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
