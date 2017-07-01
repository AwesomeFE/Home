import {
  Blog,
  Comment
} from '../models'
import * as UserController from './User'

export async function createBlog(user = {}, blogData = {}) {
  blogData.userId = user._id

  const blog = await Blog.create(blogData)

  return await blog.save()
}

export async function searchBlog(userId, query = {}, sessionUserId, pagination) {
  let relationship = await UserController.getRelationshipBetween(userId, sessionUserId)

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

  return await Blog.find(query)
}