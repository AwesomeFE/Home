import '../config'
import db from '../server/src/services/DatabaseService'
import * as datas from './datas'
import {
  Country,
  Province,
  City,
  District,
  Address,
  User,
  EntryLog
} from '../server/src/models'

describe('开始测试项目', () => {
  it('连接数据库', async () => {
    await db.connect()
  })
})

after('清理数据库', (done) => {
  cleanupDatabase(done)
    .catch(() => done('清理失败!'))
})

async function cleanupDatabase(done) {
  for (const countryData of datas.countriesData) {
    await Country.findOneAndRemove(countryData)
  }

  for (const provinceData of datas.provincesData) {
    await Province.findOneAndRemove(provinceData)
  }

  const citiesMap = Object.entries(datas.citiesData)
  for (const [provinceName, citiesData] of citiesMap) {
    for(const cityData of citiesData) {
      await City.findOneAndRemove(cityData)
    }
  }
  await District.findOneAndRemove({name: '测试_浦东'})
  await District.findOneAndRemove({name: '测试_黄浦'})
  await District.findOneAndRemove({name: '测试_闸北'})
  await District.findOneAndRemove({name: '测试_下沙'})
  await Address.findOneAndRemove({detail: '测试_上海市浦东新区齐河路20弄'})
  await Address.findOneAndRemove({detail: '测试_上海市浦东新区耀华路19弄'})
  await Address.findOneAndRemove({detail: '测试_杭州市下沙高教文泽路20弄'})
  await Address.findOneAndRemove({detail: '测试_杭州市下沙高教文泽路19弄'})

  await User.findOneAndRemove({name: '测试用户_username注册'})
  await User.findOneAndRemove({name: '测试用户_mobile注册'})
  await User.findOneAndRemove({name: '测试用户_email注册'})
  await User.findOneAndRemove({name: '测试用户_被删除用户'})
  await Address.findOneAndRemove({detail: '测试用户地址_上海市浦东新区齐河路1弄'})
  await Address.findOneAndRemove({detail: '测试用户地址_上海市静安区胶州路1弄'})
  await Address.findOneAndRemove({detail: '测试用户地址_上海市浦东新区昌里路166弄'})
  await Address.findOneAndRemove({detail: '测试用户地址_上海市浦东新区昌里路167弄'})
  await Address.findOneAndRemove({detail: '测试用户地址_上海市浦东新区昌里东路500弄'})
  await EntryLog.remove({ip: '测试登陆日志_127.0.0.1'})

  console.log('测试数据清理完毕!')
  done()
}

require('./server')