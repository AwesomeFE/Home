// User api urls
export const GET_SESSION_USER = () => `/api/user/session`;
export const SIGNIN = () => `/api/user/signin`;
export const SIGNOUT = () => `/api/user/signout`;
export const SIGNUP = () => `/api/user/signup`;

// Country api urls
export const CREATE_COUNTRY = () => `/api/country`;
export const GET_COUNTRY_LIST = () => `/api/country`;
export const EDIT_COUNTRY = countryId => `/api/country/${countryId}`;
export const GET_COUNTRY_DETAIL = countryId => `/api/country/${countryId}`;



// 用户资料更新
export const UPDATE_USER = () => `/api/user`

// 获取用户详情信息页
export const GET_USER_PROFILE = userId => `/api/user/${userId}`

// 和某用户发送好友申请
export const MAKE_FRIEND_WITH = userId => `/api/user/friend/${userId}`

// 检查用户是否为好友
export const CHECK_FRIEND_WITH = userId => `/api/user/friend/${userId}`

// 用户信息编辑
export const EDIT_USER = userId => `/api/user/${userId}`

// 搜索用户
export const SEARCH_USER = () => `/api/user/search`

// 获取验证码
export const GET_CAPTCHA = isLogin => `/api/captcha`

// 校验验证码
export const VERIFY_CAPTCHA = () => `/api/captcha`

// 获取短信验证码
export const GET_SMS_CODE = mobile => `/api/sms?mobile=${mobile}`

// 校验短信验证码
export const VERIFY_SMS_CODE = smsCode => `/api/sms/verify?SMSCode=${smsCode}`

// 创建博客
export const CREATE_BLOG = () => `/api/blog`

// 搜索博客
export const SEARCH_BLOG = () => `/api/blog`

// 获取详细博客
export const GET_BLOG_DETAIL = blogId => `/api/blog/${blogId}`

// 点赞博客
export const TOGGLE_LIKE_BLOG = blogId => `/api/blog/${blogId}/like`

// 文件获取地址
export const GET_FILE = fileId => `/api/file/${fileId}`