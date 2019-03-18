// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'styles/reset.css'
import 'styles/common.css'
import fastClick from 'fastclick'
// import axios from 'axios';
import LyTab from 'ly-tab';
import store from '@/components/vuex/store'
// import store from '@/components/store/index'
import clipper from '../static/clipper'
// import wx from 'weixin-js-sdk';
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
// Vue.prototype.$wx = wx;
// bus
import VueBus from 'vue-bus';
Vue.use(VueBus);
// 复制
import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;
// vant
import {
  Tab,
  Tabs
} from "vant";
import {
  Toast
} from "vant";
import {
  Popup
} from "vant";
import {
  PullRefresh
} from 'vant';
import {
  List
} from 'vant';
import {
  Loading
} from 'vant';
import {
  Swipe,
  SwipeItem
} from "vant";

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import {
  Lazyload
} from 'vant';
import VueTouch from 'vue-touch'
VueTouch.config.swipe = {
  direction: 'horizontal'
};
Vue.use(VueTouch, {
  name: 'v-touch'
})
// options 为可选参数，无则不传
Vue.use(Lazyload, {
  preLoad: 1,
  error: require('@/assets/err2.png'),
  loading: require('@/assets/err2.png'),
  attempt: 1,
  throttleWait: 500
});
Vue.use(Swipe).use(SwipeItem);
Vue.use(Loading);
Vue.use(List);
Vue.use(PullRefresh);
Vue.prototype.$toast = Toast
Vue.use(Tab).use(Tabs);
Vue.use(Popup);
Vue.use(clipper)

Vue.use(require('vue-wechat-title'))
Vue.use(LyTab);
// Vue.prototype.$http = axios;
// 移动端点击延迟
fastClick.attach(document.body);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  data: {
    eventHub: new Vue(), // 使用集中的事件处理器,在任何组件调用事件发射、接受的方法
  }
})
