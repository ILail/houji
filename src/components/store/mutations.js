export default {
    getCode(state,tokenmine) {
        state.token = tokenmine
        try {
          localStorage.tokenmine = tokenmine
        } catch (e) {}
  
      },

      accessToken(state,accessToken) {
        state.token = accessToken
        try {
          localStorage.accessToken = accessToken
        } catch (e) {}
  
      },

      getCode(state,openid) {
        state.token = openid
        try {
          localStorage.openid = openid
        } catch (e) {}
  
      }
}