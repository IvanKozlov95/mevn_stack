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
        <div class="table-wrap">
          <table>
            <tr>
              <td>Name</td>
              <td>Add</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
            <tr v-for="provider in providers" :key="provider._id">
              <td>{{ provider.name }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4" class="table-footer">
                <router-link v-bind:to="{ name: 'addprovider' }" class="link">Add Provider</router-link>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <button class="btn" @click="addClient">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import ClientsService from '@/services/ClientsService'
import ProvidersService from '@/services/ProvidersService'
export default {
  name: 'addclient',
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      selectedProviders: [],
      providers: []
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
    },
    async getProviders () {
      const response = await ProvidersService.fetchProviders()
      this.providers = response.data.providers
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea, .form table {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}

div .table-wrap {
  margin: 0 auto;
  text-align: center;
}

div .table-wrap table {
  margin: 0 auto;
}

.table-footer {
  padding-top: 10px;
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
