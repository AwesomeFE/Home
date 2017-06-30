import axios from 'axios'
import moment from 'moment'
import crypto from 'crypto'
import querystring from 'querystring'

const appKey = process.env.SERVER_SMS_SENDER_APPKEY
const appSecret = process.env.SERVER_SMS_SENDER_APPSECRET
const REST_URL = 'http://gw.api.taobao.com/router/rest'

export async function sendVerifySMS(mobile, code) {
  let options = {
    extend : '',
    sms_type : 'normal',
    sms_free_sign_name : '葳妮测试',
    sms_param : `{code: '${code}'}`,
    rec_num : mobile,
    sms_template_code : 'SMS_27445066',
    method: 'alibaba.aliqin.fc.sms.num.send'
  }

  let data = {
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    format: 'json',
    app_key: appKey,
    v: '2.0',
    sign_method: 'md5',
    ...options
  }
  data.sign = sign(data)

  return await axios.post(REST_URL, querystring.stringify(data))
}

function sign(params) {
  let sortedKeys = Object.keys(params).sort();
  let baseString = appSecret;

  for(const key of sortedKeys) {
    baseString += key + params[key]
  }
  baseString += appSecret;

  return crypto
    .createHash('md5')
    .update(baseString, 'utf8')
    .digest('hex')
    .toUpperCase();
}