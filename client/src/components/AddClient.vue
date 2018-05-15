<template>
  <div class="posts">
    <h1>Add Post</h1>
      <div class="form">
        <div>
          <input type="text" name="name" placeholder="Name" v-model="name">
        </div>
        <div>
          <input type="email" name="email" placeholder="Email" v-model="email">
        </div>
        <div>
          <input type="phone" name="phone" placeholder="Phone" v-model="phone">
        </div>
        <div>
          <button class="btn" @click="addClient">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import ClientsService from '@/services/ClientsService'
export default {
  name: 'addclient',
  data () {
    return {
      name: '',
      email: '',
      phone: ''
    }
  },
  methods: {
    async addClient () {
      await ClientsService.addClient({
        name: this.name,
        email: this.email,
        phone: this.phone
      })
      this.$swal(
        'Great!',
        `New client has been added!`,
        'success'
      )
      this.$router.push({ name: 'Clients' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.btn{
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
