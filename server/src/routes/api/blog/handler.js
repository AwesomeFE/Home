import ErrorService from '../../../services/ErrorService'
import * as BlogController from '../../../controllers/Blog'
import ResponseService from '../../../services/ResponseService'

export async function searchBlog(req, res, next) {
  try {
    // 获取分页信息
    const length = +req.query['length'] || 10
    const page = +req.query['page'] || 0
    const pagination = {page, length}
    // 获取用户信息
    const userId = req.query['userId']
    const { sessionUserId } = req.session

    // 获取搜索信息
    let query = {}
    try {
      query = JSON.stringify(req.query['query'])
    } catch (e) {}

    // 返回结果
    res.json({
      ...ResponseService.SEARCH_SUCCESS,
      blogs: await BlogController.searchBlog(userId, query, sessionUserId, pagination)
    })
  } catch (error) {
    next(error)
  }
}

export async function createBlog(req, res, next) {
  try {
    // 拿出blog数据和session user
    const blogData = req.body
    const attachments = req.files
    const { sessionUserId } = req.session

    // 如果session user为空，报错
    if(!sessionUserId) {
      throw ErrorService.NO_SESSION_USER
    }

    // 如果blog内容为空，报错
    if(!blogData.content) {
      throw ErrorService.BLOG_NO_CONTENT
    }

    // 返回blog数据
    res.json({
      ...ResponseService.CREATE_SUCCESS,
      blog: await BlogController.createBlog(sessionUserId, blogData, attachments)
    })
  } catch (error) {
    next(error)
  }
}

export async function toggleLikeBlog(req, res, next) {
  try {
    const blogId = req.params['blogId']
    const { sessionUserId } = req.session

    if(!blogId || blogId === 'undefined') {
      throw ErrorService.NO_BLOG_ID
    }

    if(!sessionUserId) {
      throw ErrorService.NO_SESSION_USER
    }

    res.json({
      ...ResponseService.CREATE_SUCCESS,
      blog: await BlogController.toggleLike(sessionUserId, blogId)
    })
  } catch (error) {
    next(error)
  }
}

export async function createBlogComment(req, res, next) {

}

export async function deleteBlogComment(req, res, next) {

}

export async function getBlogDetail(req, res, next) {

}

export async function updateBlog(req, res, next) {

}

export async function deleteBlog(req, res, next) {

}