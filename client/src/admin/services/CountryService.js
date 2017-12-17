import axios from 'axios';
import {
  GET_COUNTRY_LIST,
  GET_COUNTRY_DETAIL,
  CREATE_COUNTRY,
  EDIT_COUNTRY
} from '../constants/apiUrls';

export const getCountryList = () => axios.get(GET_COUNTRY_LIST());
export const getCountryDetail = countryId => axios.get(GET_COUNTRY_DETAIL(countryId));
export const createCountry = formData => axios.post(CREATE_COUNTRY(), formData);
export const editCountry = (countryId, formData) => axios.post(EDIT_COUNTRY(countryId), formData);