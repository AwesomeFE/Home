import axios from 'axios'
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  EDIT_USER,
  GET_SESSION_USER,
  GET_USER_PROFILE,
  MAKE_FRIEND_WITH,
  CHECK_FRIEND_WITH
} from '../constants/apiUrls'

export const getSessionUser = () => axios.get(GET_SESSION_USER())
export const login = (passport) => axios.post(LOGIN(), passport)
export const logout = () => axios.get(LOGOUT())
export const register = (passport) => axios.post(REGISTER(), passport)
export const editUser = (userInfo) => axios.post(EDIT_USER(userInfo), userInfo)
export const getUserProfile = userId => axios.get(GET_USER_PROFILE(userId))
export const makeFriendWith = userId => axios.post(MAKE_FRIEND_WITH(userId))
export const checkFiendWith = userId => axios.get(CHECK_FRIEND_WITH(userId))