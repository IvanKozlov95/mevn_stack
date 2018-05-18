<template>
  <div>
    <b-table striped
            bordered
            fixed
            :items="providers"
            :fields="providersDisplayFileds">
      <template slot="name" slot-scope="data" width="300">
        <b-form-checkbox v-model="providers[data.index].selected"
                        value="true"
                        unchecked-value="false"
                        :id="data.item._id + '_name'">
          {{ data.item.name }}
        </b-form-checkbox>
        <editprovider :ref="data.item._id + '_edit'"></editprovider>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" @click="editProvider(data.item)">Edit</b-btn>
        <b-btn size="sm" @click="deleteProvider(data.item._id)">Delete</b-btn>
      </template>
    </b-table>
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
    editProvider (provider) {
      this.$refs[provider._id + '_edit'].show(provider)
    },

    setSelected (selected) {
      if (typeof selected !== 'undefined') {
        let newProviders = this.providers.map(p => {
          p.selected = 'false'
          let sel = selected.find(el => el._id === p._id)
          if (typeof sel !== 'undefined') {
            p.selected = 'true'
          }
          return p
        })
        this.providers = newProviders
      }
    },

    async getProviders () {
      const response = await ProvidersService.fetchProviders()
      if (this.providers) {
        let oldProviders = this.providers
        this.providers = response.data.providers
        for (let p of this.providers) {
          p.selected = 'false'
          let old = oldProviders.find(el => el._id === p._id)
          if (typeof old !== 'undefined') {
            p.selected = old.selected
          }
        }
      }
    },

    async updateProvider () {
      const response = await ProvidersService.updateProvider(this.current)
      if (response.status === 200) {
        this.getProviders()
        this.$swal('Great!', 'Provider has been added!', 'success')
      } else {
        this.$swal('Oops', 'Something went wrong :(', 'failure')
      }
    },

    async deleteProvider (id) {
      if (typeof id !== 'undefined') {
        await ProvidersService.deleteProvider({ id: id })
        this.getProviders()
      }
    }
  }
}
</script>

<style>

</style>
