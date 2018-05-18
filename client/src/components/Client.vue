<template>
  <b-modal v-model="showModal" size="lg" busy centered title="Client">
    <b-container class="container">
      <b-form ref="form">
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
      </b-form>
    </b-container>
    <div slot="modal-footer" class="w-100">
        <b-button variant="primary" @click="sumbitForm">{{ buttonText }}</b-button>
    </div>
  </b-modal>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import ClientsService from '@/services/ClientsService'

export default {
  name: 'client',

  data () {
    return {
      id: '',
      name: '',
      email: '',
      phone: '',
      showModal: false,
      buttonText: ''
    }
  },

  methods: {
    open (client) {
      this.setData(client)
      this.buttonText = typeof this.id === 'undefined' ? 'Add client' : 'Update client'
      this.showModal = true
    },

    setData (client) {
      this.id = client._id
      this.name = client.name
      this.email = client.email
      this.phone = client.phone
      this.$refs.providersList.selected = client.providers
    },

    async sumbitForm () {
      let form = this.$refs.form

      if (!form.checkValidity()) {
        form.reportValidity()
        return
      }

      let client = {
        id: this.id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.$refs.providersList.selected.map(p => p._id)
      }
      let response = {}
      if (typeof client.id !== 'undefined') {
        response = await this.updateClient(client)
      } else {
        response = await this.addClient(client)
      }
      if (response.status === 200) {
        this.showModal = false
        this.$root.$emit('clientsListChanged')
      }
    },

    async addClient (client) {
      let response = await ClientsService.addClient(client)
      if (response.status === 200) {
        this.$swal(
          'Great!',
          `New client has been added!`,
          'success'
        )
      }
      return response
    },

    async updateClient (client) {
      let response = await ClientsService.updateClient(client)
      if (response.status === 200) {
        this.$swal(
          'Great!',
          `Client has been updated!`,
          'success'
        )
      }
      return response
    }
  }
}
</script>

<style type="text/css">
.container {
  width: 700px;
}

.form input {
  margin-bottom: 10px;
}

</style>