export const mutations = {
  setCountry(state, data) {
    state.countryArray = data;
  },
  updateCountry(state, data) {
    state.countryArray = state.countryArray.map(country => {
      return country._id === data._id ? data : country;
    });
  }
};