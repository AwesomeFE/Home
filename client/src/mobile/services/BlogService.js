import axios from 'axios'
import {
  CREATE_BLOG,
  SEARCH_BLOG,
  TOGGLE_LIKE_BLOG,
  GET_BLOG_DETAIL
} from '../constants/apiUrls'

export const createBlog = data => axios.post(CREATE_BLOG(), data)

export const searchBlog = (params = {}) => axios.get(SEARCH_BLOG(), {params})

export const toggleLike = blogId => axios.post(TOGGLE_LIKE_BLOG(blogId))

export const getDetail = blogId => axios.get(GET_BLOG_DETAIL(blogId))