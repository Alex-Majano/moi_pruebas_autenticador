export const routesAuth = [
  {
    path: '/',
    name: 'auth',
    meta: { unrequiredAuth: true, breadcrumb: { name: 'SIUS' } },
    children: [
      {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue')
      },
      {
        path: '/auth/access',
        name: 'accessDenied',
        component: () => import('@/views/pages/forbidden.vue')
      },
      // {
      //   path: '/auth/forget-password',
      //   name: 'forgetPassword',
      //   component: () => import('@/views/pages/auth/ForgetPassword.vue')
      // },
      // {
      //   path: '/auth/reestablecer-password/:token',
      //   name: 'restorePassword',
      //   component: () => import('@/views/pages/auth/RestorePassword.vue')
      // }
    ]
  }
];
