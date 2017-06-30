import {
  Address,
  Country,
  Province,
  City,
  District,
  } from '../models'

/**
 * Controller Method: Create address/addresses
 *
 * @param {Object} addressInfo
 * @returns {Object} address
 */
async function createAddress(addressInfo = {}) {
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
async function deleteAddress(query) {
  return await Address.findOneAndUpdate(query, {status: 'isDeleted'}, {new: true})
}

/**
 * Controller Method: Recover an address to isUsing status
 * @param {Object} query
 * @returns {Object} address
 */
async function recoverAddress(query) {
  query = Object.assign({}, query, {status: {$eq: 'isDeleted'}})
  return await Address.findOneAndUpdate(query, {status: 'isUsing'}, {new: true})
}

/**
 * Controller Method: Find addresses which is not deleted
 *
 * @param {Object} query
 * @returns {Object} city
 */
async function findAddress(query) {
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
async function findAddressNear(centerAddress, range, query = {}) {
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

/**
 * Helper Method: Mapping country in to address country
 *
 * @param address
 * @returns {*|SchemaType|void}
 */
async function mappingAddressCountry(address) {
  return !address.country._id
    ? await Country.findById(address.country).select('name')
    : address.country
}

/**
 * Helper Method: Mapping province in to address province
 *
 * @param address
 * @returns {*|SchemaType|void}
 */
async function mappingAddressProvince(address) {
  return !address.province._id
    ? await Province.findById(address.province).select('name')
    : address.province
}

/**
 * Helper Method: Mapping city in to address city
 *
 * @param address
 * @returns {*|SchemaType|void}
 */
async function mappingAddressCity(address) {
  return !address.city._id
    ? await City.findById(address.city).select('name')
    : address.city
}

/**
 * Helper Method: Mapping district in to address district
 *
 * @param address
 * @returns {*|SchemaType|void}
 */
async function mappingAddressDistrict(address) {
  return !address.district._id
    ? await District.findById(address.district).select('name')
    : address.district
}

exports.findAddress = findAddress
exports.createAddress = createAddress
exports.deleteAddress = deleteAddress
exports.recoverAddress = recoverAddress
exports.findAddressNear = findAddressNear
