import ErrorService from '../../../services/ErrorService'
import * as BlogController from '../../../controllers/Blog'
import ResponseService from '../../../services/ResponseService'

export async function searchBlog(req, res, next) {
  try {
    // 获取分页信息
    const length = req.query['length'] || 10
    const start = req.query['start'] || 0
    const pagination = {start, length}
    // 获取用户信息
    const userId = req.query['userId'] || ''
    const sessionUser = req.session.user || {}

    // 获取搜索信息
    let query = {}
    try {
      query = JSON.stringify(req.query['query'])
    }

    // 搜索结果
    const blogs = await BlogController.searchBlog(userId, query, sessionUser._id, pagination)

    // 返回结果
    res.json({
      ...ResponseService.SEARCH_SUCCESS,
      blogs
    })
  } catch (error) {
    next(error)
  }
}

export async function createBlog(req, res, next) {
  try {
    // 拿出blog数据和session user
    const blogData = req.body
    const userId = req.session.user

    // 如果session user为空，报错
    if(!userId) {
      throw ErrorService.NO_SESSION_USER
    }

    // 如果blog内容为空，报错
    if(!blogData.content) {
      throw ErrorService.BLOG_NO_CONTENT
    }

    // 创建blog
    const blog = await BlogController.createBlog(userId, blogData)

    // 返回blog数据
    res.json({
      ...ResponseService.CREATE_SUCCESS,
      blog
    })
  } catch (error) {
    next(error)
  }
}

export async function getBlogDetail(req, res, next) {

}

export async function updateBlog(req, res, next) {

}

export async function deleteBlog(req, res, next) {

}