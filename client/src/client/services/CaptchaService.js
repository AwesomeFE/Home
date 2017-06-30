import axios from 'axios'
import {
  GET_CAPTCHA,
  VERIFY_CAPTCHA
} from '../contants/apiUrls'

export const getCaptcha = isLogin => axios.get(GET_CAPTCHA(isLogin))

export const verifyCaptcha = captcha => axios.post(VERIFY_CAPTCHA(), {captcha})