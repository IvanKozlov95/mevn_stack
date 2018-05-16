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
        <b-table striped
               bordered
               :items="providers"
               :fields="providersDisplayFileds">
        <template slot="name" slot-scope="data">
          <b-form-checkbox v-model="providers[data.index].selected"
                           value="true"
                           unchecked-value=false>{{ data.item.name }}</b-form-checkbox>
        </template>
        <template slot="actions" slot-scope="data">
          <b-btn size="sm" @click="editProvider(data.item)">Edit</b-btn>
          <b-btn size="sm" @click="deleteProvider(data.item._id)">Delete</b-btn>
        </template>
        </b-table>
        <b-button type="submit" variant="primary">Add client</b-button>
      </b-form>
       <b-row>
          <b-col>
            <!-- <b-form-input type="text" name="client-name" placeholder="Name" v-model="name"></b-form-input> -->
          </b-col>
        </b-row>
  </b-container>
</template>

<script>
import ClientsService from '@/services/ClientsService'
import ProvidersService from '@/services/ProvidersService'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'addclient',

  data () {
    return {
      asd: true,
      name: '',
      email: '',
      phone: '',
      providersDisplayFileds: [ 'name', 'actions' ],
      providers: []
    }
  },

  mounted () {
    this.getProviders()
    this.$root.$on('providersListChanged', () => this.getProviders())
  },

  methods: {
    async addClient (evt) {
      evt.preventDefault()
      await ClientsService.addClient({
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.providers.filter(p => p.selected === 'true').map(p => p._id)
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
    },

    editProvider () {

    },

    async deleteProvider (id) {
      console.log(id)
      if (typeof id !== 'undefined') {
        await ProvidersService.deleteProvider({ id: id })
        this.$root.$emit('providersListChanged')
      }
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
