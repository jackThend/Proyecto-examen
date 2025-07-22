import { createRouter, createWebHistory } from 'vue-router'
import CalculoView from '../views/CalculoView.vue'
import RegistroView from '../views/RegistroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'calculo',
      component: CalculoView
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView
    }
  ]
})

export default router