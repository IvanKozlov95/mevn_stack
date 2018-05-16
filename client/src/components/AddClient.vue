<template>
  <div class="clients">
    <h1>Add Client</h1>
      <div class="form">
        <div class="wrap">
          <input type="text" name="name" placeholder="Name" v-model="name">
        </div>
        <div class="wrap">
          <input type="email" name="email" placeholder="Email" v-model="email">
        </div>
        <div class="wrap">
          <input type="phone" name="phone" placeholder="Phone" v-model="phone">
        </div>
        <div class="multiselect-wrap">
          <multiselect
            v-model="selectedProviders"
            :options="providers"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :hide-selected="true"
            :preserve-search="true" 
            placeholder="Providers"
            label="name"
            track-by="_id"
            :preselect-first="true">
          </multiselect>
        </div>
        <div class="wrap">
          <button class="btn" @click="addClient">Add</button>
        </div>
      </div>
    <addprovider ref="addProviderModal"></addprovider>
  </div>
</template>

<script>
import ClientsService from '@/services/ClientsService'
import ProvidersService from '@/services/ProvidersService'

export default {
  name: 'addclient',

  data () {
    return {
      name: '',
      email: '',
      phone: '',
      selectedProviders: [],
      providers: [],
    }
  },

  mounted () {
    this.getProviders()
    this.$root.$on('addprovider-modal-close', () => this.getProviders())
  },

  methods: {
    async addClient () {
      await ClientsService.addClient({
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.selectedProviders.map(p => p._id)
      })
      this.$swal(
        'Great!',
        `New client has been added!`,
        'success'
      )
      this.$router.push({ name: 'Clients' })
    },

    async getProviders () {
      const response = await ProvidersService.fetchProviders()
      this.providers = response.data.providers
    },

    showAddProviderModal () {
      this.$refs.addProviderModal.open()
    }
  }
}
</script>

<style type="text/css">
.form input, .form textarea, .form table {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}

.form div.wrap {
  margin: 20px;
}

div .table-wrap {
  margin: 0 auto;
  padding: 0px;
  text-align: center;
}
div .table-wrap table {
  margin: 0 auto;
}

.table-footer {
  padding-top: 10px;
}

.btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 495px;
  border: none;
  cursor: pointer;
}

div .multiselect-wrap {
  width: 520px;
  margin: 0 auto;
}

div .multiselect__select {
  margin-top: 0px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
