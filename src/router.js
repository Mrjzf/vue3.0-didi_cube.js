import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ItenAll from './views/ItemAll.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '智慧沙家浜'
      // keepAlive: true
    }
  },
  {
    path: '/itemAll',
    name: 'itemAll',
    component: ItenAll,
    meta: {
      title: '智慧沙家浜'
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import( /* webpackChunkName: "about" */ './views/ItemAll.vue')
  },
  {
    path: '/listOne',
    name: 'listOne',
    component: () => import('./views/ListOne.vue'),
    meta: {
      title: '智慧沙家浜'
    }
  },
  {
    path: '/listTwo',
    name: 'listTwo',
    component: () => import('./views/ListTwo.vue'),
    meta: {
      title: '智慧沙家浜'
    }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('./views/Info.vue'),
    meta: {
      title: '智慧沙家浜'
    }
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('./views/Play.vue'),
    meta: {
      title: '智慧沙家浜'
    }
  }
  ]
})
