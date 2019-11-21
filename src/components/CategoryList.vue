<template>
  <div class="categoryList">
    <!-- 头部标题&更多 -->
    <div class="listHead" v-show="title == '' ? false : true">
      <div class="categoryName">{{ title }}</div>
      <div class="more" @click="more">
        <span>更多</span>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <ul class="listBox">
      <li v-for="(item, index) in list" :key="index" @click="goInfo(item)">
        <div class="list-left">
          <div class="list-title">{{ item.title }}</div>
          <div class="list-other">
            <span class="videoCornerMark" v-show="item.type == 'video' ? true : false">视频</span>
            <span class="list-type">{{ item.categoryName }}</span>
            <span class="list-time">{{ item.auditTime }}</span>
          </div>
        </div>
        <div class="list-right">
          <img :src="item.type | filtersPoster(item.smallImg, item.largeImg, item.posterUrl)" alt />
          <div class="videoIcon" v-show="item.type == 'video' ? true : false"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  props: {
    list: Array,
    title: {
      type: String,
      default: ""
    },
    itemTitle: {
      type: String,
      default: "智慧沙家浜"
    },
    categoryId: {
      type: String,
      default: ""
    }
  },
  created () { },
  mounted () { },
  methods: {
    more () {
      // this.$store.commit("scrollNavIndex", 0);
      this.$router.push({
        path: "/listOne",
        query: {
          categoryId: this.categoryId,
          name: this.itemTitle
        }
      });
    },
    goInfo (infoObj) {
      if (infoObj.type === "info") {
        this.$router.push({
          path: "/info",
          query: {
            infoId: infoObj.id,
            name: infoObj.categoryName
          }
        });
      } else {
        //跳转播放页
        let videoPoster = "";
        if (infoObj.largeImg !== "") {
          videoPoster = infoObj.largeImg;
        } else if (infoObj.posterUrl !== "") {
          videoPoster = infoObj.posterUrl;
        } else if (infoObj.smallImg !== "") {
          videoPoster = infoObj.smallImg;
        } else {
          videoPoster = require("../assets/default.png");
        }
        this.$router.push({
          path: "/play",
          query: {
            infoId: infoObj.id,
            name: infoObj.categoryName,
            poster: videoPoster
          }
        });
      }
    }
  },
  filters: {
    filtersPoster (v, smallImg, largeImg, posterUrl) {
      if (v === "info") {
        if (smallImg !== "") {
          return smallImg;
        } else if (posterUrl !== "") {
          return posterUrl;
        } else if (largeImg !== "") {
          return largeImg;
        } else {
          return require("../assets/default.png");
        }
      } else {
        if (largeImg !== "") {
          return largeImg;
        } else if (posterUrl !== "") {
          return posterUrl;
        } else if (smallImg !== "") {
          return smallImg;
        } else {
          return require("../assets/default.png");
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.categoryList {
  width: 100%;
  margin-top: 20px;
  background-color: #fff;

  .listHead {
    width: 100%;
    height: 88px;
    padding: 0 30px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .categoryName {
      color: #444444;
      font-weight: bold;
      font-size: 34px;
    }

    .more {
      font-size: 24px;
      color: #bbb;
      padding: 8px 0;

      span {
        margin-right: 20px;
      }
    }
  }

  .listBox {
    width: 100%;

    li {
      width: 100%;
      height: 208px;
      border-bottom: 1px solid #eee;
      padding: 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .list-left {
        width: 420px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .list-title {
          height: 86px;
          color: #444444;
          font-size: 28px;
          font-weight: bold;
          text-align: left;
          line-height: 42px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .list-other {
          color: #999999;
          font-size: 26px;
          display: flex;
          align-items: center;

          span {
            margin-right: 20px;
          }

          span:first-child {
            display: inline-block;
            border: 1px solid #212121;
            border-radius: 6px;
            padding: 6px 6px 4px;
          }
        }
      }

      .list-right {
        width: 220px;
        height: 100%;
        position: relative;
        border-radius: 6px;
        overflow: hidden;

        .videoIcon {
          width: 64px;
          height: 64px;
          background: url('../assets/icon-video.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-32px, -32px);
        }
      }
    }
  }
}
</style>
