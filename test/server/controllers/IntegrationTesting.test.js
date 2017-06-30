const CountryController = require('../../../server/src/controllers/Country')
const ProvinceController = require('../../../server/src/controllers/Province')
const CityController = require('../../../server/src/controllers/City')

describe('集成测试: 国家(含自治区), 省份(含城市), 城市(含行政区) 测试', async () => {
  it('"测试_中国"有"测试_上海", "测试_北京", "测试_浙江", 但是没有"测试_安徽"', async () => {
    const china = (await CountryController.findCountry({desc: '测试_zh'}))[0]

    const isSuccessful =
      china.provinces.some(province => province.name === '测试_上海') &&
      china.provinces.some(province => province.name === '测试_北京') &&
      china.provinces.some(province => province.name === '测试_浙江') &&
      china.provinces.every(province => province.name !== '测试_安徽')

    if(!isSuccessful) {
      throw '失败!'
    }
  })

  it('"测试_上海"有"测试_上海", "测试_北京"有"测试_北京", "测试_浙江"有"测试_杭州", "测试_绍兴", 但是没有"测试_诸暨"', async () => {
    const beijing = (await ProvinceController.findProvince({name: '测试_北京'}))[0]
    const shanghai = (await ProvinceController.findProvince({name: '测试_上海'}))[0]
    const zhejiang = (await ProvinceController.findProvince({name: '测试_浙江'}))[0]

    const isShanghaiSuccessful = shanghai.cities.some(city => city.name === '测试_上海')
    const isBeijingSuccessful = beijing.cities.some(city => city.name === '测试_北京')
    const isZhejiangSuccessful =
      zhejiang.cities.some(city => city.name === '测试_杭州') &&
      zhejiang.cities.some(city => city.name === '测试_绍兴') &&
      zhejiang.cities.every(city => city.name !== '测试_诸暨')

    const isSuccessful = isBeijingSuccessful && isShanghaiSuccessful && isZhejiangSuccessful

    if(!isSuccessful) {
      throw '失败!'
    }
  })

  it('"测试_上海"有"测试_浦东", "测试_黄浦", 但是没有"测试_闸北"', async () => {
    const shanghai = (await CityController.findCity({name: '测试_上海'}))[0]

    const isSuccessful =
      shanghai.districts.some(district => district.name === '测试_浦东') &&
      shanghai.districts.some(district => district.name === '测试_黄浦') &&
      shanghai.districts.every(district => district.name !== '测试_闸北')

    if(!isSuccessful) {
      throw '失败!'
    }
  })
})