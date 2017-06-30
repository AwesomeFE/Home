import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

let state = {
  user: null
}

export default () => new Vuex.Store({
  state,
  actions,
  mutations,

  modules: {
  },

  strict: process.env.NODE_ENV !== 'production'
})
