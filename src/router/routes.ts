import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'usuaris', component: () => import('pages/UsuariList.vue') },
      { path: 'usuari/:id', component: () => import('pages/UsuariForm.vue') },
      { path: 'scripts', component: () => import('pages/Scripts.vue') },
      { path: 'login', component: () => import('app_common/Login.vue'), props: { urlRedirect: "/usuaris" } },
      { path: 'logout', component: () => import('app_common/Logout.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
