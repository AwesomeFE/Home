import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'

import './main.scss'
import store from './vuex'
import router from './router'
import initDirectives from './directives'
import initComponents from './components'

Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(VueRouter)

initDirectives()
initComponents()

new Vue({
  router: router(),
  store: store()
}).$mount('#app')