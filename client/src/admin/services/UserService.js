import axios from 'axios'
import {
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  EDIT_USER,
  GET_SESSION_USER,
  GET_USER_PROFILE,
  MAKE_FRIEND_WITH,
  CHECK_FRIEND_WITH,
  UPDATE_USER,
  SEARCH_USER
} from '../constants/apiUrls'

export const getSessionUser = () => axios.get(GET_SESSION_USER());

export const signin = (passport) => axios.post(SIGNIN(), passport);
export const signout = () => axios.get(SIGNOUT());
export const signup = (passport) => axios.post(SIGNUP(), passport);

export const editUser = (userInfo) => axios.post(EDIT_USER(userInfo), userInfo)
export const getUserProfile = userId => axios.get(GET_USER_PROFILE(userId))
export const makeFriendWith = userId => axios.post(MAKE_FRIEND_WITH(userId))
export const checkFiendWith = userId => axios.get(CHECK_FRIEND_WITH(userId))
export const updateUser = form => axios.put(UPDATE_USER(), form)
export const searchUsers = query => axios.post(SEARCH_USER(), query)