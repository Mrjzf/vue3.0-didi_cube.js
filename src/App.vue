<template>
  <div id="app">
    <transition name="slide-right">
      <keep-alive :include="includePage">
        <router-view v-if="$route.meta.keepAlive"></router-view>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "app",
  data () {
    return {};
  },
  created () {

  },
  methods: {},
  computed: {
    ...mapGetters([
      "includePage"
    ])
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f9f9f9;
}

.slide-right-enter, .slide-right-leave-active {
  transform: translateX(-100%);
}

.slide-right-leave-active, .slide-right-enter-active {
  transition: all 0.5s 0.5s cubic-bezier(0.33, 0.25, 0.33, 1);
}
</style>
