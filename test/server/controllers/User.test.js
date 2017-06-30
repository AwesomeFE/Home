const {User, Address, EntryLog} = require('../../../server/src/models')
const UserController = require('../../../server/src/controllers/User')

const CountryController = require('../../../server/src/controllers/Country')
const ProvinceController = require('../../../server/src/controllers/Province')
const CityController = require('../../../server/src/controllers/City')
const DistrictController = require('../../../server/src/controllers/District')

describe('User Controller 基本api测试', () => {
  let china
  let shanghaiP, zhejiangP
  let shanghaiC, hangzhouC
  let pudong, xiasha

  before(async () => {
    await User.findOneAndRemove({username: '测试用户_username注册'})
    await User.findOneAndRemove({username: '测试用户_mobile注册'})
    await User.findOneAndRemove({username: '测试用户_email注册'})
    await User.findOneAndRemove({username: '测试用户_被删除用户'})
    await Address.findOneAndRemove({detail: '测试用户地址_上海市浦东新区齐河路1弄'})
    await Address.findOneAndRemove({detail: '测试用户地址_上海市静安区胶州路1弄'})
    await Address.findOneAndRemove({detail: '测试用户地址_上海市浦东新区昌里路166弄'})
    await Address.findOneAndRemove({detail: '测试用户地址_上海市浦东新区昌里路167弄'})
    await Address.findOneAndRemove({detail: '测试用户地址_上海市浦东新区昌里东路500弄'})
    await EntryLog.remove({ip: '测试登陆日志_127.0.0.1'})

    china = (await CountryController.findCountry({desc: '测试_zh'}))[0]
    shanghaiP = (await ProvinceController.findProvince({name: '测试_上海'}))[0]
    zhejiangP = (await ProvinceController.findProvince({name: '测试_浙江'}))[0]
    shanghaiC = (await CityController.findCity({name: '测试_上海'}))[0]
    hangzhouC = (await CityController.findCity({name: '测试_杭州'}))[0]
    pudong = (await DistrictController.findDistrict({name: '测试_浦东'}))[0]
    xiasha = (await DistrictController.findDistrict({name: '测试_下沙'}))[0]
  })

  it('创建一个"测试用户_username注册"', async () => {
    await UserController.createUser({
      username: '测试用户_username注册',
      password: 'fd*Dd=.d&/fs\\f,D3',
      name: '测试用户_username注册',
      addresses: [
        {
          country: china._id,
          province: shanghaiP._id,
          city: shanghaiC._id,
          district: pudong._id,
          detail: '测试用户地址_上海市浦东新区齐河路1弄',
          geoLocation: {
            coordinates: [121.507097, 31.184222]
          }
        }
      ]
    })
  })

  it('创建一个"测试用户_mobile注册"', async () => {
    await UserController.createUser({
      mobile: '13917799109',
      password: 'fd*Dd=.d&/fs\\f,D3',
      name: '测试用户_mobile注册',
      addresses: [
        {
          country: china._id,
          province: shanghaiP._id,
          city: shanghaiC._id,
          district: pudong._id,
          detail: '测试用户地址_上海市静安区胶州路1弄',
          geoLocation: {
            coordinates: [121.450528, 31.233853]
          }
        }
      ]
    })
  })

  it('创建一个"测试用户_email注册"', async () => {
    await UserController.createUser({
      email: '415413233@qq.com',
      password: 'fd*Dd=.d&/fs\\f,D3',
      name: '测试用户_email注册',
      addresses: [
        {
          country: china._id,
          province: shanghaiP._id,
          city: shanghaiC._id,
          district: pudong._id,
          detail: '测试用户地址_上海市浦东新区昌里路167弄',
          geoLocation: {
            coordinates: [121.501932, 31.182163]
          }
        },
        {
          country: china._id,
          province: shanghaiP._id,
          city: shanghaiC._id,
          district: pudong._id,
          detail: '测试用户地址_上海市浦东新区昌里东路500弄',
          geoLocation: {
            coordinates: [121.521399, 31.183536]
          }
        }
      ]
    })
  })

  it('创建一个"测试用户_被删除用户"', async () => {
    await UserController.createUser({
      email: 'aaa@qq.com',
      password: 'fd*Dd=.d&/fs\\f,D3',
      name: '测试用户_被删除用户',
      addresses: [
        {
          country: china._id,
          province: shanghaiP._id,
          city: shanghaiC._id,
          district: pudong._id,
          detail: '测试用户地址_上海市浦东新区昌里路166弄',
          geoLocation: {
            coordinates: [121.501930, 31.182160]
          }
        }
      ]
    })
  })

  it('登陆"测试用户_username注册"', async () => {
    // 2000用户同时刻登陆,1300~1500ms响应
    const loginData = {
      username: '测试用户_username注册',
      password: 'fd*Dd=.d&/fs\\f,D3'
    }

    const entryLogData = {
      ip: '测试登陆日志_127.0.0.1'
    }

    return await UserController.login(loginData, entryLogData)
  })

  it('删除"测试用户_被删除用户"', async () => {

  })

})