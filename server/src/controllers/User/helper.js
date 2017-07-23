import crypto from 'crypto'
import * as relationship from '../../constants/relationshipTypes'
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

export function formatUserJson(userDoc = {}, relationshipType = '') {
  let user = null

  if(userDoc) {
    user = userDoc.toObject ? userDoc.toObject() : userDoc
    const projections = user.projections || []

    if(relationshipType === 'pending' || relationshipType === 'confirm') {
      relationshipType = 'none'
    }

    for(const projection of projections) {
      if(relationshipType === projection.type) {
        const projectionKeys = projection.projection.split(/\s*-/g)

        for(const key of projectionKeys) {
          delete user[key]
        }
      }
    }
  }

  return user
}

export function getDefaultProjection() {
  return [
    {
      type: relationship.USER.SELF,
      projection: '-password'
    },
    {
      type: relationship.USER.FRIEND,
      projection: '-addresses -password -projections'
    },
    {
      type: relationship.USER.NONE,
      projection: '-mobile -email -addresses -password -projections'
    }
  ]
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

export function isSameUser(thisUser, thatUser) {
  return thisUser._id.toString() === thatUser._id.toString()
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