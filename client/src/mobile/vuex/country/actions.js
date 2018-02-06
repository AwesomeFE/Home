import * as CountryService from '../../services/CountryService';

export const actions = {
  // 用户api
  async getCountries() {
    const { data } = await CountryService.getCountries();
    return data;
  }
};