import crypto from 'crypto'
import {
  User
} from '../models'
const AddressController = require('./Address')
const EntryLogController = require('./EntryLog')
const ErrorService = require('../services/ErrorService')

/**
 * Controller Method: User login function
 *
 * @param {Object} loginData: user login information
 * @param {Object} entryLogData: user login recode
 * @returns {Object} user: user account details
 */
export async function login(loginData = {}, entryLogData = {}) {

  await checkUserLoginType(loginData)
  await checkUserPassword(loginData)

  const password = encryptPassword(loginData.password)

  delete loginData.password
  const userInfo = await User.findOne(loginData)

  if (!userInfo) {
    throw ErrorService.USER_NOT_FOUND

  } else if (!entryLogData.ip) {
    throw ErrorService.NO_ENTRY_LOG

  } else if (password !== userInfo.password) {
    throw ErrorService.PASSWORD_ERROR
  }

  entryLogData.loginBy = getUserLoginType(loginData)
  entryLogData.userId = userInfo._id

  await EntryLogController.createEntryLog(entryLogData)

  return await userInfo.save()
}

/**
 * Controller Method: Create a user account
 *
 * @param {Object} userData
 * @returns {Object} userInfo
 */
export async function createUser(userData = {}) {

  await checkUserLoginType(userData)
  await checkUserPassword(userData)

  userData.password = encryptPassword(userData.password)
  const userAddresses = fetchAddressFromUserInfo(userData)

  let userInfo = await User.create(userData)

  if (userAddresses) {
    userInfo.addresses = await AddressController.createAddress(userAddresses)
  }

  return await userInfo.save()
}

async function searchUser(searchText = '', searchFields = '') {

}

async function updateUser(userData = {}) {
  const userInfo = await User.findByIdAndUpdate(userData._id, userData, {new: true})
}

/**
 * Helper Method: Get User Login Type
 *
 * @param loginData
 * @returns {String} loginType
 */
function getUserLoginType(loginData = {}) {
  if (loginData.username) {
    return 'username'

  } else if (loginData.mobile) {
    return 'mobile'

  } else if (loginData.email) {
    return 'email'

  } else if (loginData.unionId || loginData.openId) {
    return 'wechat'
  }
}

/**
 * Helper Method: Check User Login Password
 *
 * @param userInfo
 */
async function checkUserPassword(userInfo = {}) {
  if (isFromWeb(userInfo) && isNoPassword(userInfo)) {
    throw ErrorService.PASSWORD_EMPTY
  }
}

/**
 * Helper Method: Check User Login Type
 *
 * @param userData
 */
async function checkUserLoginType(userData = {}) {
  if (!(isFromWeb(userData) || isFromWechat(userData))) {
    throw ErrorService.UNKNOW_LOGIN_TYPE
  }
}

/**
 * Helper Method: Fetch addresses list from userInfo and remove it
 *
 * @param userInfo
 * @returns {Array} userAddresses
 */
function fetchAddressFromUserInfo(userInfo = {}) {
  const userAddresses = userInfo.addresses
  delete userInfo.addresses

  return userAddresses
}

/**
 * Helper Method: Check user is login from website
 *
 * @param userData
 * @returns {Boolean} result
 */
function isFromWeb(userData) {
  return !!(userData.username || userData.mobile || userData.email)
}

/**
 * Helper Method: Check user is login from WeChat
 *
 * @param userData
 * @returns {Boolean} result
 */
function isFromWechat(userData) {
  return !!(userData.unionId || userData.openId)
}

/**
 * Helper Method: Check user password is existed
 *
 * @param user
 * @returns {Boolean} result
 */
function isNoPassword(user) {
  return !user.password
}

/**
 * Helper Method: Check user password is existed
 * @param password
 * @returns {string | undefined} password
 */
function encryptPassword(password = '') {
  return password
    ? crypto.createHmac('md5', process.env.SERVER_PASSWORD_SECRET)
    .update(password)
    .digest('base64')
    : undefined
}
