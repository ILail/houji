// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'styles/reset.css'
import fastClick from 'fastclick'
import axios from 'axios';
import LyTab from 'ly-tab';
import store from '@/components/vuex/store'
import clipper from '../static/clipper'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(clipper)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '@/assets/err2.png',
})
Vue.use(require('vue-wechat-title'))
Vue.use(LyTab);
Vue.prototype.$http = axios;
// 移动端点击延迟
fastClick.attach(document.body);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  data: {
    eventHub: new Vue(),
    eventHuC: new Vue()// 使用集中的事件处理器,在任何组件调用事件发射、接受的方法
  }
})
