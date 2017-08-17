import { Comment } from '../../models'

export async function createComment(targetDoc, comment) {
  comment.targetType = targetDoc.collection.name
  comment.target = targetDoc._id

  const commentDoc = new Comment(comment)
  return await commentDoc.save()
}