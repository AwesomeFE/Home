
export const USER_IS_EXISTED        = {status: 400, message: 'User is existed.', type: 'USER_IS_EXISTED'};
export const PASSWORD_ERROR         = {status: 401, message: 'Password is wrong.', type: 'PASSWORD_ERROR'};
export const PASSWORD_EMPTY         = {status: 400, message: 'Password is empty.', type: 'PASSWORD_EMPTY'};
export const USER_NOT_FOUND         = {status: 400, message: 'Cannot find the user.', type: 'USER_NOT_FOUND'};
export const NO_SESSION_USER        = {status: 401, message: 'Session user is empty.', type: 'NO_SESSION_USER'};
export const NO_ENTRY_LOG           = {status: 400, message: 'Login information don\'t have entry log.', type: 'NO_ENTRY_LOG'};
export const UNKNOW_LOGIN_TYPE      = {status: 401, message: 'Unknow login type.', type: 'UNKNOW_LOGIN_TYPE'};
export const DONT_MAKE_SELF_FRIEND  = {status: 400, message: 'Cannot make friend with self.', type: 'DONT_MAKE_SELF_FRIEND'};

export const SMS_MOBILE_NUMBER_INVALID  = {status: 400, message: 'SMS mobile number is invalid.', type: 'SMS_MOBILE_NUMBER_INVALID'};
export const SMS_SEND_FAILED            = {status: 400, message: 'SMS send failed.', type: 'SMS_SEND_FAILED'};
export const SMS_VERIFY_FAILED          = {status: 400, message: 'SMS verify failed.', type: 'SMS_VERIFY_FAILED'};

export const CAPTCHA_VERIFY_FAILED      = {status: 400, message: 'Captcha verify Error.', type: 'CAPTCHA_VERIFY_FAILED'}

export const BLOG_NO_CONTENT            = {status: 400, message: 'Blog content can not be empty.', type: 'BLOG_NO_CONTENT'}
export const FILE_NOT_FIND              = {status: 404, message: 'Cannot find the file.', type: 'CANNOT_FIND_FILE'}
export const NO_BLOG_ID                 = {status: 404, message: 'Don\'t have blog id.', type: 'NO_BLOG_ID'}