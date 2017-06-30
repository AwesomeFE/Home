import VueRouter from 'vue-router'

import Home from './pages/Dashboard/Home'
import Web from './pages/Dashboard/Web'
import WebNew from './pages/Dashboard/WebNew'
import Staff from './pages/Dashboard/Staff'
import StaffNew from './pages/Dashboard/StaffNew'
import Locations from './pages/Dashboard/Locations'
import Signin from './pages/Signin'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'

export default () => new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        { path: '', component: Home },
        { path: 'web', component: Web },
        { path: 'web/new', component: WebNew },
        { path: 'settings/staff', component: Staff },
        { path: 'settings/staff/new', component: StaffNew },
        { path: 'settings/locations', component: Locations }
      ]
    },
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
