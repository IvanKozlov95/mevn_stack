// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import BootstrapVue from 'bootstrap-vue'
import VueMultiselect from 'vue-multiselect'
import Toasted from 'vue-toasted'
import Client from '@/components/Client'
import AddProvider from '@/components/AddProvider'
import EditProvider from '@/components/EditProvider'
import ProvidersList from '@/components/ProvidersList'

Vue.use(VModal)
Vue.use(BootstrapVue)
Vue.use(Toasted, {
  iconPack: 'material'
})
Vue.component('client', Client)
Vue.component('addprovider', AddProvider)
Vue.component('editprovider', EditProvider)
Vue.component('multiselect', VueMultiselect)
Vue.component('providerslist', ProvidersList)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
