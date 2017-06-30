import axios from 'axios'

export default {
  getVerifySMS: mobile => axios.get(`/apis/sms?mobile=${mobile}`),
  verifySmsCode: smsCode => axios.get(`/apis/sms/verify?SMSCode=${smsCode}`)
}