<template>
  <div class="videoBox">
    <BackBtn :itemTitle="itemTitle" />
    <video
      id="liveVideo"
      ref="video"
      :poster="poster"
      controls
      x5-video-player-fullscreen="false"
      x5-video-orientation="portrait"
      webkit-playsinline
      x-webkit-airplay="true"
      playsinline="true"
      src
    >
      <source src type="video/mp4" />
    </video>
    <div class="info">
      <div class="title" v-html="infoTitle"></div>
      <div class="type-time">
        <span>智慧沙家浜</span>
        <span v-html="infoTime"></span>
      </div>
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn.vue";
export default {
  name: "play",
  components: {
    BackBtn
  },
  data () {
    return {
      infoId: "",
      assetId: "",
      assetName: "",
      poster: "",
      infoTitle: "",
      infoTime: "",
      itemTitle: ''
    };
  },
  created () {
    this.infoId = this.$route.query.infoId;
    this.itemTitle = this.$route.query.name;
    this.poster = this.$route.query.poster;
    this.getInfo();
  },
  mounted () { },
  computed: {},
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
            this.getPlayUrl(res.assetId, this.infoTitle);
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
          if (res.status === 200) {
            this.$refs.video.src = res.data.content[0].url;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  activated () { },
  filters: {}
};
</script>

<style lang="stylus">
.videoBox {
  width: 100%;
  height: 30vh;

  video {
    width: 100%;
    height: 100%;
  }

  .info {
    background-color: #fff;
    text-align: left;
    padding: 50px 30px;

    .title {
      font-size: 36px;
      color: #212121;
      font-weight: bold;
      line-height: 56px;
    }

    .type-time {
      font-size: 26px;
      color: #999;
      margin: 30px 0 50px 0;

      span {
        margin-right: 20px;
      }
    }
  }
}
</style>
