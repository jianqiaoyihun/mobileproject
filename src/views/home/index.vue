<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in userChannels"
        :key="channel.id"
        >
          <!-- TODO: 文章列表 -->
      <article-list :channel="channel"></article-list>
      </van-tab>

    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0, // 控制标签页的激活项
      userChannels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        this.userChannels = data.data.channels
        console.log(this.userChannels)
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>
