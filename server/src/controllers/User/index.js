import {User} from '../../models'
import ErrorService from '../../services/ErrorService'
import * as FileController from '../File'
import * as AddressController from '../Address'
import * as EntryLogController from '../EntryLog'
import * as RelationshipController from '../Relationship'
import * as relationshipTypes from '../../constants/relationshipTypes'
import {
  checkUserPassword,
  checkUserLoginType,
  encryptPassword,
  getUserLoginType,
  fetchAddressFromUserInfo,
  isSameUser,
  getDefaultProjection,
  formatUserJson
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
  const userDoc = await User.findOne(loginData)

  // 如果用户不存在，则报错
  if (!userDoc) {
    throw ErrorService.USER_NOT_FOUND

    // 如果用户ip不存在，报错
  } else if (!entryLogData.ip) {
    throw ErrorService.NO_ENTRY_LOG

    // 如果用户密码不正确，报错
  } else if (password !== userDoc.password) {
    throw ErrorService.PASSWORD_ERROR
  }

  // 创建登陆数据
  entryLogData.loginBy = getUserLoginType(loginData)
  entryLogData.userId = userDoc._id
  await EntryLogController.createEntryLog(entryLogData)

  // 返回登录用户数据
  return formatUserJson(userDoc, relationshipTypes.USER.SELF)
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
  let userDoc = await User.create(userData)

  // 如果有地址信息，创建地址信息
  if (userAddresses) {
    userDoc.addresses = await AddressController.createAddress(userAddresses)
  }

  userDoc.projections = getDefaultProjection()

  // 返回用户数据
  return formatUserJson(await userDoc.save(), relationshipTypes.USER.SELF)
}

/**
 * Controller Method: 获取用户间关系
 *
 * @param thisUserId
 * @param thatUserId
 * @param type
 * @returns {Promise.<String>}
 */
export async function getRelationshipStatusBetween(thisUserId, thatUserId, type) {
  // 获取用户document实例
  let relationshipStatus = relationshipTypes.USER.NONE
  const thisUser = await User.findById(thisUserId)
  const thatUser = await User.findById(thatUserId)

  if(thisUser && thatUser) {
    if(isSameUser(thisUser, thatUser)) {
      return relationshipTypes.USER.SELF
    }

    // 获取用户间关系数据，并且检查用户关系是否存在
    const relationship = await RelationshipController.getRelationship(thisUser, thatUser, type)
    const isRelationshipExisted = relationship.from || relationship.to

    // 如果用户关系存在并相等，则确立关系
    if(isRelationshipExisted) {
      if(relationship.from === relationship.to) {
        return relationship.from
        // 如果用户去关系存在，那就是需要对方确认，pending状态
      } else if(relationship.from) {
        relationshipStatus = 'pending'
        // 如果用户去关系不存在，但存在关系，那么就是需要confirm的状态
      } else {
        relationshipStatus = 'confirm'
      }
    }
  }

  return relationshipStatus
}

/**
 * Controller Method: 创建用户关系
 * @param thisUserId
 * @param thatUserId
 * @param type
 * @returns {Promise.<*>}
 */
export async function makeRelation(thisUserId, thatUserId, type) {
  // 获取用户document实例
  const thatUser = await User.findById(thatUserId)
  const thisUser = await User.findById(thisUserId)
  // 建立document间关系数据
  return await RelationshipController.makeRelationship(thisUser, thatUser, type)
}

export async function getUserDetailById(userId, sessionUserId) {
  const user = await User.findById(userId)
  const relationship = await this.getRelationshipStatusBetween(sessionUserId, userId, 'friend')

  return formatUserJson(user, relationship)
}

export async function searchUser(query = {}, sessionUserId) {
  const user = []
  const usersDoc = await User.find(query)

  for(const userDoc of usersDoc) {
    if(sessionUserId !== userDoc._id.toString()) {
      const relationship = await this.getRelationshipStatusBetween(sessionUserId, userDoc._id, 'friend')
      user.push(formatUserJson(userDoc, relationship))
    }
  }

  return user
}

export async function updateUser(userId, userData = {}, avatar) {
  if(avatar) {
    userData.avatar = await FileController.saveFile(avatar)
  }
  return await User.findByIdAndUpdate(userId, userData, {new: true})
}