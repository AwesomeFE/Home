import {Types} from 'mongoose'
import {Relationship} from '../../models'

export async function makeRelationship(doc1 = {}, doc2 = {}, type = '') {
  const query = {
    'from.collection': doc1.collection.name,
    'from.id': Types.ObjectId(doc1._id),
    'to.collection': doc2.collection.name,
    'to.id': Types.ObjectId(doc2._id)
  }

  const relationship = {
    from: {
      collection: doc1.collection.name,
      id: doc1._id
    }, to: {
      collection: doc2.collection.name,
      id: doc2._id
    },
    type
  }

  const options = {
    new: true,
    upsert: true
  }

  return await Relationship.findOneAndUpdate(query, relationship, options)
}

export async function getRelationship(doc1 = {}, doc2 = {}, type) {
  // 从doc1向doc2的关系查询
  const fromQuery = {
    'from.collection': doc1.collection.name,
    'from.id': Types.ObjectId(doc1._id),
    'to.collection': doc2.collection.name,
    'to.id': Types.ObjectId(doc2._id),
    'type': type
  }
  // 从doc2向doc1的关系查询
  const toQuery = {
    'from.collection': doc2.collection.name,
    'from.id': Types.ObjectId(doc2._id),
    'to.collection': doc1.collection.name,
    'to.id': Types.ObjectId(doc1._id),
    'type': type
  }

  const fromRelationship = (await Relationship.findOne(fromQuery)) || {}
  const toRelationship = (await Relationship.findOne(toQuery)) || {}

  return {
    from: fromRelationship.type,
    to: toRelationship.type
  }
}