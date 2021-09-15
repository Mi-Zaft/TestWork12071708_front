import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Crud/Index'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/services/create',
    name: 'ServicesCreate',
    component: () => import('../views/Crud/Create'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/services/edit/:id',
    name: 'ServicesEdit',
    component: () => import('../views/Crud/Edit'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && localStorage.getItem('token')) {
    
    if (to.fullPath == '/auth') {
      next('/')
    }
    next()
  } else if (requireAuth && !localStorage.getItem('token')) {
    next('/auth')
  } else {
    next()
  }
})

export default router
