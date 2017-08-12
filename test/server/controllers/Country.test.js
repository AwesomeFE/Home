import cd from '../../datas/country'
import * as CountryController from '../../../server/src/controllers/Country'

describe('Country Controller 基本api测试', () => {

  const countryLength = Object.keys(cd).length

  it(`创建"${cd.China.name}"`, async () => {
    await CountryController.createCountry(cd.China)
  })

  it(`创建"${cd.France.name}"`, async () => {
    await CountryController.createCountry(cd.France)
  })

  it(`创建"${cd.Britain.name}"`, async () => {
    await CountryController.createCountry(cd.Britain)
  })

  it(`创建"${cd.Japan.name}"`, async () => {
    await CountryController.createCountry(cd.Japan)
  })

  it(`删除"${cd.France.name}"`, async () => {
    const deletedCountry = await CountryController.deleteCountry(cd.France)

    if(deletedCountry.status !== 'isDeleted') {
      throw '失败!'
    }
  })

  it(`应该有${countryLength - 1}个国家`, async () => {
    const countries = await CountryController.findCountry()

    if(countries.length !== countryLength - 1) {
      throw '失败!'
    }
  })

  it(`恢复删除的"${cd.France.name}"`, async () => {
    const recoverCountry = await CountryController.recoverCountry({name: cd.France.name})

    if(!recoverCountry) {
      throw '失败!'
    }
  })

  it(`应该有${countryLength}个国家`, async () => {
    const countries = await CountryController.findCountry()

    if(countries.length !== countryLength) {
      throw '失败!'
    }
  })
})