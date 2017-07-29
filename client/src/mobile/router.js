import VueRouter from 'vue-router'

import App from './pages/App/App.vue'
import Home from './pages/Home/Home.vue'
import Main from './pages/Main/Main.vue'
import NewBlog from './pages/NewBlog/NewBlog.vue'
import User from './pages/User/User.vue'
import Search from './pages/Search/Search.vue'
import Signin from './pages/Signin/Signin.vue'
import Signup from './pages/Signup/Signup.vue'
import NotFound from './pages/NotFound/NotFound.vue'
import Profile from './pages/Profile/Profile.vue'

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
          name: 'NewBlog',
          path: 'newBlog',
          component: NewBlog
        },
        {
          name: 'User',
          path: 'user/:userId',
          component: User
        },
        {
          name: 'Profile',
          path: 'setting/profile',
          component: Profile
        },
        {
          name: 'Search',
          path: 'search',
          component: Search
        },
        {
          path: '*',
          component: NotFound
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
