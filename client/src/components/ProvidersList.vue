<template>
  <div>
    <b-table striped
            bordered
            fixed
            :items="providers"
            :fields="providersDisplayFileds">
      <template slot="name" slot-scope="data" width="300">
        <b-form-checkbox v-model="data.item.selected"
                        :value=true
                        :unchecked-value=false
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
      providersDisplayFileds: [ 'name', 'actions' ]
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

  computed: {
    selected: {
      set: function (selected) {
        selected = selected || []
        if (this.providers) {
          this.providers = this.providers.map(p => {
            if (selected.find(sel => sel._id === p._id)) {
              p.selected = true
            } else {
              p.selected = false
            }
            return p
          })
        }
      },

      get: function () {
        return this.providers.filter(p => p.selected === true)
      }
    }
  },

  methods: {
    editProvider (provider) {
      this.$refs[provider._id + '_edit'].show(provider)
    },

    async getProviders () {
      const response = await ProvidersService.fetchProviders()
      let selectedProviders = this.providers.filter(p => p.selected)
      this.providers = response.data.providers
      this.selected = selectedProviders
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
