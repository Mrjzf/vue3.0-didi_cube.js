<template>
  <div class="scrollNav">
    <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler" />
  </div>
</template>

<script>
export default {
  name: "scrollNav",
  props: {
    current: {
      type: String,
      default: ""
    },
    labels: Array
  },
  components: {},
  data () {
    return {};
  },
  created () {
    // console.log(this.labels)
  },
  methods: {
    changeHandler (cur) {
      this.$emit("currentItem", cur);
    }
  }
};
</script>

<style lang="stylus">
.cube-scroll-nav-bar_horizontal .cube-scroll-wrapper {
  text-align: left;
}

.cube-scroll-nav-bar-items {
  font-size: 30px;
  color: #666666;
  padding: 0 10px;
}

.cube-scroll-nav-bar-item_active {
  color: #F25758;
  position: relative;
}

.cube-scroll-nav-bar-item_active::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #F25758;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-40px);
}
</style>
