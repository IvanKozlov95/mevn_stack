import Vue from 'vue'
import Router from 'vue-router'
import Clients from '@/components/Clients'
import AddClient from '@/components/AddClient'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
    {
      path: '/clients/add',
      component: AddClient,
      name: 'addclient'
    }
  ]
})
