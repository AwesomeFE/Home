const assert = require('assert')
const {District} = require('../../../server/src/models')
const DistrictController = require('../../../server/src/controllers/District')
const CityController = require('../../../server/src/controllers/City')

describe('District Controller 基本api测试', () => {
  let shanghai, hangzhou

  before(async () => {
    await District.findOneAndRemove({name: '测试_浦东'})
    await District.findOneAndRemove({name: '测试_黄浦'})
    await District.findOneAndRemove({name: '测试_闸北'})
    await District.findOneAndRemove({name: '测试_下沙'})

    shanghai = (await CityController.findCity({name: '测试_上海'}))[0]
    hangzhou = (await CityController.findCity({name: '测试_杭州'}))[0]
  })

  it('创建一个"测试_浦东"', async () => {
    await DistrictController.createDistrictInCity(shanghai._id, {
      name: '测试_浦东'
    })
  })

  it('创建一个"测试_黄浦"', async () => {
    await DistrictController.createDistrictInCity(shanghai._id, {
      name: '测试_黄浦'
    })
  })

  it('创建一个"测试_闸北"', async () => {
    await DistrictController.createDistrictInCity(shanghai._id, {
      name: '测试_闸北'
    })
  })

  it('创建一个"测试_下沙"', async () => {
    await DistrictController.createDistrictInCity(hangzhou._id, {
      name: '测试_下沙'
    })
  })

  it('删除"测试_闸北"', async () => {
    const deleteCity = await DistrictController.deleteDistrict({
      name: '测试_闸北'
    })

    if(deleteCity.status  !== 'isDeleted') {
      throw '失败!'
    }
  })

})