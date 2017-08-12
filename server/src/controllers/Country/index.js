import {
  Country
} from '../../models'

/**
 * Controller Method: Create country/countries
 *
 * @param {Object|Array} countryInfo
 * @returns {Object|Array} country
 */
export async function createCountry(countryInfo = {}) {
  return await Country.create(countryInfo)
}

/**
 * Controller Method: Soft delete a country
 *
 * @param {Object} query
 * @returns {Object} deleted country
 */
export async function deleteCountry(query) {
  return await Country.findOneAndUpdate(query, {status: 'isDeleted'}, {new: true})
}

/**
 * Controller Method: Recover a country to unpublished status
 * @param {Object} query
 * @returns {Object} country
 */
export async function recoverCountry(query) {
  query = Object.assign({}, query, {status: {$eq: 'isDeleted'}})
  return await Country.findOneAndUpdate(query, {status: 'isUnpublished'}, {new: true})
}

/**
 * Controller Method: Find a country which is not deleted
 *
 * @param query
 * @returns {Object} country
 */
export async function findCountry(query) {
  query = Object.assign({}, query, {status: {$ne: 'isDeleted'}})
  return await Country.find(query).populate({
    path: 'provinces',
    match: {status: {$ne: 'isDeleted'}}
  })
}
