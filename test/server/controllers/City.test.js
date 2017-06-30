import citiesData from '../../datas/cities'
import * as ProvinceController from '../../../server/src/controllers/Province'
import * as CityController from '../../../server/src/controllers/City'

describe('City Controller 基本api测试', () => {
  let provinces = {}

  before(async () => {
    const provincesName = Object.keys(citiesData)
    for(const provinceName of provincesName) {
      provinces[provinceName] = (await ProvinceController.findProvince({name: provinceName}))[0]
    }
  })

  const citiesMap = Object.entries(citiesData)
  let cityLength = 0
  let willDeleteCity = {}

  for (const [provinceName, cities] of citiesMap) {
    for (const cityData of cities) {
      it(`创建一个"${cityData.name}"`, async () => {
        await CityController.createCityInProvince(provinces[provinceName]._id, cityData)
      })
      cityLength++
      willDeleteCity = cityData
    }
  }

  it(`删除一个"${willDeleteCity.name}"`, async () => {
    const deleteCity = await CityController.deleteCity(willDeleteCity)

    if(deleteCity.status !== 'isDeleted') {
      throw '失败!'
    }
  })

  it(`查找所有城市,结果:有${cityLength - 1}个省份`, async () => {
    const cities = await CityController.findCity({})

    if(cities.length !== cityLength - 1) {
      throw '失败!'
    }
  })

  it(`恢复删除的"${willDeleteCity.name}"`, async () => {
    const recoverCity = await CityController.recoverCity(willDeleteCity)

    if(!recoverCity) {
      throw '失败!'
    }
  })

  it(`查找所有城市,结果:有${cityLength}个省份`, async () => {
    const cities = await CityController.findCity({})

    if(cities.length !== cityLength) {
      throw '失败!'
    }
  })
})