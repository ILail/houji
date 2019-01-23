/*
 * Created by yuwenjing on 18/12/13.
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
    },
    SET_KEEP_ALIVE: (state, keepAlive) => {
      state.keepAlive = keepAlive
    }
  },
  getters: {
    keepAlive: state => state.keepAlive
  }
})

