<template>
  <div v-if="visible">
    <b-input-group size="sm">
        <b-form-input type="text"
                      name="provider-name"
                      placeholder="Provider name"
                      required
                      v-model="provider.name"></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" @click="updateProvider">Update</b-button>
          <b-button variant="danger" @click="visible=false">Cancel</b-button>
        </b-input-group-append>
      </b-input-group>
  </div>
</template>

<script>
import ProvidersService from '@/services/ProvidersService'

export default {
  name: 'editprovider',

  data () {
    return {
      provider: {
        id: '',
        name: ''
      },
      visible: false
    }
  },

  methods: {
    show (provider) {
      this.provider.id = provider._id
      this.provider.name = provider.name
      this.visible = true
    },

    async updateProvider () {
      let response
      try {
        response = await ProvidersService.updateProvider(this.provider)
      } catch (e) {
        this.$swal('Oops', 'Something went wrong :(', 'error')
      }
      if (response.status === 200) {
        this.$swal('Great!', 'Provider has been updated!', 'success')
        this.$root.$emit('providersListChanged')
        this.visible = false
      }
    }
  }
}
</script>
