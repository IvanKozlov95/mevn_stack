import Vue from 'vue'
import Router from 'vue-router'
import Clients from '@/components/Clients'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    }
  ]
})
