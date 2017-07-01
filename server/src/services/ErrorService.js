const uuid = require('node-uuid')
/**
 * ServerError类：声明
 */
class ErrorService extends Error {
  constructor({status, message, type, code}) {
    super(message)
    this.code = code
    this.type = type
    this.status = status
    this.id = uuid.v4()
  }

  static handler(errorMessage, req, res, next) {
    let error = new ErrorService(errorMessage)
    console.error(error)

    res
      .status(error.status ? 200 : 500)
      .json({
        message: error.message,
        type: error.type,
        id: error.id,
        status: error.status
      })
  }
}

function isMongoKnownError(code) {
  return code === 11000
}

/**
 * ErrorService类：静态属性
 */

ErrorService.PASSWORD_ERROR             = {status: 401, message: 'Password is wrong.', type: 'PASSWORD_ERROR'}
ErrorService.PASSWORD_EMPTY             = {status: 400, message: 'Password is empty.', type: 'PASSWORD_EMPTY'}
ErrorService.SMS_VERIFY_ERROR           = {status: 400, message: 'SMS verify error.', type: 'SMS_VERIFY_ERROR'}
ErrorService.CAPTCHA_VERIFY_FAILED      = {status: 400, message: 'Captcha verify Error.', type: 'CAPTCHA_VERIFY_FAILED'}
ErrorService.USER_IS_EXISTED            = {status: 400, message: 'User is existed.', type: 'USER_IS_EXISTED'}
ErrorService.USER_NOT_FOUND             = {status: 400, message: 'Cannot find the user.', type: 'USER_NOT_FOUND'}
ErrorService.NO_ENTRY_LOG               = {status: 400, message: 'Login information don\'t have entry log.', type: 'NO_ENTRY_LOG'}
ErrorService.UNKNOW_LOGIN_TYPE          = {status: 401, message: 'Unknow login type. It isn\'t from wechat or desktop.', type: 'UNKNOW_LOGIN_TYPE'}
ErrorService.PASSWORD_ERROR             = {status: 401, message: 'Password is wrong.', type: 'PASSWORD_ERROR'}
ErrorService.BLOG_NO_CONTENT            = {status: 400, message: 'Blog content can not be empty.', type: 'BLOG_NO_CONTENT'}
ErrorService.NO_SESSION_USER            = {status: 401, message: 'Session user is empty.', type: 'NO_SESSION_USER'}



// ErrorService.STAFF_UNKNOW_SOURCE         = {status: 404, message: 'Unknow staff source. It isn\'t from wechat or desktop.', type: 'STAFF_UNKNOW_SOURCE'}
// ErrorService.STAFF_NO_PASSWORD           = {status: 404, message: 'Staff don\'t have password.', type: 'STAFF_NO_PASSWORD'}
// ErrorService.STAFF_NOT_FOUND             = {status: 404, message: 'Cannot find the staff.', type: 'STAFF_NOT_FOUND'}
//
// ErrorService.ACCOUNT_VERIFY_ERROR        = {status: 404, message: 'Cannot Register without SMS verify.', type: 'ACCOUNT_VERIFY_ERROR'}
// // ServerError.ACCOUNT_MOBILE_EMPTY         = {status: 404, message: 'Account cannot be empty.', type: 'ACCOUNT_MOBILE_EMPTY'}
//
// ErrorService.AUTHORITY_ERROR             = {status: 401, message: 'Authority Error.', type: 'AUTHORITY_ERROR'}
// ErrorService.CAPTCHA_TEXT_EMPTY          = {status: 500, message: 'Captcha text is empty.', type: 'CAPTCHA_TEXT_EMPTY'}
//
// ErrorService.SMS_MOBILE_NUMBER_INVALID   = {status: 404, message: 'SMS mobile number is invalid.', type: 'SMS_MOBILE_NUMBER_INVALID'}
// ErrorService.SMS_SEND_FAILED             = {status: 404, message: 'SMS send failed.', type: 'SMS_SEND_FAILED'}
// ErrorService.SMS_VERIFY_FAILED           = {status: 404, message: 'SMS verify failed.', type: 'SMS_VERIFY_FAILED'}
//
// ErrorService.SOCKET_UNKNOW_USER_TYPE     = {status: 404, message: 'Unknow the websocket user type.', type: 'SOCKET_UNKNOW_USER_TYPE'}
// ErrorService.SOCKET_PARSE_MESSAGE_FAIL   = {status: 404, message: 'Parse the websocket message error.', type: 'SOCKET_PARSE_MESSAGE_FAIL'}
//
// ErrorService.FILE_UPLOAD_TYPE_ERROR      = {status: 404, message: 'Don\'t support the file type.', type: 'FILE_UPLOAD_TYPE_ERROR'}
// ErrorService.FILE_UPLOAD_SAVE_ERROR      = {status: 500, message: 'Saving file info error.', type: 'FILE_UPLOAD_SAVE_ERROR'}

export default ErrorService