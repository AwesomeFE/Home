import axios from 'axios'

export default {
  login: passport => axios.post('/apis/staff/login', passport),
  logout: passport => axios.get('/apis/staff/logout'),
  register: passport => axios.post('/apis/staff/register', passport),
  getStaffById: id => axios.get(`/apis/staff/${id}`),
  getLoginStaff: () => axios.get(`/apis/staff/login`).then(({data: loginStaff}) => loginStaff),
  edit: staff => axios.post(`/apis/staff/${staff._id}`, staff)
}