import Vuex from 'vuex'
import Vue from 'vue'
// import state from './state'
// import mutations from './mutations'
Vue.use(Vuex)

let defaultToken = ''
let defaultOpenid = ''
let defaultAccess = ''
let defaultsub = 0
try {
  if (localStorage.getCode) {
    defaultToken = localStorage.getCode
  }
  if (localStorage.openid) {
    defaultOpenid = localStorage.openid
  }

  if (localStorage.accessToken) {
    defaultAccess = localStorage.accessToken
  }
  if (localStorage.subscribe) {
    defaultsub = localStorage.subscribe
  }

} catch (e) {}
export default new Vuex.Store({
  state: {
    token: defaultToken,
    openid: defaultOpenid,
    accessToken: defaultAccess,
    subscribe:defaultsub
  },
  // actions:{
  //   getCode(ctx,tokenmine){
  //     console.log(tokenmine)
  //   }
  // },
  mutations: {
    addIncrement(state, addIncrement) {
      console.log(addIncrement)
      state.token = addIncrement.getCode
      state.openid = addIncrement.openid
      state.accessToken = addIncrement.accessToken
      state.subscribe = addIncrement.subscribe
      try {
        localStorage.getCode = addIncrement.getCode
        localStorage.openid = addIncrement.openid
        localStorage.accessToken = addIncrement.accessToken
        localStorage.subscribe = addIncrement.subscribe
      } catch (e) {}

    },
  }

})
