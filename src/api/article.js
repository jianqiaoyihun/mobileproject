import request from '@/utils/request'

// 获取指定用户的文章列表
export const getArticlesByUser = (userId, params) => {
  return request({
    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}
