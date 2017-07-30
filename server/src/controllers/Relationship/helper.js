import {Types} from 'mongoose'
import {Relationship} from '../../models'

export function getRelationshipBetweenQuery(doc1, doc2, type) {
  return {
    records: {
      $elemMatch: {
        $or: [
          {
            'from.collection': doc1.collection.name,
            'from.id': Types.ObjectId(doc1._id),
            'to.collection': doc2.collection.name,
            'to.id': Types.ObjectId(doc2._id)
          },
          {
            'from.collection': doc2.collection.name,
            'from.id': Types.ObjectId(doc2._id),
            'to.collection': doc1.collection.name,
            'to.id': Types.ObjectId(doc1._id)
          }
        ]
      }
    },
    type
  }
}

export function getRelationshipTwoWayQuery(doc, thatCollection, type) {
  return {
    records: {
      $all: [
        {
          $elemMatch: {
            'from.collection': doc.collection.name,
            'from.id': Types.ObjectId(doc._id),
            'to.collection': thatCollection,
          }
        },
        {
          $elemMatch: {
            'from.collection': doc.collection.name,
            'to.collection': thatCollection,
            'to.id': Types.ObjectId(doc._id),
          }
        }
      ]
    },
    type
  }
}

export async function createNewRelationship(doc1, doc2, type) {
  return await Relationship.create({
    records: [
      {
        from: {
          collection: doc1.collection.name,
          id: doc1._id
        },
        to: {
          collection: doc2.collection.name,
          id: doc2._id
        }
      }
    ],
    type
  })
}

export function isRecordInRelationship(newRecord, relationship) {
  return relationship.records.some(record => record.from.id.toString() === newRecord.from.id.toString())
}

export function getRelationshipNewRecord(doc1, doc2) {
  return {
    from: {
      collection: doc1.collection.name,
      id: doc1._id
    },
    to: {
      collection: doc2.collection.name,
      id: doc2._id
    }
  }
}