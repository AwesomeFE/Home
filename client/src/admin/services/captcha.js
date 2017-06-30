import axios from 'axios'

export default {
  verify: captcha => axios.get(`/apis/captchas?captcha=${captcha}`)
}