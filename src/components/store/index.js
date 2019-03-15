import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
let defaultCode = ''
try {
  if (localStorage.tokenmine) {
    defaultCode = localStorage.tokenmine
  }
} catch (e) {}
export default new Vuex.Store({

  state: {
    token: defaultCode,
  },
  mutations: {
    getCode(tokenmine) {
      state.token = tokenmine
      try {
        localStorage.tokenmine = tokenmine
      } catch (e) {}

    }
  }

})
