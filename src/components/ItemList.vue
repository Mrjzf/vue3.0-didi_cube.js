<template>
  <div class="itemList">
    <div class="headTitle" v-show="showTitle == '' ? false : true">{{ showTitle }}</div>
    <ul>
      <li
        class="itemBox"
        v-for="(item, index) in itemList"
        :key="index"
        @click="golistone(item.categoryId,item.name)"
      >
        <div class="itemIcon">
          <img class :src="item.picUrl" alt />
        </div>
        <div class="itemName">{{ item.name }}</div>
      </li>

      <router-link tag="li" to="/itemAll" class="itemBox" v-show="isShowAll">
        <div class="itemIcon">
          <img class :src="all.icon" alt />
        </div>
        <div class="itemName">{{ all.name }}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    itemList: Array,
    isShowAll: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      all: {
        icon: require('../assets/all.png'),
        name: '全部'
      }
    }
  },
  methods: {
    // 公用列表样式1
    golistone (id, name) {
      // this.$store.commit("scrollNavIndex", 0);
      this.$router.push({
        path: '/listOne',
        query: {
          categoryId: id,
          name: name
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.itemList {
  width: 100%;
  background-color: #fff;

  .headTitle {
    width: 100%;
    height: 80px;
    text-align: left;
    line-height: 80px;
    color: #212121;
    font-size: 28px;
    font-weight: 500;
    padding-left: 30px;
    box-sizing: border-box;
    /* border-bottom: 1px solid #eee; */
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    .itemBox {
      width: 25%;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .itemIcon {
        width: 88px;
        height: 88px;

        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      }

      .itemName {
        font-size: 22px;
        margin-top: 20px;
      }
    }
  }
}
</style>
