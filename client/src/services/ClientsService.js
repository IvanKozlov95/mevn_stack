import Api from '@/services/Api'

export default {
  fetchClients () {
    return Api().get('clients')
  },

  addClient (params) {
    return Api().post('clients/add', params)
  }

  // updatePost (params) {
  //   return Api().put('posts/' + params.id, params)
  // },

  // getPost (params) {
  //   return Api().get('post/' + params.id)
  // },

  // deletePost (id) {
  //   return Api().delete('posts/' + id)
  // }
}
