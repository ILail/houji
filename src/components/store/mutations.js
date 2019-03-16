export default {
  addIncrement(state,addIncrement) {
        state.token = addIncrement.getCode
        state.openid = addIncrement.openid
        state.accessToken = addIncrement.accessToken
        try {
          localStorage.token = state.token
          localStorage.openid = state.openid 
          localStorage.accessToken = state.accessToken 
        } catch (e) {}
  
      },

      // accessToken(state,accessToken) {
      //   state.token = accessToken
      //   try {
      //     localStorage.accessToken = accessToken
      //   } catch (e) {}
  
      // },

      // getCode(state,openid) {
      //   state.token = openid
      //   try {
      //     localStorage.openid = openid
      //   } catch (e) {}
  
      // }
}