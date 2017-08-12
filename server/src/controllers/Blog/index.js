import {
  Blog,
  Comment
} from '../../models'
import * as UserController from '../User'
import * as FileController from '../File'

export async function createBlog(user = {}, blogData = {}, files = []) {
  const blog = await Blog.create(blogData)
  const attachments = await FileController.saveFile(files)
  blog.user = user
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