<template>
  <div>
    <b-form ref="form">
      <b-form-group label="Providers:"
                    horizontal>
        <b-input-group>
            <b-form-input type="text"
                          name="provider-name"
                          placeholder="Provider name"
                          required
                          v-model="name"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="addProvider">{{ buttonText }}</b-button>
            </b-input-group-append>
          </b-input-group>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import ProvidersService from '@/services/ProvidersService'

const addProviderText = 'Add provider'

export default {
  name: 'addprovider',

  data () {
    return {
      buttonText: addProviderText,
      name: ''
    }
  },

  methods: {
    async addProvider () {
      let form = this.$refs.form

      if (!form.checkValidity()) {
        form.reportValidity()
        return
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
        this.name = ''
        this.$root.$emit('providersListChanged')
        this.$toasted.show('New provider has been added!', {
          type: 'success',
          icon: 'done',
          duration: 1000
        })
      }

      await ProvidersService.addProvider({ name: this.name })
        .then(onSuccess, onError)
    }
  }
}

</script>
