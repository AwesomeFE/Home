import {User} from '../../models'
import ErrorService from '../../services/ErrorService'
import * as FileController from '../File'
import * as AddressController from '../Address'
import * as EntryLogController from '../EntryLog'
import * as RelationshipController from '../Relationship'
import * as relationshipTypes from '../../constants/relationshipTypes'
import {
  isSameUser,
  formatUserJson,
  encryptPassword,
  getUserLoginType,
  checkUserPassword,
  checkUserLoginType,
  getDefaultProjection,
  fetchAddressFromUserInfo,
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

  // 实现用户序号自增长，并且生成默认nickname
  const prefix = userDoc.mobile || userDoc.email || userDoc.username
  await userDoc.update({nickname: `用户${prefix}`})

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
  const thisUser = await User.findById(thisUserId)
  const thatUser = await User.findById(thatUserId)
  let relationshipStatus = relationshipTypes.USER.NONE

  if(thisUser && thatUser) {

    // 如果是用户本身，则返回self
    if(isSameUser(thisUser, thatUser)) {
      return relationshipTypes.USER.SELF
    }

    // 获取用户间关系数据
    const relationship = await RelationshipController.getRelationshipBetween(thisUser, thatUser, type)

    // 如果没有关系，则返回none
    if(!relationship) {
      return relationshipTypes.USER.NONE
    }

    const hasPendingRelationship = relationship.records.some(record => record.from.id.toString() === thisUser._id.toString())
    const hasConfirmRelationship = relationship.records.some(record => record.to.id.toString() === thisUser._id.toString())

    // 如果来回确认都是Friend，则返回friend
    if(hasPendingRelationship && hasConfirmRelationship) {
      relationshipStatus = relationshipTypes.USER.FRIEND

    } else if(hasPendingRelationship) {
      relationshipStatus = relationshipTypes.USER.PENDING

    } else if(hasConfirmRelationship) {
      relationshipStatus = relationshipTypes.USER.CONFIRM
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

/**
 * Controller Method: 获取用户详细信息
 *
 * @param userId
 * @param sessionUserId
 * @returns {Promise.<*>}
 */
export async function getUserDetailById(userId, sessionUserId) {
  const user = await User.findById(userId)
  const relationship = await this.getRelationshipStatusBetween(sessionUserId, userId, 'friend')

  return formatUserJson(user, relationship)
}

/**
 * Controller Method: 搜索用户
 *
 * @param query
 * @param sessionUserId
 * @returns {Promise.<Array>}
 */
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

/**
 * Controller Method: 更新用户数据
 *
 * @param userId
 * @param userData
 * @param avatar
 * @returns {Promise.<*>}
 */
export async function updateUser(userId, userData = {}, avatar) {
  if(avatar) {
    userData.avatar = await FileController.saveFile(avatar)
  }
  return formatUserJson(await User.findByIdAndUpdate(userId, userData, {new: true}), relationshipTypes.USER.SELF)
}

/**
 * Controller Method: 获取用户所有好友id
 *
 * @param userId
 * @returns {Promise.<void>}
 */
export async function getUserFriendsId(userId) {
  const user = await User.findById(userId)

  return await RelationshipController.getRelationshipTwoWayIds(user, 'users', relationshipTypes.USER.FRIEND)
}