// 用户重登录
export const GET_SESSION_USER = () => `/api/user/session`

// 用户登录
export const LOGIN = () => `/api/user/login`

// 用户登出
export const LOGOUT = () => `/api/user/logout`

// 用户注册
export const REGISTER = () => `/api/user/register`

// 用户信息编辑
export const EDIT_USER = userId => `/api/user/${userId}`

// 获取验证码
export const GET_CAPTCHA = isLogin => `/api/captcha${isLogin ? '?isLogin=true' : ''}`

// 校验验证码
export const VERIFY_CAPTCHA = () => `/api/captcha`

// 获取短信验证码
export const GET_SMS_CODE = mobile => `/api/sms?mobile=${mobile}`

// 校验短信验证码
export const VERIFY_SMS_CODE = smsCode => `/api/sms/verify?SMSCode=${smsCode}`
