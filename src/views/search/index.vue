<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        background="#3296fa"
        show-action
        @search="onSearch(searchContent)"
        @cancel="onCancel"
        @focus="isSearchResultShow = false"
        @input="onSearchInput"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isSearchResultShow" :q="searchContent"></search-result>
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell :title="item" icon="search" v-for="(item,index) in suggestions" :key="index">
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>

    </van-cell-group>
    <!-- 历史记录 -->

    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete" @click="isDeleteShow = false" v-if="isDeleteShow"></van-icon>
        <template v-else>
          <span  @click="searchHistory = []">全部删除</span>
          &nbsp;&nbsp;&nbsp;
          <span @click="isDeleteShow = true">完成</span>
        </template>
      </van-cell>
        <van-cell :title="item" v-for="(item,index) in searchHistory" :key="index" @click="onDelete(index,item)">
          <van-icon name="close"></van-icon>
        </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import searchResult from './components/search-result'
import { getSuggestions, getSearch } from '@/api/search'
import { debounce } from 'lodash'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    searchResult
  },
  props: {},
  data () {
    return {
      searchContent: '',
      isSearchResultShow: false,
      suggestions: [],
      searchHistory: getItem('search-history') || [],
      isDeleteShow: true
    }
  },
  computed: {},
  watch: {
    searchHistory (val) {
      setItem('search-history', val)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (q) {
      this.searchContent = q
      // 2. 记录搜索历史记录
      const searchHistory = this.searchHistory
      const index = searchHistory.indexOf(q)
      if (index !== -1) {
        searchHistory.splice(index)
      }
      this.searchHistory.unshift(q)
      this.isSearchResultShow = true
    },
    onDelete (index, item) {
      if (!this.isDeleteShow) {
        this.searchHistory.splice(index, 1)
      } else {
        this.onSearch(item)
      }
    },
    onCancel () {
      this.isSearchResultShow = false
    },
    // debounce 函数
    // 参数1：函数
    // 参数2：防抖时间
    // 返回值：防抖之后的函数，和参数1功能是一样的
    onSearchInput: debounce(async function () {
      const searchContent = this.searchContent
      if (!searchContent) {
        return
      }
      const { data } = await getSuggestions(searchContent)
      this.suggestions = data.data.options
    }, 200),
    highlight (str) {
      const searchContent = this.searchContent
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(searchContent, 'gi')
      return str.replace(reg, `<span style="color: #3296fa">${searchContent}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
