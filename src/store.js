import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scrollNavIndex: 0, // 列表顶部导航索引
    scrollTop: 0, // 页面滚动距离顶部距离
    includePage: []
  },
  getters: {
    includePage: state => state.includePage
  },
  mutations: {
    scrollNavIndex (s, v) {
      s.scrollNavIndex = v
    },
    scrollTop (s, v) {
      s.scrollTop = v
    },
    includePage (state, obj) {
      if (obj.flag) {
        state.includePage.push(obj.pageName)
      } else {
        state.includePage.splice(state.includePage.indexOf(obj.pageName), 1)
      }
    }
  },
  actions: {}
})

// this.$store.commit("scrollNavIndex", 0)
// this.$store.state.scrollNavIndex
