/*
 * Created by yuwenjing on 18/12/13.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // 全局公用的数据
    token: '',
    // oppenId: null,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      console.log(data)
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = ''
    },
  
  },
 
})
