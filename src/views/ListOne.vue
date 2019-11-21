<template>
  <div class="list">
    <BackBtn :itemTitle="itemTitle" />
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :options="scrollOptions"
        @pulling-up="onPullingUp"
        :scrollEvents="['scroll-end']"
        @scroll-end="scrollEnd"
      >
        <ScrollNav
          v-show="isShowNav"
          :current="currentItem"
          :labels="labelsItem"
          @currentItem="changeList"
        />
        <CategoryList :list="newsList" :itemTitle="currentItem" />
      </cube-scroll>
    </div>
    <div class="backTop" v-show="isShowBackTop" @click="scrollBackTop">
      <div class="cubeic-pullup"></div>
      <div class="topTxt">TOP</div>
    </div>
  </div>
</template>

<script>
import ScrollNav from "@/components/ScrollNav.vue";
import CategoryList from "@/components/CategoryList.vue";
import BackBtn from "@/components/BackBtn.vue";

export default {
  name: "listOne",
  components: {
    ScrollNav,
    CategoryList,
    BackBtn
  },
  data () {
    return {
      isShowNav: false,
      scrollOptions: {
        scrollbar: false,
        pullUpLoad: {
          threshold: 50, // 滑动距离阈值
          txt: "上滑加载更多"
        },
        pullDownRefresh: false
      },
      categoryId: "",
      itemTitle: '',
      listId: "",
      pageNum: 1,
      totalPage: 1,
      pageSize: 10,
      currentItem: "",
      labelsItem: [],
      navItems: [],
      newsList: [],
      toast: null,
      isShowBackTop: false
    };
  },
  created () {
    this.categoryId = this.$route.query.categoryId;
    this.itemTitle = this.$route.query.name;
    this.getItem();
  },
  mounted () {
    this.isKeepAlive();
  },
  activated () {
    // console.log('activated')
  },
  deactivated () {
    //  console.log('deactivated')
  },
  methods: {
    showToast (options) {
      this.toast = this.$createToast({
        time: options.time || 0,  //显示时间 0:永不消失, 手动凋hide方法
        txt: options.txt,
        mask: false,  // 显示遮罩
        type: options.type //显示图标类型
      });
      this.toast.show();
    },
    hideToast () {
      this.toast.hide();
    },
    onPullingUp () {
      if (this.pageNum < this.totalPage) {
        this.pageNum++;
        this.getList();
      } else {
        // 如果没有新数据
        this.$refs.scroll.forceUpdate(false);
      }
    },
    scrollEnd (position) {
      // console.log(position);
      this.isShowBackTop = position.y < -400 ? true : false;
    },
    scrollBackTop () {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    changeList (cur) {
      // console.log(cur, this.labelsItem.indexOf(cur));
      // this.$store.commit("scrollNavIndex", this.labelsItem.indexOf(cur));
      if (this.navItems.length > 0) {
        this.currentItem = this.navItems[this.labelsItem.indexOf(cur)].name;
        this.listId = this.navItems[this.labelsItem.indexOf(cur)].categoryId;
        this.newsList = [];
        this.getList();
      }
    },
    // 获取子栏目，如果有子栏目，则展示导航，否则递归展示数据列表
    getItem () {
      this.$axios
        .get("/cms/interfaces/vod/v1/listCategory", {
          params: {
            parentId: this.categoryId,
            pageNum: 1,
            pageSize: 100
          }
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            res = res.data.categorieList;
            if (res.length > 0) {
              this.navItems = res;
              res.forEach((v, i) => {
                this.labelsItem.push(v.name);
              });
              // this.$store.state.scrollNavIndex
              this.currentItem = res[0].name;
              this.isShowNav = true;
            } else {
              this.currentItem = this.itemTitle;
              this.listId = this.categoryId;
              this.getList();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getList () {
      this.showToast({ txt: '数据加载中', type: 'loading', time: 0 });
      this.$axios
        .get(`/cms/interfaces/vod/v1/listInfoByCategoryId`, {
          params: {
            categoryId: this.listId,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            whetherRecursive: true // 是否递归取子栏目数据
          }
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            this.totalPage = res.data.pageInfo.totalPage;
            this.newsList = this.newsList.concat(res.data.infoList);
            if (this.newsList.length > 0) {
              setTimeout(() => {
                // 标记上拉下拉结束，强制重新计算可滚动距离
                this.$refs.scroll.forceUpdate(true);
              }, 500);
              this.hideToast();
            } else {
              this.$refs.scroll.forceUpdate(true);
              this.hideToast();
              this.showToast({ txt: '暂无数据', type: 'txt', time: 2000 });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    isKeepAlive () {
      // console.log(this.$store.state.includePage)
      if (this.$store.state.includePage.indexOf("play") != -1) {    //页面的name，可以在路由设置name
        //console.log('有缓存，清除缓存')
        this.$store.commit('includePage', { pageName: 'play', flag: false });
      }
      if (this.$store.state.includePage.indexOf("info") != -1) {
        this.$store.commit('includePage', { pageName: 'info', flag: false });
      }
      if (this.$store.state.includePage.indexOf("listOne") == -1) {
        //如果没有缓存，就设置缓存
        this.$store.commit('includePage', { pageName: 'listOne', flag: true });
      };
    }
  },
  watch: {
    newsList: function (oldVal, newVal) {
      return newVal;
    }
  }
};
</script>

<style lang="stylus">
.list {
  .categoryList {
    margin-top: 0;
  }

  .backTop {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgba(181, 180, 180, 1);
    position: fixed;
    right: 80px;
    bottom: 200px;
    z-index: 100;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .cubeic-pullup {
      margin-top: -18px;
    }

    .topTxt {
      text-align: center;
      font-size: 20px;
      margin-top: -10px;
    }
  }
}
</style>
