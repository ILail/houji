import Vuex from 'vuex'
import Vue from 'vue'
// import state from './state'
// import mutations from './mutations'
Vue.use(Vuex)

let defaultToken = ''
let defaultOpenid = ''
let defaultAccess = ''
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

} catch (e) {}
export default new Vuex.Store({
  state: {
    token: defaultToken,
    openid: defaultOpenid,
    accessToken: defaultAccess
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
      try {
        localStorage.getCode = addIncrement.getCode
        localStorage.openid = addIncrement.openid
        localStorage.accessToken = addIncrement.accessToken
      } catch (e) {}

    },
  }

})
