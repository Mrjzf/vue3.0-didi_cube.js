<template>
  <div class="infoBox">
    <BackBtn :itemTitle="itemTitle" />
    <div class="info">
      <div class="title" v-html="infoTitle"></div>
      <div class="type-time">
        <span>智慧沙家浜</span>
        <span v-html="infoTime"></span>
      </div>
      <div class="content" v-html="infoContent"></div>
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn.vue";
export default {
  name: "info",
  components: {
    BackBtn
  },
  data () {
    return {
      infoId: "",
      infoTitle: "",
      infoTime: "",
      infoContent: "",
      itemTitle: ''
    };
  },
  created () {
    this.infoId = this.$route.query.infoId;
    this.itemTitle = this.$route.query.name;
    this.getInfo();
  },
  methods: {
    getInfo () {
      this.$axios
        .get(`/cms/interfaces/vod/v1/getInfoContentById`, {
          params: {
            infoId: this.infoId
          }
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            res = res.data;
            this.infoTitle = res.title;
            this.infoTime = res.auditTime;
            this.infoContent = res.content;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="stylus">
.infoBox {
  width: 100%;
  background-color: #fff;
  text-align: left;
  overflow: hidden;
  box-sizing: border-box;

  .info {
    padding: 100px 30px;

    .title {
      width: 100%;
      font-size: 38px;
      color: #212121;
      font-weight: bold;
      line-height: 56px;
    }

    .type-time {
      font-size: 28px;
      color: #999;
      margin: 30px 0 50px 0;

      span {
        margin-right: 20px;
      }
    }

    .content {
      color: #212121;
      font-size: 30px;
      line-height: 60px;
    }
  }

  .back {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #fff;
  }
}
</style>
