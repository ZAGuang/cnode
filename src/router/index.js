import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'

import Home from '@/components/home'
import Message from '@/components/message'
import Publish from '@/components/publish'
import Mine from '@/components/mine'

import Detail from '@/components/detail'

import Login from '@/components/login'
// import Header from '@/components/header'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children:[
        {path:"/",component:Home},
        {path:"/message",component:Message},
        {path:"/publish",component:Publish},
        {path:"/mine",component:Mine},
      ]
    },
    {
      path:"/detail",
      component:Detail
    },
    {
      path:"/login",
      component:Login
    }
  ]
})
export default router
router.push("/?tab=dev")
