import {
  Country,
  Province,
  City,
  District,
} from '../../models'

/**
 * Helper Method: Mapping country in to address country
 *
 * @param address
 * @returns {*|SchemaType|void}
 */
export async function mappingAddressCountry(address) {
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
export async function mappingAddressProvince(address) {
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
export async function mappingAddressCity(address) {
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
export async function mappingAddressDistrict(address) {
  return !address.district._id
    ? await District.findById(address.district).select('name')
    : address.district
}
