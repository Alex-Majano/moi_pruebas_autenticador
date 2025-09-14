export const routesUsers = [
  {
    path: '/',
    name: 'usuarios',
    meta: {
      breadcrumb: { name: 'Usuarios' }
    },
    children: [
      {
        path: '/usuarios',
        name: 'adminUsers',
        meta: {
          breadcrumb: { name: 'Gestionar usuario' }
        },
        component: () => import('@/views/users/UsersView.vue')
      },
      {
        path: '/usuarios/:id',
        name: 'detailUser',
        meta: {
          breadcrumb: { name: 'Actualizar usuario' }
        },
        component: () => import('@/views/users/UserDetail.vue')
      },
      {
        path: '/usuarios/permisos-modulos/:id',
        name: 'permisoUsers',
        meta: {
          breadcrumb: { name: 'Permisos de acceso al sistema' }
        },
        component: () => import('@/views/users/PermissionsUser.vue')
      },
      {
        path: '/rols/permisos-modulos/:id',
        name: 'permisoRols',
        meta: {
          breadcrumb: { name: 'Permisos de acceso al sistema' }
        },
        component: () => import('@/views/users/PermisionsRol.vue')
      },
    ]
  }
];
