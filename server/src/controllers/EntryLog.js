import {
  EntryLog
} from '../models'

/**
 * Controller Method: Create an entry log
 *
 * @param {Object} entryLogData
 * @returns {Object} entryLog
 */
async function createEntryLog(entryLogData = {}) {
  return await new EntryLog(entryLogData).save()
}

/**
 * Controller Method: Soft delete an entry log
 *
 * @param {Object} query
 * @returns {Object} deleted entry log
 */
async function deleteEntryLog(query) {
  return await EntryLog.findOneAndUpdate(query, {status: 'isDeleted'}, {new: true})
}

/**
 * Controller Method: Recover an entry log to isActive status
 * @param {Object} query
 * @returns {Object} entry log
 */
async function recoverEntryLog(query) {
  query = Object.assign({}, query, {status: {$eq: 'isDeleted'}})
  return await EntryLog.findOneAndUpdate(query, {status: 'isActive'}, {new: true})
}

/**
 * Controller Method: Find EntryLogs which is not deleted
 *
 * @param {Object} query
 * @returns {Object} EntryLogs
 */
async function findEntryLog(query) {
  query = Object.assign({}, query, {status: {$ne: 'isDeleted'}})
  return await EntryLog.find(query)
}

exports.findEntryLog = findEntryLog
exports.createEntryLog = createEntryLog
exports.deleteEntryLog = deleteEntryLog
exports.recoverEntryLog = recoverEntryLog
