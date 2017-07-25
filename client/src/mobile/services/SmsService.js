import axios from 'axios'
import {
  GET_SMS_CODE,
  VERIFY_SMS_CODE
} from '../constants/apiUrls'

export const getSmsCode = mobile => axios.get(GET_SMS_CODE(mobile))

export const verifySmsCode = smsCode => axios.get(VERIFY_SMS_CODE(smsCode))