<template>
  <div class="list">
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :options="scrollOptions"
        @pulling-up="onPullingUp"
      >
        <ScrollNav :current="current" :labels="labels" @current="changeList" />
        <List :list="newsList" />
      </cube-scroll>
    </div>
    <BackBtn />
  </div>
</template>

<script>
import ScrollNav from '@/components/ScrollNav.vue'
import BackBtn from '@/components/BackBtn.vue'
import List from '@/components/CategoryList2.vue'

export default {
  name: 'listTwo',
  components: {
    ScrollNav,
    BackBtn,
    List
  },
  data () {
    return {
      scrollOptions: {
        scrollbar: false,
        pullUpLoad: false,
        pullDownRefresh: false
      },
      current: '农业动态',
      labels: [
        '农业动态',
        '农业提醒',
        '农业生产',
        '农业发展',
        '农业致富经',
        '农业规划'
      ],
      newsList: [
        {
          title: '党中央总体规划',
          poster: require('../assets/poster.png'),
          type: 'info',
          categoryName: '党建动态1',
          time: '08月01日'
        },
        {
          title: '唐市中学举行“法律伴我行”主题 班会',
          poster: require('../assets/poster.png'),
          type: 'info',
          categoryName: '党建动态2',
          time: '08月02日'
        },
        {
          title: '各基层党组织学习“四讲四有”事 迹报告会',
          poster: require('../assets/poster.png'),
          type: 'video',
          categoryName: '党建动态3',
          time: '08月03日'
        },
        {
          title: '党中央总体规划（2016-2030） 批前公示',
          poster: require('../assets/poster.png'),
          type: 'info',
          categoryName: '党建动态1',
          time: '08月01日'
        },
        {
          title: '唐市中学举行“法律伴我行”主题 班会',
          poster: require('../assets/poster.png'),
          type: 'info',
          categoryName: '党建动态2',
          time: '08月02日'
        },
        {
          title: '各基层党组织学习“四讲四有”事 迹报告会',
          poster: require('../assets/poster.png'),
          type: 'video',
          categoryName: '党建动态3',
          time: '08月03日'
        },
        {
          title: '各基层党组织学习“四讲四有”事 迹报告会',
          poster: require('../assets/poster.png'),
          type: 'video',
          categoryName: '党建动态3',
          time: '08月03日'
        },
        {
          title: '唐市中学举行“法律伴我行”主题 班会',
          poster: require('../assets/poster.png'),
          type: 'info',
          categoryName: '党建动态2',
          time: '08月02日'
        },
        {
          title: '各基层党组织学习“四讲四有”事 迹报告会',
          poster: require('../assets/poster.png'),
          type: 'video',
          categoryName: '党建动态3',
          time: '08月03日'
        },
        {
          title: '各基层党组织学习“四讲四有”事 迹报告会',
          poster: require('../assets/poster.png'),
          type: 'video',
          categoryName: '党建动态3',
          time: '08月03日'
        }
      ]
    }
  },
  created () {},
  methods: {
    onPullingUp () {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          console.log('加载数据')
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    changeList (cur) {
      console.log(cur, this.labels.indexOf(cur))
    }
  },
  watch: {}
}
</script>

<style lang="stylus">
.list {
  background-color: #fff;
}
</style>
