<template>
  <div class="itemAll">
    <BackBtn :itemTitle="itemTitle" />
    <ItemList :itemList="itemList" :showTitle="itemTitle" />
  </div>
</template>

<script>
import ItemList from "@/components/ItemList.vue";
import BackBtn from "@/components/BackBtn.vue";

export default {
  name: "itemAll",
  components: {
    ItemList,
    BackBtn
  },
  data () {
    return {
      categoryId: "2598",
      itemTitle: "智慧沙家浜",
      itemList: []
    };
  },
  created () {
    this.getItem();
  },
  mounted() {
    this.isKeepAlive();
  },
  methods: {
    // 获取所有栏目列表
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
            this.itemList = res.data.categorieList;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    isKeepAlive () {
      // console.log(this.$store.state.includePage)
      if (this.$store.state.includePage.indexOf("listOne") != -1) {
        this.$store.commit('includePage', { pageName: 'listOne', flag: false });
      }
    }
  }
};
</script>

<style lang="stylus"></style>
