import axios from 'axios'
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  EDIT_USER,
  GET_SESSION_USER
} from '../constants/apiUrls'

export const getSessionUser = () => axios.get(GET_SESSION_USER())
export const login = (passport) => axios.post(LOGIN(), passport)
export const logout = () => axios.get(LOGOUT())
export const register = (passport) => axios.post(REGISTER(), passport)
export const editUser = (userInfo) => axios.post(EDIT_USER(userInfo), userInfo)
