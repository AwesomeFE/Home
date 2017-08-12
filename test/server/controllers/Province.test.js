import pd from '../../datas/province'
import cd from '../../datas/country'
import * as CountryController from '../../../server/src/controllers/Country'
import * as ProvinceController from '../../../server/src/controllers/Province'

describe('Province Controller 基本api测试', async () => {
  let China = null
  let Britain = null
  let France = null

  const pLength = Object.keys(pd).length

  before(async () => {
    China = (await CountryController.findCountry(cd.China))[0]
    Britain = (await CountryController.findCountry(cd.Britain))[0]
    France = (await CountryController.findCountry(cd.France))[0]
  })

  it(`创建"${pd.Beijing.name}"`, async () => {
    await ProvinceController.createProvinceInCountry(China._id, pd.Beijing)
  })

  it(`创建"${pd.Shanghai.name}"`, async () => {
    await ProvinceController.createProvinceInCountry(China._id, pd.Shanghai)
  })

  it(`创建"${pd.ZheJiang.name}"`, async () => {
    await ProvinceController.createProvinceInCountry(China._id, pd.ZheJiang)
  })

  it(`创建"${pd.AnHui.name}"`, async () => {
    await ProvinceController.createProvinceInCountry(China._id, pd.AnHui)
  })

  it(`创建"${pd.Paris.name}"`, async () => {
    await ProvinceController.createProvinceInCountry(France._id, pd.Paris)
  })

  it(`创建"${pd.London.name}"`, async () => {
    await ProvinceController.createProvinceInCountry(Britain._id, pd.London)
  })

  it(`删除"${pd.AnHui.name}"`, async () => {
    const deletedProvince = await ProvinceController.deleteProvince(pd.AnHui)

    if(deletedProvince.status !== 'isDeleted') {
      throw '失败!'
    }
  })

  it(`应该有${pLength - 1}个省份`, async () => {
    const provinces = await ProvinceController.findProvince()

    if(provinces.length !== pLength - 1) {
      throw '失败!'
    }
  })

  it(`恢复删除的"${pd.AnHui.name}"`, async () => {
    const recoverProvince = await ProvinceController.recoverProvince(pd.AnHui)

    if(!recoverProvince) {
      throw '失败!'
    }
  })

  it(`应该有${pLength}个省份`, async () => {
    const provinces = await ProvinceController.findProvince()

    if(provinces.length !== pLength) {
      throw '失败!'
    }
  })
})