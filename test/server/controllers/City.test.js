import cd from '../../datas/cities'
import pd from '../../datas/province'
import * as ProvinceController from '../../../server/src/controllers/Province'
import * as CityController from '../../../server/src/controllers/City'

describe('City Controller 基本api测试', () => {
  let Beijing = null
  let Shanghai = null
  let ZheJiang = null
  let AnHui = null

  const cLength = Object.keys(cd).length

  before(async () => {
    Beijing = (await ProvinceController.findProvince(pd.Beijing))[0]
    Shanghai = (await ProvinceController.findProvince(pd.Shanghai))[0]
    ZheJiang = (await ProvinceController.findProvince(pd.ZheJiang))[0]
    AnHui = (await ProvinceController.findProvince(pd.AnHui))[0]
  })

  it(`创建"${cd.Beijing.name}"`, async () => {
    await CityController.createCityInProvince(Beijing._id, cd.Beijing)
  })

  it(`创建"${cd.Shanghai.name}"`, async () => {
    await CityController.createCityInProvince(Shanghai._id, cd.Shanghai)
  })

  it(`创建"${cd.Hangzhou.name}"`, async () => {
    await CityController.createCityInProvince(ZheJiang._id, cd.Hangzhou)
  })

  it(`创建"${cd.ShaoXin.name}"`, async () => {
    await CityController.createCityInProvince(ZheJiang._id, cd.ShaoXin)
  })

  it(`创建"${cd.ZhuJi.name}"`, async () => {
    await CityController.createCityInProvince(ZheJiang._id, cd.ZhuJi)
  })

  it(`创建"${cd.FuYang.name}"`, async () => {
    await CityController.createCityInProvince(AnHui._id, cd.FuYang)
  })

  it(`删除"${cd.ZhuJi.name}"`, async () => {
    const deleteCity = await CityController.deleteCity(cd.ZhuJi)

    if(deleteCity.status !== 'isDeleted') {
      throw '失败!'
    }
  })

  it(`应该有${cLength - 1}个城市`, async () => {
    const cities = await CityController.findCity()

    if(cities.length !== cLength - 1) {
      throw '失败!'
    }
  })

  it(`恢复删除的"${cd.ZhuJi.name}"`, async () => {
    const recoverCity = await CityController.recoverCity(cd.ZhuJi)

    if(!recoverCity) {
      throw '失败!'
    }
  })

  it(`应该有${cLength}个城市`, async () => {
    const cities = await CityController.findCity()

    if(cities.length !== cLength) {
      throw '失败!'
    }
  })
})