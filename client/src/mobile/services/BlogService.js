import axios from 'axios'
import {
  CREATE_BLOG,
  SEARCH_BLOG
} from '../constants/apiUrls'

export const createBlog = (data) => axios.post(CREATE_BLOG(), data)

export const searchBlog = (params = {}) => axios.get(SEARCH_BLOG(), {params})
