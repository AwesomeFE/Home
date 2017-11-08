import Vuex from 'vuex';
import * as captcha from './captcha';
import * as country from './country';
import { state, actions, getters, mutations } from './root';

export default () => new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    captcha,
    country
  }
})
