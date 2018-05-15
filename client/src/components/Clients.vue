<template>
  <div class="client">
    <h1>Posts</h1>
    <h1> {{ clients.length }}</h1>
    <div v-if="clients.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addclient' }" class="link">Add Post</router-link>
      </div>
      <br/>
      <table>
        <tr>
          <td>Name</td>
          <td width="350">Email</td>
          <td width="200">Phone</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="client in clients" :key="client._id">
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td align="center">
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no clients... Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addclient' }" class="link">Add Post</router-link>
    </div>
  </div>
</template>

<script>
import ClientsService from '@/services/ClientsService'
export default {
  name: 'clients',
  data () {
    return {
      clients: []
    }
  },
  mounted () {
    this.getClients()
  },
  methods: {
    async getClients () {
      const response = await ClientsService.fetchClients()
      console.log(response.data.clients)
      this.clients = response.data.clients
    }
  }
}
</script>

<style type="text/css">
  .table-wrap {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  table th, table tr {
    text-align: left;
  }
  table thead {
    background: #f2f2f2;
  }
  table tr td {
    padding: 10px;
  }
  table tr:nth-child(odd) {
    background: #f2f2f2;
  }
  table tr:nth-child(1) {
    background: #4d7ef7;
    color: #fff;
  }
  a {
    color: #4d7ef7;
    text-decoration: none;
  }
  a.link {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
</style>
