import axios from 'axios'

export default {
  login: passport => axios.post('/apis/accounts/login', passport),
  register: passport => axios.post('/apis/accounts/register', passport),
  edit: userInfo => axios.post(`/apis/accounts/${userInfo._id}`, userInfo)
}