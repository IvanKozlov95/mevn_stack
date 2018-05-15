import Api from '@/services/Api'

export default {
  fetchProviders () {
    return Api().get('providers')
  },

  addProvider (params) {
    return Api().post('providers/add', params)
  }
}
