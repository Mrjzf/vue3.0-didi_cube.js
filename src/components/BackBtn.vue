<template>
  <div class="back" @click="back()">
    <div class="cubeic-back"></div>
    <div class="itemTitle">{{itemTitle}}</div>
  </div>
</template>

<script>
export default {
  props: {
    itemTitle: {
      type: String,
      default: "智慧沙家浜"
    }
  },
  data () {
    return {}
  },
  created () { },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
.back {
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: #100f0f;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(153, 153, 153, 0.4);

  .cubeic-back {
    margin: 0 30px;
    font-size: 36px;
  }

  .itemTitle {
    width: 100%;
    font-size: 30px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
