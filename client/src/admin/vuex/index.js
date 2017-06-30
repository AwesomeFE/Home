import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import accounts from './modules/accounts'

let state = {
  loggedStaff: {}
}

export default () => new Vuex.Store({
  state,
  actions,
  mutations,

  modules: {
    accounts
  },

  strict: process.env.NODE_ENV !== 'production'
})