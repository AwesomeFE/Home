import { Blog } from '../../models'
import * as UserController from '../User'
import * as FileController from '../File'
import * as CommentController from '../Comment'

export async function createBlog(userId, blogData = {}, files = []) {
  const blog = await Blog.create(blogData)
  const attachments = await FileController.saveFile(files)
  blog.user = userId
  blog.attachments = attachments

  if(blogData.linkedBlog) {
    blog.linkedBlog = await Blog.findById(linkedBlog)
  }

  return await blog.save()
}

export async function searchBlog(userId, query = {}, sessionUserId, pagination) {
  // 组装分页信息
  const limit = pagination.length
  const skip = pagination.page * pagination.length
  let relationship = ''

  if (userId) {
    query.user = userId
    relationship = await UserController.getRelationshipStatusBetween(sessionUserId, userId)
  } else if (sessionUserId) {
    query.user = {
      $in: [...await UserController.getUserFriendsId(sessionUserId), sessionUserId]
    }

    relationship = 'friend'
  } else {
    relationship = 'none'
  }

  switch (relationship) {
    case 'same':
      query.visible = {$in: ['all', 'friend', 'none']}
      break
    case 'friend':
      query.visible = {$in: ['all', 'friend']}
      break
    default:
      query.visible = 'all'
      break
  }

  return await Blog.find(query, null, {skip, limit})
    .populate('user', '_id nickname avatar')
}

export async function searchBlogById(blogId) {
  return await Blog.findById(blogId).populate('user', '_id nickname avatar')
}

export async function toggleLike(userId, blogId) {
  const blogDoc = await Blog.findById(blogId).populate('user', '_id nickname avatar')
  const likeDoc = blogDoc.like.find(like => like.user.toString() === userId.toString())

  likeDoc
    ? likeDoc.remove()
    : blogDoc.like.push({user: userId})

  return await blogDoc.save()
}

export async function createComment(blogId, comment, file) {
  const blogDoc = await Blog.findById(blogId)
  return await CommentController.createComment(blogDoc, comment, file)
}