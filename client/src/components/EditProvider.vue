<template>
  <div v-if="visible">
    <b-form ref="form">
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
    </b-form>
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
      let form = this.$refs.form

      if (!form.checkValidity()) {
        form.reportValidity()
        return
      }

      let onError = (err) => {
        const msg = err.response.data.message || 'Something went wrong :('
        this.$swal('Oops', msg, 'error')
      }

      let onSuccess = () => {
        this.visible = false
        this.$root.$emit('providersListChanged')
        this.$swal('Great', 'Provider has been updated!', 'success')
      }

      await ProvidersService.updateProvider(this.provider)
        .then(onSuccess, onError)
    }
  }
}
</script>
