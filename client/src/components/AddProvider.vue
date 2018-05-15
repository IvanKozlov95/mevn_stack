<template>
  <div>
    <modal name="addprovider-modal" @before-close="beforeClose">
      <h1> asdasdasd </h1>
      <input type="text" name="name" placeholder="Name" v-model="name">
      <button class="btn" @click="addProvider">Add provider</button>
    </modal>
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
      await ProvidersService.addProvider({ name: this.name })
    },

    open () {
      this.$modal.show('addprovider-modal')
    },

    beforeClose () {
      this.$root.$emit('addprovider-modal-close');
    }
  }
}

</script>
