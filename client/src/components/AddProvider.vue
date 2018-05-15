<template>
  <div>
    <modal name="addprovider-modal" @before-close="onClose">
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

  props: {
    onClose: Function
  },

  data () {
    return {
      name: ''
    }
  },

  methods: {
    async addProvider () {
      await ProvidersService.addProvider({ name: this.name })
    },
  }
}

</script>
