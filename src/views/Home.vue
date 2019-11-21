<template>
  <div class="home">
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :options="scrollOptions" @pulling-down="onPullingDown">
        <!-- banner || 视频 -->
        <div id="banner">
          <cube-slide :data="videoList" :loop="false" :auto-play="false" :showDots="false">
            <cube-slide-item v-for="(item, index) in videoList" :key="index">
              <video
                id="video"
                ref="video"
                :poster="item.poster | videoPoster"
                controls
                x5-video-player-fullscreen="false"
                x5-video-orientation="portrait"
                webkit-playsinline
                x-webkit-airplay="true"
                playsinline="true"
              >
                <source :src="item.url" type="video/mp4" />
              </video>
            </cube-slide-item>
          </cube-slide>
        </div>

        <!-- 栏目列表 -->
        <ItemList :itemList="itemList" :isShowAll="true" />

        <!-- 通知公告 -->
        <div id="notice">
          <div class="noticeIcon">
            <img src="../assets/icon-hot.png" alt />
          </div>
          <div class="noticeMsg">
            <cube-slide :data="noticeList" direction="vertical" :showDots="false">
              <cube-slide-item
                v-for="(item, index) in noticeList"
                :key="index"
                @click.native="goInfo(item)"
              >{{ item.title | titleSort(index) }}</cube-slide-item>
            </cube-slide>
          </div>
          <router-link
            tag="i"
            :to="{ name: 'listOne', query: { categoryId: categoryId_hot,name:categoryId_hot_name } }"
            class="cubeic-arrow"
          ></router-link>
        </div>

        <!-- 分类列表 -->
        <CategoryList
          :list="newsList"
          :title="newsList[0].categoryName"
          :categoryId="categoryId_news"
          :itemTitle="categoryId_news_name"
        />
        <CategoryList
          :list="watchList"
          :title="watchList[0].categoryName"
          :categoryId="categoryId_watch"
          :itemTitle="categoryId_watch_name"
        />
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList.vue";
import ItemList from "@/components/ItemList.vue";
export default {
  name: "home",
  components: {
    ItemList,
    CategoryList
  },
  data () {
    return {
      categoryId: "2598",
      categoryId_hot: "2678", // 活动看点栏目id
      categoryId_news: "2600", // 沙家浜新闻栏目id
      categoryId_watch: "2601", // 栏目id
      categoryId_hot_name: '活动看点',
      categoryId_news_name: '沙家浜新闻',
      categoryId_watch_name: '视频看点',
      scrollOptions: {
        scrollbar: false,
        pullDownRefresh: {
          threshold: 60, //	下拉刷新动作的下拉距离阈值
          stop: 40, // 回弹停留的位置
          stopTime: 300, // 刷新成功的文案显示时间
          txt: "刷新成功" // 刷新成功的文案
        }
      },
      videoList: [],
      itemList: [],
      noticeList: [],
      newsList: [
        {
          categoryName: ""
        }
      ],
      watchList: [
        {
          categoryName: ""
        }
      ]
    };
  },
  created () {
    this.getItem();
    this.getVideo();
    this.getList(this.categoryId_hot, res => {
      this.noticeList = res;
    });
    this.getList(this.categoryId_news, res => {
      this.newsList = res;
    });
    this.getList(this.categoryId_watch, res => {
      this.watchList = res;
    });
  },
  mounted () {
    // console.log('mounted');
    this.isKeepAlive();
  },
  activated () {
    // console.log('activated');
    this.isKeepAlive();
  },
  methods: {
    onPullingDown () {
      setTimeout(() => {
        this.getItem();
        this.getVideo();
        this.getList(this.categoryId_hot, res => {
          this.noticeList = res;
        });
        this.getList(this.categoryId_news, res => {
          this.newsList = res;
        });
        this.getList(this.categoryId_watch, res => {
          this.watchList = res;
        });
        this.$refs.scroll.forceUpdate();
      }, 2000);
    },
    // 获取首页栏目列表
    getItem () {
      this.$axios
        .get("/cms/interfaces/vod/v1/listCategory", {
          params: {
            parentId: this.categoryId,
            pageNum: 1,
            pageSize: 7
          }
        })
        .then(res => {
          // console.log(res);
          if (res.status == 200) {
            this.itemList = res.data.categorieList;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 获取首页视频
    getVideo () {
      this.$axios
        .get(
          `/cms/dataEnginerServlet?key=L_${this.categoryId}_12_videolist_${this.categoryId}_1&pageSize=1`
        )
        .then(res => {
          // console.log(res);
          if (res.status == 200) {
            let videoRes = res.data.dataList;
            if (videoRes.length > 0) {
              this.videoList.push({
                poster: videoRes[0].poster
              });
              this.getPlayUrl(videoRes[0].assetId, videoRes[0].title);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 获取播放地址
    getPlayUrl (assetId, assetName) {
      this.$axios
        .get(`/cms/interfaceservice/play`, {
          params: {
            assetId: assetId,
            assetName: assetName,
            clientId: "sjbwx",
            busiType: "vpg"
          }
        })
        .then(res => {
          // console.log(res);
          if (res.status == 200) {
            this.videoList[0].url = res.data.content[0].url;
            this.videoList[0].name = res.data.assetName;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 获取列表数据
    getList (id, fn) {
      this.$axios
        .get(`/cms/interfaces/vod/v1/listInfoByCategoryId`, {
          params: {
            categoryId: id,
            pageNum: 1,
            pageSize: 3
          }
        })
        .then(res => {
          // console.log(res);
          if (res.status == 200) {
            let dataList = res.data.infoList;
            fn(dataList);
          }
        });
    },
    goInfo (infoObj) {
      if (infoObj.type == "info") {
        this.$router.push({
          path: "/info",
          query: {
            infoId: infoObj.id,
            name:infoObj.categoryName
          }
        });
      } else {
        this.$router.push({
          path: "/play",
          query: {
            infoId: infoObj.id,
            name:infoObj.categoryName,
            poster: infoObj.largeImg
          }
        });
      }
    },
    isKeepAlive () {
      // console.log(this.$store.state.includePage)
      if (this.$store.state.includePage.indexOf("listOne") != -1) {
        this.$store.commit('includePage', { pageName: 'listOne', flag: false });
      }
      if (this.$store.state.includePage.indexOf("home") == -1) {
        this.$store.commit('includePage', { pageName: 'home', flag: true });
      }
    }
  },
  computed: {},
  filters: {
    videoUrl (v) {
      return "http://58.240.199.244:9191/vod/" + v + ".mp4";
    },
    videoPoster (v) {
      return "/cms/res/appPoster/stb/" + v;
    },
    titleSort (v, i) {
      return i + 1 + "、" + v;
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   // 设置下一个路由的 meta
  //   to.meta.keepAlive = false;  // 下一页面不缓存，即刷新
  //   next();
  // }
};
</script>

<style lang="stylus">
.scroll-list-wrap {
  height: 100vh;
}

/* 刷新成功提示文字样式 */
.cube-pulldown-loaded span {
  font-size: 26px;
}

.cube-loading-spinners {
  width: 2em !important;
  height: 2em !important;
}

#banner {
  width: 100%;
  height: 422px;

  video {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}

#notice {
  width: 100%;
  height: 130px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;

  .noticeIcon {
    width: 64px;
    height: 68px;
  }

  .noticeMsg {
    width: 540px;
    height: 64px;
    margin: 0 30px;
    overflow: hidden;

    .cube-slide-item {
      width: 100%;
      height: 64px;
      line-height: 64px;
      font-size: 28px;
      color: #666;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  i {
    font-size: 38px;
    color: #666;
  }
}
</style>
