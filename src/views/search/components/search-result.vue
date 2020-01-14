<template>
<div>
  <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in results"
        :key="index"
        :title="item.title"
      />
    </van-list>
</div>

</template>

<script>
import { getSearch } from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      results: [],
      page: 1,
      perPage: 10
    }
  },
  props: {
    q: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.q // 查询参数
      })
      const { results } = data.data
      this.results.push(...results)
      // 加载状态结束
      this.loading = false
      // 4. 判断是否还有数据
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，结束关闭加载更多
      }
    }
  }
}
</script>

<style>

</style>
