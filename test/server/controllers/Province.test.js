import provincesData from '../../datas/province'
import * as CountryController from '../../../server/src/controllers/Country'
import * as ProvinceController from '../../../server/src/controllers/Province'

describe('Province Controller 基本api测试', async () => {
  let china

  before(async () => {
    china = (await CountryController.findCountry({}))[0]
  })

  for(const provinceData of provincesData) {
    it(`创建一个"${provinceData.name}"`, async () => {
      await ProvinceController.createProvinceInCountry(china._id, provinceData)
    })
  }

  it(`删除一个"${provincesData[0].name}"`, async () => {
    const deletedProvince = await ProvinceController.deleteProvince(provincesData)

    if(deletedProvince.status !== 'isDeleted') {
      throw '失败!'
    }
  })

  it(`查找所有省份,结果:有${provincesData.length - 1}个省份`, async () => {
    const provinces = await ProvinceController.findProvince({})

    if(provinces.length !== provincesData.length - 1) {
      throw '失败!'
    }
  })

  it(`恢复删除的"${provincesData[0].name}"`, async () => {
    const recoverProvince = await ProvinceController.recoverProvince(provincesData[0])

    if(!recoverProvince) {
      throw '失败!'
    }
  })

  it(`查找所有省份,结果:有${provincesData.length}个省份`, async () => {
    const provinces = await ProvinceController.findProvince({})

    if(provinces.length !== provincesData.length) {
      throw '失败!'
    }
  })

})