<template>
  <div>
    <b-form class="form">
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
      ProvidersService.addProvider({ name: this.name })
        .then(() => {
          this.$root.$emit('providersListChanged')
          this.$swal(
            'Done',
            `New provider has been added!`,
            'success'
          )
        })
      this.name = ''
    }
  }
}

</script>

<style scoped>
</style>
