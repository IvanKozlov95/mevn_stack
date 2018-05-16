<template>
  <div>
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
    <modal name="edit-modal">
      <b-container class="container">
        <h1> Edit provider </h1>
        <input type="text" name="name" placeholder="Name" v-model="current.name">
        <b-button size="sm" variant="primary" @click="updateProvider">Update provider</b-button>
      </b-container>
    </modal>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ProvidersService from '@/services/ProvidersService'

export default {
  name: 'providerslist',

  data () {
    return {
      providers: [],
      providersDisplayFileds: [ 'name', 'actions' ],
      current: {}
    }
  },

  mounted () {
    this.getProviders()
    this.$root.$on('providersListChanged', () => this.getProviders())
  },

  methods: {
    async getProviders () {
      const response = await ProvidersService.fetchProviders()
      if (this.providers) {
        let oldProviders = this.providers
        this.providers = response.data.providers
        for (let p of this.providers) {
          p.selected = 'false'
          let old = oldProviders.find(el => el._id === p._id)
          console.log(old)
          if (typeof old !== 'undefined') {
            p.selected = old.selected
          }
        }
      }
    },

    updateProvider () {
      console.log('update provider')
    },

    editProvider (current) {
      this.current = {...current}
      this.$modal.show('edit-modal')
    },

    async deleteProvider (id) {
      if (typeof id !== 'undefined') {
        await ProvidersService.deleteProvider({ id: id })
        this.getProviders()
        // this.$root.$emit('providersListChanged')
      }
    }
  }
}
</script>

<style>

</style>
