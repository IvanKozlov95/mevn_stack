<template>
  <b-container class="container">
    <h1>Clients</h1>
    <div v-if="clients.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addclient' }" class="link">Add client</router-link>
      </div>
      <br/>
      <b-table striped
               bordered
               :items="clients"
               :fields="displayFields">
        <template slot="providers" slot-scope="data">
          <span v-for="(p, idx) in data.item.providers" :key="p._id">
            {{ p.name }}<span v-if="idx + 1 !== data.item.providers.length">, </span>
          </span>
        </template>
        <template slot="actions" slot-scope="data">
          <b-btn size="sm" @click="editProvider(data.item)">Edit</b-btn>
          <b-btn size="sm" @click="deleteProvider(data.item._id)">Delete</b-btn>
        </template>
      </b-table>
    </div>
    <div v-else>
      There are no clients... Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addclient' }" class="link">Add Post</router-link>
    </div>
  </b-container>
</template>

<script>
import ClientsService from '@/services/ClientsService'
export default {
  name: 'clients',
  data () {
    return {
      clients: [],
      displayFields: [ 'name', 'email', 'phone', 'providers', 'actions' ]
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
  .container {
    width: 700px;
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
