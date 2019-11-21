<template>
  <div class="categoryList2">
    <ul class="listBox">
      <li v-for="(item, index) in list" :key="index">
        <div class="top" @click="goPlay(index)">
          <img class="list-poster" :src="item.poster" alt />
        </div>
        <div class="bottom">
          <div class="list-title">
            <p>{{ item.title }}</p>
          </div>
          <div class="list-time">{{ item.time }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryList2',
  props: {
    list: Array
  },
  created () {},
  mounted () {},
  methods: {
    goPlay (index) {
      this.$router.push({
        path: '/play',
        query: {
          id: index
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.categoryList2 {
  width: 100%;
  background-color: #fff;

  .listBox {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      width: 48%;
      height: 280px;
      margin-bottom: 18px;

      .top {
        width: 100%;
        height: 184px;

        img {
          border-radius: 6px;
        }
      }

      .bottom {
        width: 100%;
        height: 96px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;

        .list-title {
          height: 62px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 10px 0 6px;

          p {
            font-size: 28px;
            color: #444444;
            font-weight: bold;
            line-height: 32px;
          }
        }

        .list-time {
          font-size: 24px;
          color: #999999;
        }
      }
    }
  }
}
</style>
