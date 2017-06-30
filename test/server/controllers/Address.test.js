const {Address} = require('../../../server/src/models')
const AddressController = require('../../../server/src/controllers/Address')
const CountryController = require('../../../server/src/controllers/Country')
const ProvinceController = require('../../../server/src/controllers/Province')
const CityController = require('../../../server/src/controllers/City')
const DistrictController = require('../../../server/src/controllers/District')

describe('Address Controller 基本api测试', () => {
  let china
  let shanghaiP, zhejiangP
  let shanghaiC, hangzhouC
  let pudong, xiasha

  before(async () => {
    await Address.findOneAndRemove({detail: '测试_上海市浦东新区齐河路20弄'})
    await Address.findOneAndRemove({detail: '测试_上海市浦东新区耀华路19弄'})
    await Address.findOneAndRemove({detail: '测试_杭州市下沙高教文泽路20弄'})
    await Address.findOneAndRemove({detail: '测试_杭州市下沙高教文泽路19弄'})

    china = (await CountryController.findCountry({desc: '测试_zh'}))[0]
    shanghaiP = (await ProvinceController.findProvince({name: '测试_上海'}))[0]
    zhejiangP = (await ProvinceController.findProvince({name: '测试_浙江'}))[0]
    shanghaiC = (await CityController.findCity({name: '测试_上海'}))[0]
    hangzhouC = (await CityController.findCity({name: '测试_杭州'}))[0]
    pudong = (await DistrictController.findDistrict({name: '测试_浦东'}))[0]
    xiasha = (await DistrictController.findDistrict({name: '测试_下沙'}))[0]
  })

  it('创建一个"测试_上海市浦东新区齐河路20弄"', async () => {
    await AddressController.createAddress({
      country: china._id,
      province: shanghaiP._id,
      city: shanghaiC._id,
      district: pudong._id,
      detail: '测试_上海市浦东新区齐河路20弄',
      geoLocation: {
        coordinates: [121.511478, 31.18632]
      }
    })
  })

  it('创建一个"测试_上海市浦东新区耀华路19弄"', async () => {
    await AddressController.createAddress({
      country: china._id,
      province: shanghaiP._id,
      city: shanghaiC._id,
      district: pudong._id,
      detail: '测试_上海市浦东新区耀华路19弄',
      geoLocation: {
        coordinates: [121.488661, 31.173253]
      }
    })
  })

  it('创建一个"测试_杭州市下沙高教文泽路20弄"', async () => {
    await AddressController.createAddress({
      country: china._id,
      province: zhejiangP._id,
      city: hangzhouC._id,
      district: xiasha._id,
      detail: '测试_杭州市下沙高教文泽路20弄',
      geoLocation: {
        coordinates: [120.357546, 30.319716]
      }
    })
  })

  it('创建一个"测试_杭州市下沙高教文泽路19弄"', async () => {
    await AddressController.createAddress({
      country: china._id,
      province: zhejiangP._id,
      city: hangzhouC._id,
      district: xiasha._id,
      detail: '测试_杭州市下沙高教文泽路19弄',
      geoLocation: {
        coordinates: [120.357546, 30.319716]
      }
    })
  })

  it('删除"测试_杭州市下沙高教文泽路19弄"', async () => {
    const deleteAddress = await AddressController.deleteAddress({
      detail: '测试_杭州市下沙高教文泽路19弄'
    })

    if (deleteAddress.status !== 'isDeleted') {
      throw '失败!'
    }
  })

  it('查找距离"测试_上海市浦东新区齐河路20弄"5000米以内的地址', async () => {
    const address20 = (await AddressController.findAddress({
      detail: '测试_上海市浦东新区齐河路20弄'
    }))[0]

    const nearAddresses = await AddressController.findAddressNear(address20, 5000)

    if (nearAddresses.length !== 1) {
      throw '失败!'
    }
  })

  it('查找距离"测试_上海市浦东新区齐河路20弄"1000000米以内的地址', async () => {
    const address20 = (await AddressController.findAddress({
      detail: '测试_上海市浦东新区齐河路20弄'
    }))[0]

    const nearAddresses = await AddressController.findAddressNear(address20, 1000000)

    if (nearAddresses.length !== 2) {
      throw '失败!'
    }
  })

})