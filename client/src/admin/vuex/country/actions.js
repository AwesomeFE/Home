import * as CountryService from '../../services/CountryService';

export const actions = {
  // 获取国家列表
  async getCountryList({ commit, state }) {
    const { data, type } = await CountryService.getCountryList();
    commit('setCountry', data);

    return { data, type };
  },

  // 获取国家列表
  async getCountryDetal({ commit, state }, countryId) {
    const { data, type } = await CountryService.getCountryDetail(countryId);

    return { data, type };
  },

  // 获取国家列表
  async createCountry({ commit, state }, formData) {
    const { data, type } = await CountryService.createCountry(formData);

    return { data, type };
  },

  async editCountry({ commit, state }, { countryId, formData }) {
    const { data, type } = await CountryService.editCountry(countryId, formData);
    
    return { data, type };
  },

  async publishCountry({ commit, state }, countryId) {
    const { data, type } = await CountryService.publishCountry(countryId);
    commit('updateCountry', data);

    return { data, type };
  },

  async unpublishCountry({ commit, state }, countryId) {
    const { data, type } = await CountryService.unpublishCountry(countryId);
    commit('updateCountry', data);

    return { data, type };
  }
};
