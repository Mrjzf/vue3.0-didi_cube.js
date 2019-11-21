import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './cube-ui'
import './registerServiceWorker'
import 'amfe-flexible'
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 路由变化修改页面title
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
