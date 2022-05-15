import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/bulk',
    children:[{
      path: '/bulk',
      name: 'Bulk',
      component: ()=>import('../views/Bulk'),
    },{
      path: '/bulkorder',
      name: 'BulkOrder',
      component: ()=>import('../views/BulkOrder'),
    }]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
