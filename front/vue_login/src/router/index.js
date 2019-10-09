import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import LoginTest from '@/components/LoginTest'
import TestTab from '@/components/TestTab'
import Home from '@/components/Home'
import TestLogin from '@/components/TestLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/LL',
      name: 'LL',
      component: LoginTest
    },
    {
      path: '/t',
      name: 't',
      component: TestTab
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/a',
      name: 'a',
      component: TestLogin
    }
  ]
})
