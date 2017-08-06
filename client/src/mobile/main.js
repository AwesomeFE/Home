import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import VueValidate from 'vee-validate'

import './main.scss'
import store from './vuex'
import router from './router'
import initService from './services'
import initDirectives from './directives'
import initComponents from './components'

import moment from 'moment'

Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(VueValidate)

initService()
initDirectives()
initComponents()

moment.locale('zh-cn')

new Vue({
  router: router(),
  store: store()
}).$mount('#app')