import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultCity = ''
try {
  if (localStorage.token) {
    defaultCity = localStorage.token
  }
} catch (e) {}
export default new Vuex.Store({
  state: {
    token: defaultCity
  },
  // actions: {
  //   changeCity (ctx, city) {
  //     ctx.commit('changeCity', city)
  //   }
  // },
  mutations: {
    changeToken (state, token) {
      state.token = token
      try {
        localStorage.token = token
      } catch (e) {}
    }
  }
})
