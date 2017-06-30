import axios from 'axios'

const getVerifySMS = (mobile) => axios.get(`/apis/sms?mobile=${mobile}`)

export default {
  getVerifySMS
}