# 路由配置表

## 短信验证码

| Path | Method | Query | Body | Description |
|---|---|---|---|---|
| /api/sms | GET | mobile='string' | null | 向指定手机号发送短信验证码 |
| /api/sms/verify | GET | SMSCode='string' | null | 验证短信验证码 |

### /sms

```json
{
  "status": 200,
  "message": "SMS send successfully.",
  "type": "SMS_SEND_SUCCESS"
}
```

### /sms/verify

```json
{
  "status": 200,
  "message": "SMS verify successfully.",
  "type": "SMS_VERIFY_SUCCESS"
}
```

## 图形验证码

| Path | Method | Query | Body | Description |
|---|---|---|---|---|
| /api/captcha | GET | [isLogin='boolean'] | null | 请求图形验证码 |
| /api/captcha | POST | null | verifyData='string' | 验证图形验证码 |

### /captcha GET

在登陆模式下，有三次无需验证图形验证码的机会。登录失败超过三次，会被要求检验图形验证码。

在注册状态下，调用验证码都会做校验。

- 需要验证图形验证码
```json
{
  "status": 200,
  "message": "Should verify captcha.",
  "type": "SHOULD_CAPTCHA_VERIFY",
  "captchaImage": "base64png"
}
```
- 无需验证
```json
{
  "status": 200,
  "message": "No need to verify captcha.",
  "type": "NO_NEED_CAPTCHA_VERIFY"
}
```

### /captcha POST

```json
{
  "status": 200,
  "message": "Captcha verify successfully.",
  "type": "CAPTCHA_VERIFY_SUCCESS"
}
```

## 用户API

| Path | Method | Query | Body | Description |
|---|---|---|---|---|
| /api/user/login | POST | null | username/email/mobile='string'&password='string' | 用户登录 |
| /api/user/register | POST | null | username/email/mobile='string'&password='string' | 用户注册 |
| /api/user/session | GET | null | null | 获取session登录用户信息 |
| /api/user/logout | GET | null | null | 用户登出 |
| /api/user[未完成] | GET | query?? | null | 用户搜索 |
| /api/user[未完成] | UPDATE | null | ??? | 更新用户资料 |
| /api/user/:id[未完成] | GET | query?? | null | 获取某用户资料 |
| /api/user/:id[未完成] | POST | query?? | null | 对指定用户编辑昵称 |

### /api/user/login POST

```json
{
  "status":200,
  "message":"Account login successfully.",
  "type":"ACCOUNT_LOGIN_SUCCESS",
  "user": "userInfo/null"
}
```

### /api/user/register POST

```json
{
  "status":200,
  "message":"Account register successfully.",
  "type":"ACCOUNT_REGISTER_SUCCESS",
  "user": "userInfo/null"
}
```

### /api/user/session GET

```json
{
  "status":200,
  "message":"Get session user successfully.",
  "type":"SESSION_USER_SUCCESS",
  "user": "userInfo/null"
}
```

### /api/user/logout GET

```json
{
  "status":200,
  "message":"Account logout successfully.",
  "type":"ACCOUNT_LOGOUT_SUCCESS"
}
```

## 微博API

| Path | Method | Query | Body | Description |
|---|---|---|---|---|
| /api/blog[未完成] | GET | [userId='string'] | null | 查询微博 |
| /api/blog[未完成] | POST | null | blogData | 发表微博 |
| /api/blog/:id[未完成] | GET | null | null | 获取微博详情 |
| /api/blog/:id[未完成] | UPDATE | null | blogData | 更新微博 |
| /api/blog/:id[未完成] | DELETE | null | null | 删除微博 |
