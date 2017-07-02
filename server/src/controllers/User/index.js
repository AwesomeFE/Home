import {User} from '../../models'
import ErrorService from '../../services/ErrorService'
import * as AddressController from '../Address'
import * as EntryLogController from '../EntryLog'
import {
  checkUserPassword,
  checkUserLoginType,
  encryptPassword,
  getUserLoginType,
  fetchAddressFromUserInfo
} from './helper'

/**
 * Controller Method: 用户登录
 *
 * @param {Object} loginData: 用户登录数据
 * @param {Object} entryLogData: 用户登录记录
 *
 * @returns {Object} user: 登陆用户信息
 */
export async function login(loginData = {}, entryLogData = {}) {

  // 检查用户登录类型、用户密码是否合法
  await checkUserLoginType(loginData)
  await checkUserPassword(loginData)

  // 加密密码
  const password = encryptPassword(loginData.password)

  // 查找用户
  delete loginData.password
  const user = await User.findOne(loginData)

  // 如果用户不存在，则报错
  if (!user) {
    throw ErrorService.USER_NOT_FOUND

    // 如果用户ip不存在，报错
  } else if (!entryLogData.ip) {
    throw ErrorService.NO_ENTRY_LOG

    // 如果用户密码不正确，报错
  } else if (password !== user.password) {
    throw ErrorService.PASSWORD_ERROR
  }

  // 创建登陆数据
  entryLogData.loginBy = getUserLoginType(loginData)
  entryLogData.userId = user._id
  await EntryLogController.createEntryLog(entryLogData)

  // 返回登录用户数据
  return user
}

/**
 * Controller Method: 创建用户
 *
 * @param userData: 用户注册数据
 *
 * @returns {Promise.<user>}: 注册用户信息
 */
export async function createUser(userData = {}) {

  // 检查用户注册类型、用户密码是否合法
  await checkUserLoginType(userData)
  await checkUserPassword(userData)

  // 加密密码，获取用户地址信息
  userData.password = encryptPassword(userData.password)
  const userAddresses = fetchAddressFromUserInfo(userData)

  // 创建用户
  let user = await User.create(userData)

  // 如果有地址信息，创建地址信息
  if (userAddresses) {
    user.addresses = await AddressController.createAddress(userAddresses)
  }

  // 返回用户数据
  return await user.save()
}

export async function getRelationshipBetween(userIdA, userIdB) {
  if(userIdA === userIdB) {
    return 'same'
  } else {
    return ''
  }
}

async function searchUser(searchText = '', searchFields = '') {

}

async function updateUser(userData = {}) {
  const userInfo = await User.findByIdAndUpdate(userData._id, userData, {new: true})
}