import {
  Province,
  City,
} from '../../models'

/**
 * Controller Method: Create city/cities
 *
 * @param {ObjectId} provinceId
 * @param {Object|Array} cityInfo
 * @returns {Object} city
 */
export async function createCityInProvince(provinceId, cityInfo = {}) {
  const city = await City.create(cityInfo)
  const province = await Province.findById(provinceId)

  if(city instanceof Array) {
    for(const cityItem of city) {
      province.cities.push(cityItem._id)
    }
  } else {
    province.cities.push(city._id)
  }

  await province.save()
  return city
}

/**
 * Controller Method: Soft delete a city
 *
 * @param {Object} query
 * @returns {Object} deleted city
 */
export async function deleteCity(query) {
  return await City.findOneAndUpdate(query, {status: 'isDeleted'}, {new: true})
}

/**
 * Controller Method: Recover a city to unpublished status
 * @param {Object} query
 * @returns {Object} city
 */
export async function recoverCity(query) {
  query = Object.assign({}, query, {status: {$eq: 'isDeleted'}})
  return await City.findOneAndUpdate(query, {status: 'isUnpublished'}, {new: true})
}

/**
 * Controller Method: Find a city which is not deleted
 *
 * @param query
 * @returns {Object} city
 */
export async function findCity(query) {
  query = Object.assign({}, query, {status: {$ne: 'isDeleted'}})
  return await City.find(query).populate({
    path: 'districts',
    match: {status: {$ne: 'isDeleted'}}
  })
}
