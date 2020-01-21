<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      class="loading"
      color="#1989fa"
      vertical
      v-if="loading"
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="articleList.title">
      <h3 class="title">{{ articleList.title }}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div class="text">
            <p class="name">{{ articleList.aut_name }}</p>
            <p class="time">{{ articleList.pubdate | relativeTime }}</p>
          </div>
        </div>
        <van-button
          v-if="!user || articleList.aut_id !== user.id"
          class="follow-btn"
          :type="articleList.is_followed ? 'default' : 'info'"
          size="small"
          round
          :loading="isFollowLoading"
          @click="onFollowed"
        >{{ articleList.is_followed ? '已关注' : '+ 关注' }}</van-button>
      </div>
      <!-- 文章内容 -->
      <div class="markdown-body" v-html="articleList.content"></div>
      <div style="text-align:center;margin: 50px 0;color:#969799;font-size:18px">正文结束</div>
      <div style="font-size:18px;margin-bottom:20px">全部评论</div>
      <!-- 文章评论 -->
      <article-comment :article-id="articleId" ref="article-comment" @click-reply="onReplyShow" />
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticle"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
      />
      <van-icon
        color="orange"
        :name="articleList.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="articleList.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->

    <!-- 发布文章评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '20%' }"
    >
    <!--
        在组件上使用 v-model
          :value="postMessage"
          @input="postMessage = 事件参数"
        本质还是父子通信
       -->
    <post-comment @click-post="onPost" v-model="postMessage"></post-comment>
    </van-popup>
    <!-- /发布文章评论 -->
     <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 90%"
    >
       <comment-reply :comment="currentComment" :article-id="articleId" />
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { followUser, unfollowUser } from '@/api/user'
import ArticleComment from './components/article-comment'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
import { addComment } from '@/api/comments'
// vuex 模块提供了一些辅助方法，专门用来让我们更方便的获取容器中的数据
// mapState：映射获取 state 数据
// mapMutation：映射获取 mutation 数据
// maoAction：映射获取 action 数据
import { mapState } from 'vuex'
export default {
  name: 'ArticlePage',
  components: {
    ArticleComment,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      articleList: {},
      loading: false,
      isFollowLoading: false,
      isPostShow: false,
      postMessage: '',
      isReplyShow: false, // 展示评论回复弹层
      currentComment: {} // 点击回复的那个评论项
    }
  },
  computed: {
    // mapState 方法返回一个对象，对象中就是映射过来的容器中的数据成员
    // ... 操作符就是把一个对象展开，混入当前对象中
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      try {
        this.loading = true
        const { data } = await getArticleById(this.articleId)
        this.articleList = data.data
        this.loading = false
        // console.log(this.articleList)
      } catch (err) {
        console.log(err)
      }
    },
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        if (this.articleList.is_collected) {
          await deleteCollect(this.articleId)
          this.articleList.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          // 添加收藏
          await addCollect(this.articleId)
          this.articleList.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onLike () {
      try {
        if (this.articleList.attitude) {
          await deleteLike(this.articleId)
          this.articleList.attitude = 0
          this.$toast.success('取消喜欢')
        } else {
          // 添加收藏
          await addLike(this.articleId)
          this.articleList.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onFollowed () {
      this.isFollowLoading = true
      try {
        if (this.articleList.is_followed) {
          await unfollowUser(this.articleList.aut_id)
          this.articleList.is_followed = false
          this.$toast.success('取消关注')
        } else {
          await followUser(this.articleList.aut_id)
          this.articleList.is_followed = true
          this.$toast.success('关注成功')
        }
      } catch (err) {
        console.log(err)
      }
      this.isFollowLoading = false
    },
    async onPost () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComment({
          target: this.articleId,
          content: this.postMessage
        })
        // 清空文本框
        this.postMessage = ''
        // 关闭弹层
        this.isPostShow = false
        // 将数据添加到列表顶部
        this.$refs['article-comment'].list.unshift(data.data.new_obj)
        this.$toast.success('发布成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('发布失败')
      }
    },
    onReplyShow (comment) {
      // 将点击回复所在的评论对象记录起来
      this.currentComment = comment
      // 展示回复的弹层
      this.isReplyShow = true
    }

  }
}
</script>

<style scoped></style>
<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  padding: 46px 20px 100px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 5px;
        }
        .text {
          .name {
            margin: 0;
            font-size: 12px;
          }
          .time {
            margin: 0;
            font-size: 10px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
