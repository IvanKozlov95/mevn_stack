import Api from '@/services/Api'

export default {
  fetchClients () {
    return Api().get('clients')
  },

  addClient (params) {
    return Api().post('clients/add', params)
  },

  deleteClient (params) {
    return Api().delete('clients/' + params.id)
  }
}
