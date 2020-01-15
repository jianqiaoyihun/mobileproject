<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <div class="logo"></div>
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </div>
      <!-- <van-icon name="search" slot="right" class="search-button" round  @click="$router.push('/search')" /> -->
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
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
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '90%' }"
      round
      closeable
      close-icon-position="top-left"
    >
    <channel-edit :userChannels="userChannels" @switch="onChannelSwitch" :active="active"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制标签页的激活项
      userChannels: [],
      isChannelEditShow: false
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
        let channels = []
        if (getItem('user-channels')) {
          channels = getItem('user-channels')
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
        this.userChannels = channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    },
    onChannelSwitch (index) {
      this.active = index
      this.isChannelEditShow = false
    }
  }
}
</script>
<style scoped lang="less">
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
.wap-nav {
  position: fixed;
  right: 0;
  line-height: 44px;
  background: #fff;
  opacity: .8;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
}
.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .logo {
      background: url("./logo-light.png") no-repeat;
      background-size: cover;
      width: 100px;
      height: 30px;
    }
    .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
  }
</style>
