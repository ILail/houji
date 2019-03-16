import Vuex from 'vuex'
import Vue from 'vue'
// import state from './state'
// import mutations from './mutations'
Vue.use(Vuex)

let defaultToken = ''
let defaultOpenid = ''
let defaultAccess = ''
try {
  if (localStorage.addIncrement.getCode) {
    defaultToken = localStorage.addIncrement.getCode
  }
  if (localStorage.addIncrement.openid) {
    defaultOpenid = localStorage.addIncrement.openid
  }

  if (localStorage.addIncrement.accessToken) {
    defaultAccess = localStorage.addIncrement.accessToken
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
        localStorage.addIncrement.getCode = addIncrement.getCode
        localStorage.addIncrement.openid = addIncrement.openid
        localStorage.addIncrement.accessToken = addIncrement.accessToken
      } catch (e) {}

    },
  }

})
