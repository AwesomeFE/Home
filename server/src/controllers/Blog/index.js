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
  const limit = pagination.length
  const skip = pagination.page * pagination.length
  let relationship = await UserController.getRelationshipBetween(sessionUserId, userId)

  switch (relationship) {
    case 'same':
      query.visible = { $in: ['all', 'friend', 'none'] }
      break

    case 'friend':
      query.visible = { $in: ['all', 'friend'] }
      break

    default:
      query.visible = { $in: ['all'] }
      break
  }

  if(userId) {
    query.userId = userId
  }

  return await Blog.find(query, null, { skip, limit })
}