import VueRouter from 'vue-router'

export default () => new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./pages/App/App.vue'),
      children: [
        {
          name: 'Home',
          path: '',
          component: () => import('./pages/Home/Home.vue')
        },
        {
          name: 'Signup',
          path: 'signup',
          component: () => import('./pages/Signup/Signup.vue')
        },
        {
          name: 'Signin',
          path: 'signin',
          component: () => import('./pages/Signin/Signin.vue')
        },
        {
          name: 'Main',
          path: 'main',
          component: () => import('./pages/Main/Main.vue')
        },
        {
          name: 'BlogNew',
          path: 'blogNew',
          component: () => import('./pages/BlogNew/BlogNew.vue')
        },
        {
          name: 'BlogDetail',
          path: 'blog/:blogId',
          component: () => import('./pages/BlogDetail/BlogDetail.vue')
        },
        {
          name: 'User',
          path: 'user/:userId',
          component: () => import('./pages/User/User.vue')
        },
        {
          name: 'Profile',
          path: 'setting/profile',
          component: () => import('./pages/Profile/Profile.vue')
        },
        {
          name: 'Search',
          path: 'search',
          component: () => import('./pages/Search/Search.vue')
        },
        {
          path: '*',
          component: () => import('./pages/NotFound/NotFound.vue')
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
