// Captcha Service Response
export const NO_NEED_CAPTCHA_VERIFY = {status: 200, message: 'No need to verify captcha.', type: 'NO_NEED_CAPTCHA_VERIFY'};
export const SHOULD_CAPTCHA_VERIFY  = {status: 200, message: 'Should verify captcha.', type: 'SHOULD_CAPTCHA_VERIFY'};

// Captcha Service Error
export const CAPTCHA_IS_EMPTY       = {status: 400, message: 'Captcha cannot be empty.', type: 'CAPTCHA_IS_EMPTY'};
export const CAPTCHA_VERIFY_FAILED  = {status: 400, message: 'Captcha verify failed.', type: 'CAPTCHA_VERIFY_FAILED'};

// User Router Error
export const UNKNOW_LOGIN_TYPE      = {status: 401, message: 'Unknow login type.', type: 'UNKNOW_LOGIN_TYPE'};
export const PASSWORD_EMPTY         = {status: 400, message: 'Password is empty.', type: 'PASSWORD_EMPTY'};
export const IS_ALREADY_LOGIN       = {status: 200, message: 'User is already login.', type: 'IS_ALREADY_LOGIN'};
export const USER_IS_EXISTED        = {status: 400, message: 'User is existed.', type: 'USER_IS_EXISTED'};
export const PASSWORD_ERROR         = {status: 401, message: 'Password is wrong.', type: 'PASSWORD_ERROR'};
export const USER_NOT_FOUND         = {status: 400, message: 'Cannot find the user.', type: 'USER_NOT_FOUND'};

// Response successful
export const REQUEST_SUSSESS        = {status: 200, message: 'Request successfully.', type: 'REQUEST_SUSSESS'};
export const FIELD_IS_EMPYT         = {status: 400, message: 'is required.', type: 'FIELD_IS_EMPYT'};