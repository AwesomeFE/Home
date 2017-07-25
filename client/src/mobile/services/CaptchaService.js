import axios from 'axios'
import {
  GET_CAPTCHA,
  VERIFY_CAPTCHA
} from '../constants/apiUrls'

export const getCaptcha = (options) => axios.get(GET_CAPTCHA(), {params: options})

export const verifyCaptcha = captcha => axios.post(VERIFY_CAPTCHA(), {captcha})