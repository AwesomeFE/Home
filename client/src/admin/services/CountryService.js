import axios from 'axios';
import {
  GET_COUNTRY_LIST
} from '../constants/apiUrls';

export const getCountryList = () => axios.get(GET_COUNTRY_LIST());