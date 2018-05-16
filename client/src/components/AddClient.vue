<template>
  <b-container class="container">
    <h1>Add Client</h1>
      <b-form class="form" @submit="addClient">
        <b-form-group>
          <b-form-input type="text"
                        name="name"
                        placeholder="Name"
                        required
                        v-model="name">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="email"
                        name="email"
                        placeholder="Email"
                        required
                        v-model="email">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text"
                        name="phone"
                        placeholder="Phone"
                        required
                        v-model="phone">
          </b-form-input>
        </b-form-group>
        <addprovider ref="addProviderModal"></addprovider>
        <providerslist ref="providersList"></providerslist>
        <b-button variant="primary" @click="addClient">Add client</b-button>
      </b-form>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import ClientsService from '@/services/ClientsService'

export default {
  name: 'addclient',

  data () {
    return {
      name: '',
      email: '',
      phone: ''
    }
  },

  methods: {
    async addClient (evt) {
      evt.preventDefault()
      await ClientsService.addClient({
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.$refs.providersList.providers
          .filter(p => p.selected === 'true')
          .map(p => p._id)
      })
      this.$swal(
        'Great!',
        `New client has been added!`,
        'success'
      )
      this.$router.push({ name: 'Clients' })
    }
  }
}
</script>

<style type="text/css">
.container {
  width: 500px;
}

.form input {
  margin-bottom: 10px;
}

</style>
