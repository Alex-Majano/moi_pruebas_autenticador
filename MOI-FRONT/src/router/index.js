import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { routesAuth } from '@/router/auth.routes.js';
import { routesUsers } from '@/router/users.routes.js';
import { sesionStorage } from '@/store/sesion.js';
import { toRefs } from 'vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    // meta: {
    //     breadcrumb: { name: 'Inicio' }
    // },
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          breadcrumb: { name: 'Inicio' }
        },
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: '/pages/empty',
        name: 'empty'
        // component: () => import('@/views/pages/Common/Empty.vue')
      },
      {
        path: '/perfil',
        name: 'profile',
        meta: {
          breadcrumb: { name: 'Perfil' }
        }
        // component: () => import('@/views/users/PerfilView.vue')
      },
      ...routesUsers
    ]
  },
  ...routesAuth,
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    meta: { unrequiredAuth: true },
    component: () => import('@/views/pages/notFound.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  document.title = to.meta.title || import.meta.env.VITE_APP_TITLE;
});

router.beforeEach(async (to, from, next) => {
  const sessionStorage = sesionStorage();
  const { token } = toRefs(sessionStorage);
  if (token.value) {
    // Si el usuario está autenticado y trata de ir a la página de login, redirigir a home
    to.name === 'login' ? next({ name: 'home' }) : next();
  } else {
    // si la página no requiere autenticación redirigir
    if (to.meta.unrequiredAuth) next();
    // Si el usuario no está autenticado y trata de ir a cualquier página redirigir a login
    else next({ name: 'login' });
  }
});

export default router;
