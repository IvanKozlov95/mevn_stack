<template>
  <div>
    <b-form class="form">
      <b-form-group>
        <b-input-group>
            <b-form-input type="text"
                          name="provider-name"
                          placeholder="Provider name"
                          required
                          v-model="name"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="addProvider">Add provider</b-button>
            </b-input-group-append>
          </b-input-group>
      </b-form-group>
    </b-form>
    <!-- <modal name="addprovider-modal" @before-close="beforeClose">
      <h1> asdasdasd </h1>
      <input type="text" name="name" placeholder="Name" v-model="name">
      <button class="btn" @click="addProvider">Add provider</button>
    </modal> -->
  </div>
</template>

<script>
import ProvidersService from '@/services/ProvidersService'

export default {
  name: 'addprovider',

  data () {
    return {
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
