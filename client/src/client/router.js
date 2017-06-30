import VueRouter from 'vue-router'

import App from './pages/App/App.vue'
import Home from './pages/Home/Home.vue'
// import Case from './pages/Case'
// import Team from './pages/Team'
// import User from './pages/User'
import Signin from './pages/Signin/Signin.vue'
import Signup from './pages/Signup/Signup.vue'
// import Activity from './pages/Activity'
// import NotFound from './pages/NotFound'
// import Classroom from './pages/Classroom'
// import Superiority from './pages/Superiority'

export default () => new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          name: 'Home',
          path: '',
          component: Home
        },
        {
          path: 'signup',
          component: Signup
        },
        {
          path: 'signin',
          component: Signin
        }
      ]
    },
    // {
    //   path: '/case',
    //   component: Case
    // },
    // {
    //   path: '/team',
    //   component: Team
    // },
    // {
    //   path: '/classroom',
    //   component: Classroom
    // },
    // {
    //   path: '/superiority',
    //   component: Superiority
    // },
    // {
    //   path: '/activity',
    //   component: Activity
    // },
    // {
    //   path: '/user',
    //   component: User
    // },
    // {
    //   path: '*',
    //   component: NotFound
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
