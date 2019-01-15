// import Vue from 'vue';
// import Vuex from 'vuex';
// Vue.use(Vuex);

// export default new Vuex.Store({

//   state: {
//     // 存储token
//     Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
//   },
//   /* actions: {
//      changeLogin(ctx,Authorization){
//        ctx.commit('changeLogin',Authorization);
//      }
//    },*/
//   mutations: {
//     // 修改token，并将token存入localStorage
//     changeLogin(state, user) {
//       state.Authorization = user.Authorization;
//       console.log("store/index.js---到这里了!");
//       localStorage.setItem('Authorization', user.Authorization);
//     }
//   }
// });

/**
 * Created by yuwenjing on 17/9/13.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: null,
    urlName: null,
    keepAlive: []
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
        localStorage.token = data;
        state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.USERNAME]: (state, data) => {
        localStorage.urlName = data;
        state.urlName = data;
     
        // window.location.href = data
    },
    SET_KEEP_ALIVE: (state, keepAlive) => {
      state.keepAlive = keepAlive
    }
  },
  getters: {
    keepAlive: state => state.keepAlive
  }
})
// console.log(data)

