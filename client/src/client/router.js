import VueRouter from 'vue-router'

import App from './pages/App/App.vue'
import Home from './pages/Home/Home.vue'
import Main from './pages/Main/Main.vue'
import Signin from './pages/Signin/Signin.vue'
import Signup from './pages/Signup/Signup.vue'
import NotFound from './pages/NotFound/NotFound.vue'
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
          name: 'Signup',
          path: 'signup',
          component: Signup
        },
        {
          name: 'Signin',
          path: 'signin',
          component: Signin
        },
        {
          name: 'Main',
          path: 'main',
          component: Main
        },
        {
          path: '*',
          component: NotFound
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
      return {x: 0, y: 0}
    }
  }
})
