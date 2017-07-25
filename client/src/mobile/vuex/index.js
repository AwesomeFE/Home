import Vuex from 'vuex'
import state from './root/state'
import actions from './root/actions'
import getters from './root/getters'
import mutations from './root/mutations'

export default () => new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
