import cd from '../../datas/cities'
import dd from '../../datas/district'
import * as DistrictController from '../../../server/src/controllers/District'
import * as CityController from '../../../server/src/controllers/City'

describe('District Controller 基本api测试', () => {
  let Shanghai = null
  let Hangzhou = null

  let dLength = Object.keys(dd).length

  before(async () => {
    Shanghai = (await CityController.findCity(cd.Shanghai))[0]
    Hangzhou = (await CityController.findCity(cd.Hangzhou))[0]
  })

  it(`创建"${dd.PuDong.name}"`, async () => {
    await DistrictController.createDistrictInCity(Shanghai._id, dd.PuDong)
  })

  it(`创建"${dd.HuangPu.name}"`, async () => {
    await DistrictController.createDistrictInCity(Shanghai._id, dd.HuangPu)
  })

  it(`创建"${dd.MingHang.name}"`, async () => {
    await DistrictController.createDistrictInCity(Shanghai._id, dd.MingHang)
  })

  it(`创建"${dd.YangPu.name}"`, async () => {
    await DistrictController.createDistrictInCity(Shanghai._id, dd.YangPu)
  })

  it(`创建"${dd.XiaSha.name}"`, async () => {
    await DistrictController.createDistrictInCity(Hangzhou._id, dd.XiaSha)
  })

  it(`删除"${dd.MingHang.name}"`, async () => {
    const deleteCity = await DistrictController.deleteDistrict(dd.MingHang)

    if(deleteCity.status  !== 'isDeleted') {
      throw '失败!'
    }
  })

  it(`应该有${dLength - 1}个城市`, async () => {
    const district = await DistrictController.findDistrict()

    if(district.length !== dLength - 1) {
      throw '失败!'
    }
  })

  it(`恢复删除的"${dd.MingHang.name}"`, async () => {
    const recoverCity = await DistrictController.recoverDistrict(dd.MingHang)

    if(!recoverCity) {
      throw '失败!'
    }
  })

  it(`应该有${dLength}个城市`, async () => {
    const district = await DistrictController.findDistrict()

    if(district.length !== dLength) {
      throw '失败!'
    }
  })

})