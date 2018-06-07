<template>
  <b-modal v-model="showModal" size="lg" busy centered title="Client">
    <b-container class="container">
      <b-form ref="form">
        <b-form-group label="Name:"
                      horizontal>
          <b-form-input type="text"
                        name="name"
                        placeholder="Name"
                        required
                        v-model="name">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Email:"
                      horizontal>
          <b-form-input type="email"
                        name="email"
                        placeholder="Email"
                        required
                        v-model="email">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Phone:"
                      horizontal>
          <b-form-input type="text"
                        name="phone"
                        placeholder="Phone"
                      required
                        v-model="phone">
          </b-form-input>
        </b-form-group>
      </b-form>
      <addprovider ref="addProviderModal"></addprovider>
      <providerslist ref="providersList"></providerslist>
    </b-container>
    <div slot="modal-footer" class="w-100">
      <b-row>
        <b-col>
          <div v-if="id">
            <b-button variant="danger" @click="e => deleteClient(id)">Delete client</b-button>
          </div>
        </b-col>
        <b-col></b-col>
        <b-col>
          <b-button @click="close">Cancel</b-button>
        <b-button variant="primary" @click="sumbitForm">{{ buttonText }}</b-button>
        </b-col>
      </b-row>
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

    close () {
      this.setData({})
      this.$refs.providersList.clear()
      this.showModal = false
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

      let onError = (err) => {
        const msg = err.response.data.message || 'Something went wrong :('
        this.$toasted.show('Oops ' + msg, {
          type: 'error',
          icon: 'error',
          duration: 1000
        })
      }

      let onSuccess = () => {
        this.$root.$emit('clientsListChanged')
        this.close()
      }

      let method = ''
      if (typeof client.id !== 'undefined') {
        method = 'updateClient'
      } else {
        method = 'addClient'
      }
      await this[method](client)
        .then(onSuccess, onError)
    },

    async addClient (client) {
      let response = await ClientsService.addClient(client)
      if (response.status === 200) {
        this.$toasted.show('New client has been added!', {
          type: 'success',
          icon: 'done',
          duration: 1000
        })
      }
      return response
    },

    async updateClient (client) {
      let response = await ClientsService.updateClient(client)
      if (response.status === 200) {
        this.$toasted.show('Client has been updated!', {
          type: 'success',
          icon: 'done',
          duration: 1000
        })
      }
      return response
    },

    async deleteClient (id) {
      id = id || this.id
      if (typeof id !== 'undefined') {
        let response = await ClientsService.deleteClient({ id: id })
        if (response.status === 200) {
          this.$toasted.show('Sad to see you clients flee. Try not to lose all of them', {
            type: 'info',
            icon: 'directions_walk',
            duration: 1000
          })
          this.$root.$emit('clientsListChanged')
          this.close()
        }
      }
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
