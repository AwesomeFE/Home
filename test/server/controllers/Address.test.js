import cd from '../../datas/country'
import pd from '../../datas/province'
import ccd from '../../datas/cities'
import dd from '../../datas/district'
import ad from '../../datas/address'
import * as AddressController from '../../../server/src/controllers/Address'
import * as CountryController from '../../../server/src/controllers/Country'
import * as ProvinceController from '../../../server/src/controllers/Province'
import * as CityController from '../../../server/src/controllers/City'
import * as DistrictController from '../../../server/src/controllers/District'

describe('Address Controller 基本api测试', () => {
  let China = null

  let ShanghaiP = null
  let ShanghaiC = null
  let PuDong = null

  let ZheJiang = null
  let Hangzhou = null
  let XiaSha = null

  before(async () => {

    China = (await CountryController.findCountry(cd.China))[0]

    ShanghaiP = (await ProvinceController.findProvince(pd.Shanghai))[0]
    ShanghaiC = (await CityController.findCity(ccd.Shanghai))[0]
    PuDong = (await DistrictController.findDistrict(dd.PuDong))[0]

    ZheJiang = (await ProvinceController.findProvince(pd.ZheJiang))[0]
    Hangzhou = (await CityController.findCity(ccd.Hangzhou))[0]
    XiaSha = (await DistrictController.findDistrict(dd.XiaSha))[0]
  })

  it(`创建"${ad.Shanghai_Pudong_1.detail}"`, async () => {
    await AddressController.createAddress({
      country: China._id,
      province: ShanghaiP._id,
      city: ShanghaiC._id,
      district: PuDong._id,
      ...ad.Shanghai_Pudong_1
    })
  })

  it(`创建"${ad.Shanghai_Pudong_2.detail}"`, async () => {
    await AddressController.createAddress({
      country: China._id,
      province: ShanghaiP._id,
      city: ShanghaiC._id,
      district: PuDong._id,
      ...ad.Shanghai_Pudong_2
    })
  })

  it(`创建"${ad.Shanghai_Pudong_3.detail}"`, async () => {
    await AddressController.createAddress({
      country: China._id,
      province: ShanghaiP._id,
      city: ShanghaiC._id,
      district: PuDong._id,
      ...ad.Shanghai_Pudong_3
    })
  })

  it(`创建"${ad.Hangzhou_Xiasha_1.detail}"`, async () => {
    await AddressController.createAddress({
      country: China._id,
      province: ZheJiang._id,
      city: Hangzhou._id,
      district: XiaSha._id,
      ...ad.Hangzhou_Xiasha_1
    })
  })

  it(`创建"${ad.Hangzhou_Xiasha_2.detail}"`, async () => {
    await AddressController.createAddress({
      country: China._id,
      province: ZheJiang._id,
      city: Hangzhou._id,
      district: XiaSha._id,
      ...ad.Hangzhou_Xiasha_2
    })
  })

  it(`删除"${ad.Hangzhou_Xiasha_1.detail}"`, async () => {

    delete ad.Hangzhou_Xiasha_1.geoLocation
    const deleteAddress = await AddressController.deleteAddress(ad.Hangzhou_Xiasha_1)

    if (deleteAddress.status !== 'isDeleted') {
      throw '失败!'
    }
  })

  it(`查找距离"${ad.Shanghai_Pudong_2.detail}"250米以内的地址为2个`, async () => {

    delete ad.Shanghai_Pudong_2.geoLocation
    const sourceAddress = (await AddressController.findAddress(ad.Shanghai_Pudong_2))[0]

    const nearAddresses = await AddressController.findAddressNear(sourceAddress, 250)

    if (nearAddresses.length !== 2) {
      throw '失败!'
    }
  })

  it(`查找距离"${ad.Shanghai_Pudong_1.detail}"250米以内的地址为1个`, async () => {

    delete ad.Shanghai_Pudong_1.geoLocation
    const sourceAddress = (await AddressController.findAddress(ad.Shanghai_Pudong_1))[0]

    const nearAddresses = await AddressController.findAddressNear(sourceAddress, 250)

    if (nearAddresses.length !== 1) {
      throw '失败!'
    }
  })

  it(`查找距离"[121.508379, 31.185377]"250米以内的地址为3个`, async () => {
    const nearAddresses = await AddressController.findAddressNear([121.508379, 31.185377], 250)

    if (nearAddresses.length !== 3) {
      throw '失败!'
    }
  })

  it(`查找距离"${ad.Shanghai_Pudong_1.detail}"1000000米以内的地址为3个`, async () => {

    delete ad.Shanghai_Pudong_1.geoLocation
    const sourceAddress = (await AddressController.findAddress(ad.Shanghai_Pudong_1))[0]

    const nearAddresses = await AddressController.findAddressNear(sourceAddress, 1000000)

    if (nearAddresses.length !== 3) {
      throw '失败!'
    }
  })

  it(`恢复删除的"${ad.Hangzhou_Xiasha_1.detail}"`, async () => {

    delete ad.Hangzhou_Xiasha_1.geoLocation
    const deleteAddress = await AddressController.recoverAddress(ad.Hangzhou_Xiasha_1)

    if (deleteAddress.status === 'isDeleted') {
      throw '失败!'
    }
  })

  it(`查找距离"${ad.Shanghai_Pudong_1.detail}"1000000米以内的地址为4个`, async () => {

    delete ad.Shanghai_Pudong_1.geoLocation
    const sourceAddress = (await AddressController.findAddress(ad.Shanghai_Pudong_1))[0]

    const nearAddresses = await AddressController.findAddressNear(sourceAddress, 1000000)

    if (nearAddresses.length !== 4) {
      throw '失败!'
    }
  })

})