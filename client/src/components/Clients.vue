<template>
  <b-container>
    <h1>Clients</h1>
    <div v-if="clients.length > 0" class="table-wrap">
      <br/>
      <b-table striped
               bordered
               fixed
               :items="clients"
               :fields="displayFields">
        <template slot="providers" slot-scope="data">
          <span v-for="(p, idx) in data.item.providers" :key="p._id">
            {{ p.name }}<span v-if="idx + 1 !== data.item.providers.length">, </span>
          </span>
        </template>
        <template slot="actions" slot-scope="data">
          <b-btn size="sm" @click="editClient(data.item)">Edit</b-btn>
          <b-btn size="sm" @click="deleteClient(data.item._id)">Delete</b-btn>
        </template>
      </b-table>
    </div>
    <div v-else>
      There are no clients... Lets add one now <br /><br />
    </div>
    <b-btn variant="primary" @click="editClient({})">Add client</b-btn>
    <client ref="client"></client>
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
    this.$root.$on('clientsListChanged', () => this.getClients())
  },

  methods: {
    async getClients () {
      const response = await ClientsService.fetchClients()
      this.clients = response.data.clients
    },

    editClient (client) {
      this.$refs.client.open(client)
    },

    deleteClient (id) {
      this.$refs.client.deleteClient(id)
    }
  }
}
</script>

<style type="text/css">
  .container {
    width: 70%;
  }

  th, td {
    word-wrap: break-word;
  }

  table button {
    margin: 5 auto;
  }
</style>
