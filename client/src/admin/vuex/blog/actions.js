import * as BlogService from '../../services/BlogService'

export default {
  // 博客点赞
  async toggleLike({ commit, state }, blogId) {
    return await BlogService.toggleLike(blogId)
  },

  async getMore({ commit, state }, pagination) {
    return await BlogService.searchBlog(pagination)
  },

  async getDetail({ commit, state }, blogId) {
    return await BlogService.toggleLike(blogId)
  }
}