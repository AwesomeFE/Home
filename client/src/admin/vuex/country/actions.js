import * as CountryService from '../../services/CountryService';

export const actions = {
  // 用户api
  async getCountryList({ commit, state }) {
    const { data, type } = await CountryService.getCountryList();
    commit('setCountry', data);

    return type;
  }
};