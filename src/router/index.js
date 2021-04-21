
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [

    ]
  },
  {
    path: '/about',
    name: 'About',
    redirect: {name: "page1"},
    component: () => import('../views/About.vue'),
    children: [
      {
        path: '/about/page1',
        name: 'page1',
        component: resolve => require(['../views/page1.vue'], resolve),
        meta: {
          desc: "我是第一页"
        }
      },
      {
        path: '/about/:id',
        name: 'page2',
        component: resolve => require(['../views/page2.vue'], resolve)
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
