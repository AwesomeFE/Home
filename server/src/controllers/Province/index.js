import {
  Country,
  Province
} from '../../models'

/**
 * Controller Method: Create province/provinces
 *
 * @param {ObjectId} countryId
 * @param {Object|Array} provinceInfo
 * @returns {Object} province
 */
export async function createProvinceInCountry(countryId, provinceInfo = {}) {
  const province = await Province.create(provinceInfo)
  const country = await Country.findById(countryId)

  if(province instanceof Array) {
    for(const provinceItem of province) {
      country.provinces.push(provinceItem._id)
    }
  } else {
    country.provinces.push(province._id)
  }

  await country.save()

  return province
}

/**
 * Controller Method: Soft delete a province
 *
 * @param {Object} query
 * @returns {Object} deleted province
 */
export async function deleteProvince(query) {
  return await Province.findOneAndUpdate(query, {status: 'isDeleted'}, {new: true})
}

/**
 * Controller Method: Recover a province to unpublished status
 * @param {Object} query
 * @returns {Object} province
 */
export async function recoverProvince(query) {
  query = Object.assign({}, query, {status: {$eq: 'isDeleted'}})
  return await Province.findOneAndUpdate(query, {status: 'isUnpublished'}, {new: true})
}

/**
 * Controller Method: Find a province which is not deleted
 *
 * @param {Object} query
 * @returns {Object} province
 */
export async function findProvince(query) {
  query = Object.assign({}, query, {status: {$ne: 'isDeleted'}})
  return await Province.find(query).populate({
    path: 'cities',
    match: {status: {$ne: 'isDeleted'}}
  })
}
