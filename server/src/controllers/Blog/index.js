import {
  Blog,
  Comment
} from '../../models'
import * as UserController from '../User'
import * as FileController from '../File'

export async function createBlog(user = {}, blogData = {}, files = []) {
  blogData.userId = user._id
  blogData.attachments = await FileController.saveFile(files)

  return await Blog.create(blogData)
}

export async function searchBlog(userId, query = {}, sessionUserId, pagination) {
  // 组装分页信息
  const limit = pagination.length
  const skip = pagination.page * pagination.length
  let relationship = ''

  if (userId) {
    query.userId = userId
    relationship = await UserController.getRelationshipStatusBetween(sessionUserId, userId)
  } else {
    query.userId = {
      $in: [...await UserController.getUserFriendsId(sessionUserId), sessionUserId]
    }

    relationship = 'friend'
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

  console.log(query)

  return await Blog.find(query, null, {skip, limit})
}