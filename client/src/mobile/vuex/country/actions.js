import * as CountryService from '../../services/CountryService';

export const actions = {
  // 用户api
  async getCountryList() {
    const { data } = await CountryService.getCountryList();
    return data;
  }
};