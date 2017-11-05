import VueRouter from 'vue-router';

export default () => new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./pages/App'),
      children: [
        {
          name: 'PublicHome',
          path: '',
          component: () => import('./pages/PublicHome')
        },
        {
          name: 'Signup',
          path: 'signup',
          component: () => import('./pages/Signup')
        },
        {
          name: 'Signin',
          path: 'signin',
          component: () => import('./pages/Signin/Signin.vue')
        },
        {
          name: 'Home',
          path: 'home',
          component: () => import('./pages/Home')
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
          name: 'Settings',
          path: 'settings',
          component: () => import('./pages/User/User.vue')
        },
        {
          name: 'Profile',
          path: 'profile',
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
});
