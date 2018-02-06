import axios from 'axios';
import {
  GET_COUNTRIES
} from '../constants/apiUrls';

export const getCountries = () => axios.get(GET_COUNTRIES());