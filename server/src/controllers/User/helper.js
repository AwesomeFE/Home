import crypto from 'crypto'
import ErrorService from '../../services/ErrorService'

export function getUserLoginType(loginData = {}) {
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

export async function checkUserLoginType(userData = {}) {
  if (!(isFromWeb(userData) || isFromWechat(userData))) {
    throw ErrorService.UNKNOW_LOGIN_TYPE
  }
}

export async function checkUserPassword(userInfo = {}) {
  if (isFromWeb(userInfo) && isNoPassword(userInfo)) {
    throw ErrorService.PASSWORD_EMPTY
  }
}

export function encryptPassword(password = '') {
  return password
    ? crypto.createHmac('md5', process.env.SERVER_PASSWORD_SECRET)
      .update(password)
      .digest('base64')
    : undefined
}

export function fetchAddressFromUserInfo(userInfo = {}) {
  const userAddresses = userInfo.addresses
  delete userInfo.addresses

  return userAddresses
}

function isFromWeb(userData) {
  return !!(userData.username || userData.mobile || userData.email)
}

function isFromWechat(userData) {
  return !!(userData.unionId || userData.openId)
}

function isNoPassword(user) {
  return !user.password
}