const crypto = require('crypto')
const {Staff} = require('../models')
const {ErrorService} = require('../services')
const adminStaff = {
  username: process.env.SERVER_ADMIN_USERNAME,
  password: process.env.SERVER_ADMIN_PASSWORD,
  email: process.env.SERVER_ADMIN_EMAIL,
  isAdmin: true
}

const STAFF_PROTECTED_FIELD = '-password -createdAt -updatedAt -ips -__v'
const STAFF_PROTECTED_FIELD_OTHER = '-username -email -password -createdAt -updatedAt -ips -__v'

const isFromDesktop = staff => staff.username || staff.mobile || staff.email

const isFromWechat = staff => staff.unionId || staff.openId

const isNoPassword = staff => !staff.password

const isEmpty = value => value.length === 0 || value === null

async function login(staffInfo) {
  if (!(isFromDesktop(staffInfo) || isFromWechat(staffInfo))) {
    throw ErrorService.STAFF_UNKNOW_SOURCE
  }

  if (isFromDesktop(staffInfo)) {
    if (isNoPassword(staffInfo)) {
      throw ErrorService.STAFF_NO_PASSWORD
    }
    staffInfo.password = encryptPassword(staffInfo.password)
  }

  const staff = Staff.findOne(staffInfo, STAFF_PROTECTED_FIELD)

  if (staff) return staff
  else throw ErrorService.STAFF_NOT_FOUND
}

async function createStaff(staffInfo) {
  if (!(isFromDesktop(staffInfo) || isFromWechat(staffInfo))) {
    throw ErrorService.STAFF_UNKNOW_SOURCE
  }

  if (isFromDesktop(staffInfo)) {
    if (isNoPassword(staffInfo)) {
      throw ErrorService.STAFF_NO_PASSWORD
    }
    staffInfo.password = encryptPassword(staffInfo.password)
  }

  const staffModel = new Staff(staffInfo)
  const staff = await staffModel.save()

  delete staff.password
  return staff
}

async function findAdminStaff() {
  return await Staff.findOne({isAdmin: true})
}

async function createAdminStaff() {
  return await createStaff(adminStaff)
}

function encryptPassword(password) {
  return crypto.createHmac('md5', process.env.SERVER_PASSWORD_SECRET)
    .update(password)
    .digest('base64')
}

function getStaffById(id, isSelf) {
  return Staff.findById(id, isSelf ? STAFF_PROTECTED_FIELD : STAFF_PROTECTED_FIELD_OTHER)
}

function editStaffById(id, updateFields) {
  return new Promise((resolve, reject) => {
    delete updateFields.mobile
    delete updateFields._id

    Staff.findByIdAndUpdate(id, updateFields, {new: true, fields: STAFF_PROTECTED_FIELD, runValidators: true})
      .then(staff => resolve(staff))
      .catch(error => reject(error))
  })
}

exports.login = login
exports.createStaff = createStaff
exports.getStaffById = getStaffById
exports.editStaffById = editStaffById
exports.findAdminStaff = findAdminStaff
exports.createAdminStaff = createAdminStaff