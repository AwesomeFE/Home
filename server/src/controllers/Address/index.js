import {Address} from '../../models'
import {
  mappingAddressCountry,
  mappingAddressProvince,
  mappingAddressCity,
  mappingAddressDistrict
} from './helper'

/**
 * Controller Method: Create address/addresses
 *
 * @param {Object} addressInfo
 * @returns {Object} address
 */
export async function createAddress(addressInfo = {}) {
  if(addressInfo instanceof Array) {
    const addresses = []

    for(const address of addressInfo) {
      address.country = await mappingAddressCountry(address)
      address.province = await mappingAddressProvince(address)
      address.city = await mappingAddressCity(address)
      address.district = await mappingAddressDistrict(address)

      addresses.push(await Address.create(address))
    }
    return addresses
  } else {
    addressInfo.country = await mappingAddressCountry(addressInfo)
    addressInfo.province = await mappingAddressProvince(addressInfo)
    addressInfo.city = await mappingAddressCity(addressInfo)
    addressInfo.district = await mappingAddressDistrict(addressInfo)

    return await Address.create(addressInfo)
  }
}

/**
 * Controller Method: Soft delete an address
 *
 * @param {Object} query
 * @returns {Object} deleted address
 */
export async function deleteAddress(query) {
  return await Address.findOneAndUpdate(query, {status: 'isDeleted'}, {new: true})
}

/**
 * Controller Method: Recover an address to isUsing status
 * @param {Object} query
 * @returns {Object} address
 */
export async function recoverAddress(query) {
  query = Object.assign({}, query, {status: {$eq: 'isDeleted'}})
  return await Address.findOneAndUpdate(query, {status: 'isUsing'}, {new: true})
}

/**
 * Controller Method: Find addresses which is not deleted
 *
 * @param {Object} query
 * @returns {Object} city
 */
export async function findAddress(query) {
  query = Object.assign({}, query, {status: {$ne: 'isDeleted'}})
  return await Address.find(query)
    .populate('country', 'name')
    .populate('province', 'name')
    .populate('city', 'name')
    .populate('district', 'name')
}

/**
 * Controller Method: Find addresses which is near center address and not deleted
 *
 * @param {Object} centerAddress
 * @param {Number} range
 * @param {Object} query
 * @returns {Object} city
 */
export async function findAddressNear(centerAddress, range, query = {}) {
  query = Object.assign({}, query, {
    _id: {
      $ne: centerAddress._id
    },
    geoLocation: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: centerAddress.geoLocation.coordinates
        },
        $maxDistance: range
      }
    }
  })

  return await findAddress(query)
}