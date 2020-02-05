import request from '@/utils/request'

//  用户登录
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取验证码
export const code = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

//  获取登录用户的信息
export const getUser = () => {
  return request({
    url: '/app/v1_0/user'
  })
}

// 获取指定用户的信息
export const getUserInfoById = (id) => {
  return request({
    url: `/app/v1_0/users/${id}`
  })
}
// 关注用户
export const followUser = target => {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
export const unfollowUser = target => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${target}`
  })
}
// 获取用户资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 更新用户头像
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}