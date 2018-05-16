// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import VueMultiselect from 'vue-multiselect'
import VueSweetalert2 from 'vue-sweetalert2'
import AddProvider from '@/components/AddProvider'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VModal)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
Vue.component('addprovider', AddProvider)
Vue.component('multiselect', VueMultiselect)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
