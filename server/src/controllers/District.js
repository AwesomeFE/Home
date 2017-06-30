import {
  City,
  District,
} from '../models'

/**
 * Controller Method: Create district/districts
 *
 * @param {ObjectId} cityId
 * @param {Object|Array} districtInfo
 * @returns {Object} district
 */
async function createDistrictInCity(cityId, districtInfo = {}) {
  const district = await District.create(districtInfo)
  const city = await City.findById(cityId)

  if(district instanceof Array) {
    for(const districtItem of district) {
      city.districts.push(districtItem._id)
    }
  } else {
    city.districts.push(district._id)
  }

  await city.save()
  return district
}

/**
 * Controller Method: Soft delete a district
 *
 * @param {Object} query
 * @returns {Object} deleted district
 */
async function deleteDistrict(query) {
  return await District.findOneAndUpdate(query, {status: 'isDeleted'}, {new: true})
}

/**
 * Controller Method: Recover a district to unpublished status
 *
 * @param {Object} query
 * @returns {Object} district
 */
async function recoverDistrict(query) {
  query = Object.assign({}, query, {status: {$eq: 'isDeleted'}})
  return await District.findOneAndUpdate(query, {status: 'isUnpublished'}, {new: true})
}

/**
 * Controller Method: Find a district which is not deleted
 *
 * @param {Object} query
 * @returns {Object} district
 */
async function findDistrict(query) {
  query = Object.assign({}, query, {status: {$ne: 'isDeleted'}})
  return await District.find(query)
}

exports.findDistrict = findDistrict
exports.deleteDistrict = deleteDistrict
exports.recoverDistrict = recoverDistrict
exports.createDistrictInCity = createDistrictInCity
