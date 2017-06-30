import countriesData from '../../datas/country'
import * as CountryController from '../../../server/src/controllers/Country'

describe('Country Controller 基本api测试', () => {

  // 批量创建国家
  for(const countryData of countriesData) {
    it(`创建一个"${countryData.name}"`, async () => {
      await CountryController.createCountry(countryData)
    })
  }

  it(`删除一个"${countriesData[0].name}"`, async () => {
    const deletedCountry = await CountryController.deleteCountry(countriesData[0])

    if(deletedCountry.status !== 'isDeleted') {
      throw '失败!'
    }
  })

  it(`查找所有国家,结果:有${countriesData.length - 1}个国家`, async () => {
    const countries = await CountryController.findCountry({})

    if(countries.length !== countriesData.length - 1) {
      throw '失败!'
    }
  })

  it(`恢复删除的"${countriesData[0].name}"`, async () => {
    const recoverCountry = await CountryController.recoverCountry({name: countriesData[0].name})

    if(!recoverCountry) {
      throw '失败!'
    }
  })

  it(`查找所有国家,结果:有${countriesData.length}个国家`, async () => {
    const countries = await CountryController.findCountry({})

    if(countries.length !== countriesData.length) {
      throw '失败!'
    }
  })
})