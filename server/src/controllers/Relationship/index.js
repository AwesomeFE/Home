import {Relationship} from '../../models'
import {
  getRelationshipTwoWayQuery,
  getRelationshipBetweenQuery,
  createNewRelationship,
  isRecordInRelationship,
  getRelationshipNewRecord,
} from './helper'

/**
 * 给两个文档创建关系
 * @param doc1
 * @param doc2
 * @param type
 * @returns {Promise.<*>}
 */
export async function makeRelationship(doc1 = {}, doc2 = {}, type = '') {
  const query = getRelationshipBetweenQuery(doc1, doc2, type)
  const newRecord = getRelationshipNewRecord(doc1, doc2)

  let relationship = await Relationship.findOne(query)

  if (relationship) {
    if (!isRecordInRelationship(newRecord, relationship)) {

      relationship.records.push(newRecord)
      relationship = await relationship.save()
    }
  } else {
    relationship = createNewRelationship(doc1, doc2, type)
  }

  return relationship
}

/**
 * 获取两个文档结果之间的关系
 * @param doc1
 * @param doc2
 * @param type
 * @returns {Promise.<{from, to}>}
 */
export async function getRelationshipBetween(doc1 = {}, doc2 = {}, type) {
  const query = getRelationshipBetweenQuery(doc1, doc2, type)

  return await Relationship.findOne(query)
}

/**
 * 获取某个文档存在关系的所有该类型的文档id
 *
 * @param doc
 * @param thatCollection
 * @param type
 * @returns {Promise.<*|Array>}
 */
export async function getRelationshipTwoWayIds(doc = {}, thatCollection = '', type = '') {
  const [result = {}] = await Relationship.aggregate([
    {
      $match: getRelationshipTwoWayQuery(doc, thatCollection, type)
    },
    {
      $redact: {
        $cond: {
          if: {
            $ne: ['$from.id', doc._id]
          },
          then: '$$DESCEND',
          else: '$$PRUNE'
        }
      }
    },
    {
      $unwind: '$records'
    },
    {
      $group: {
        _id: null,
        ids: {
          $push: "$records.from.id"
        }
      }
    },
    {
      $project: {_id: 0}
    }
  ])

  return result.ids || []
}

export async function getRelationshipPending() {

}

export async function getRelationshipConfirm() {

}