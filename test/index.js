import '../config'
import db from '../server/src/services/DatabaseService'
import {
  Country,
  Province,
  City,
  District,
  Address,
  User,
  EntryLog
} from '../server/src/models'

describe('启动测试', () => {
  it('连接数据库', async () => {
    await db.connect()
  })

  it('服务器测试', () => {
    require('./server')
  })
})

after('清理数据库', (done) => {
  cleanupDatabase(done)
    .then(() => {
      console.log('测试数据清理完毕!')
    })
    .catch(() => {
      done('清理失败!')
    })
})

async function cleanupDatabase(done) {
  await City.find({isTest: true}).remove()
  await Country.find({isTest: true}).remove()
  await Address.find({isTest: true}).remove()
  await Province.find({isTest: true}).remove()
  await District.find({isTest: true}).remove()

  await User.find({isTest: true}).remove()
  await EntryLog.find({isTest: true}).remove()

  done()
}