import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    token: localStorage.getItem('token')
  },
  mutations: {
  },
  actions: {
    async login(_, payload) {
      try {
        await axios
          .post(`${process.env.VUE_APP_API_URL}/oauth/token`, {
            grant_type: process.env.VUE_APP_API_GRANT_TYPE,
            client_id: process.env.VUE_APP_API_ID,
            client_secret: process.env.VUE_APP_API_KEY,
            username: payload[0],
            password: payload[1],
            scope: "*"
          })
          .then((response) => {
            localStorage.setItem('token', response.data.access_token)
          });
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    getters(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    }
  },
  modules: {
  }
})
