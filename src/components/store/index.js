import Vuex from 'vuex'
import Vue from 'vue'
// import state from './state'
// import mutations from './mutations'
Vue.use(Vuex)

let defaultToken = ''
let defaultOpenid = ''
let defaultAccess = ''
// let defaultsub = 0
try {
  if (localStorage.tokens) {
    defaultToken = localStorage.tokens
  }
  if (localStorage.openids) {
    defaultOpenid = localStorage.openids
  }

  if (localStorage.accessTokens) {
    defaultAccess = localStorage.accessTokens
  }


} catch (e) {}
export default new Vuex.Store({
  state: {
    token: defaultToken,
    openid: defaultOpenid,
    accessToken: defaultAccess,
  },
  // actions:{
  //   getCode(ctx,tokenmine){
  //     console.log(tokenmine)
  //   }
  // },
  mutations: {
    addIncrement(state, addIncrement) {
      console.log(addIncrement)
      state.token = addIncrement.tokens
      state.openid = addIncrement.openids
      state.accessToken = addIncrement.accessTokens

      try {
        localStorage.tokens = addIncrement.tokens
        localStorage.openids = addIncrement.openids
        localStorage.accessTokens = addIncrement.accessTokens

      } catch (e) {}

    },
  }

})
