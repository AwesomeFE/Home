# 路由配置表

## 短信验证码

| Path | Method | Query | Body |
|---|---|---|---|
| /sms | GET | mobile='string' | null |
| /sms/verify | GET | SMSCode='string' | null |

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

| Path | Method | Query | Body |
|---|---|---|---|
| /captcha | GET | mobile='string' | null |
| /captcha | POST | null | verifyData='string' |

### /captcha GET

```json
{
  "status": 200,
  "message": "Should verify captcha.",
  "type": "SHOULD_CAPTCHA_VERIFY",
  "captchaImage": "base64png"
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