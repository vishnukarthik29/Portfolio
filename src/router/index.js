import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Main from '../main.vue'
import Aboutme from '@/views/Aboutme.vue'
import Projects from '@/views/Projects.vue'
import Contact from '@/views/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '',
          component: HomeView,
        },
        {
          path: '/about',
          component: Aboutme,
        },
        {
          path: '/Projects',
          component: Projects,
        },
        {
          path: '/Contact',
          component: Contact,
        },
      ],
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/about',
    //   name: 'aboutme',
    //   component: Aboutme,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
