import { createRouter, createWebHistory } from 'vue-router';
import Taches from '../components/Taches.vue';
import TacheDetail from '../components/TacheDetail.vue';
import TacheForm from '../components/TacheForm.vue';
import UserList from '../components/UserList.vue';
import UserForm from '../components/UserForm.vue';

const routes = [
  {
    path: '/taches',
    name: 'Taches',
    component: Taches
  },
  {
    path: '/taches/TacheDetail',
    name: 'TacheDetail',
    component: TacheDetail
  },
  {
    path: '/taches/TacheForm',
    name: 'TacheForm',
    component: TacheForm
  },
  {
    path: '/utilisateurs',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/utilisateurs/nouveau',
    name: 'UserForm',
    component: UserForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
