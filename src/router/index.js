import Vue from 'vue'
import Router from 'vue-router'
import Small from '@/pages/home/Small'
import Addressdetail from '@/pages/home/Addressdetail'
// import Fs from '@/pages/fs/Fs'
import Centerj from '@/pages/home/centerj'
import Feilei from '@/pages/fs/Feilei'
import Shao from '@/pages/home/Shao'
import Xiao from '@/pages/home/Xiao'

import Wish from '@/pages/wish/Wish'
import Mine from '@/pages/mine/Mine'
import Peos from '@/pages/peos/Peos'
import Show from '@/components/search/Show'
import Search from '@/components/search/Search'
import Detail from '@/components/common/Detailswiper'
import Phone from '@/components/phone'
import Smoke from '@/pages/mine/smoke'
import Myjob from '@/pages/mine/Myjob'
import Fit from '@/pages/mine/fit'

import Personone from '@/pages/mine/personone'
import Desgreo from '@/pages/mine/desgreo'
import Absolu from '@/pages/mine/absolu'
import Zfu from '@/pages/mine/zfu'
import Gengph from '@/pages/mine/gengph'
import Shouhuo from '@/pages/mine/shouhuo'
import Tianjia from '@/pages/mine/tianjia'
import Liping from '@/pages/mine/liping'
import Juan from '@/pages/mine/juan'
import Myorders from '@/pages/mine/myorders'
import Mym from '@/pages/mine/mymoney'
import Czhi from '@/pages/mine/chongzhi'
import Txiana from '@/pages/mine/tixian'
import Jiaoyi from '@/pages/mine/jyi'
import bankMark from '@/pages/mine/bank'
import Confirmation from '@/components/common/Confirmation'
import Confirmations from '@/components/common/Confirmations'
import store from '@/components/vuex/store'
import * as types from '@/components/vuex/types'




Vue.use(Router)
// export default new Router({
const routes = [{
  path: '/',
  name: '猴集',
  component: Small,
}, {
  path: '/linjuan',
  name: '领卷中心',
  component: Centerj,
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
}, {
  path: '/feilei',
  name: '分类',
  component: Feilei
}, {
  path: '/shao',
  name: '扫一扫',
  component: Shao
}, {
  path: '/xiao',
  name: '消息中心',
  component: Xiao
}, {
  path: '/wishs',
  name: '心愿单',
  component: Wish,
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
}, {
  path: '/mines',
  name: '个人中心',
  component: Mine,
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
}, {
  path: '/peos',
  name: '花果山',
  component: Peos,
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
}, {
  path: '/search',
  name: '搜索',
  component: Search
}, {
  path: '/detail',
  name: '详情页',
  component: Detail
}, {
  path: '/addressdetail',
  name: '地址',
  component: Addressdetail
}, {
  path: '/show',
  name: '产品展示',
  component: Show
}, {
  path: '/phone',
  name: '绑定手机号',
  component: Phone
}, {
  path: '/smoke',
  name: '猴集卡',
  component: Smoke
}, {
  path: '/myjob',
  name: '我的项目',
  component: Myjob
}, {
  path: '/fit',
  name: '设置',
  component: Fit
}, {
  path: '/personone',
  name: '个人资料',
  component: Personone
}, {
  path: '/desgreo',
  name: '账号与安全',
  component: Desgreo
}, {
  path: '/absolu',
  name: '关于我们',
  component: Absolu
}, {
  path: '/zfu',
  name: '支付密码',
  component: Zfu
}, {
  path: '/gengph',
  name: '更改手机号',
  component: Gengph
}, {
  path: '/shouhuo',
  name: '收货地址',
  component: Shouhuo
}, {
  path: '/tianjia',
  name: '添加地址',
  component: Tianjia
}, {
  path: '/liping',
  name: '礼品卡',
  component: Liping
}, {
  path: '/juan',
  name: '优惠卷',
  component: Juan
}, {
  path: '/myorders',
  name: '我的订单',
  component: Myorders
}, {
  path: '/moneyall',
  name: '我的钱包',
  component: Mym
}, {
  path: '/chongzhi',
  name: '充值',
  component: Czhi
}, {
  path: '/tixian',
  name: '提现',
  component: Txiana
}, {
  path: '/jiaoyi',
  name: '交易记录',
  component: Jiaoyi
}, {
  path: '/yhkbd',
  name: '银行卡绑定',
  component: bankMark
}, {
  path: '/queren',
  name: '确认订单',
  component: Confirmation
}, , {
  path: '/querenone',
  name: '确认',
  component: Confirmations
}]
//缓存页面
const router = new Router({
  routes
});
// Vue.config.productionTip = false
// const sess = window.sessionStorage
// Vue.mixin({
//   beforeRouteLeave(to, from, next) {
//     console.log(to)
//     const toRouter = to.path
//     const fromRouter = from.path
//     const h = JSON.parse(sess.getItem(toRouter));
//     if (h && h.history) {
//       this.$destory()
//       next()
//     } else {
//       next()
//     }
//   }
// })
// const beforeEach = function (to, from, next) {
//   const toRouter = to.path
//   const fromRouter = from.path
//   const h = JSON.parse(sess.getItem(toRouter));
//   console.log(h)
//   if (h && h.history) {
//     h.history = false
//     sess.removeItem(toRouter)
//   } else {
//     sess.setItem(fromRouter || '/', JSON.stringify({
//       history: true
//     }))
//   }
//   next()
// }
// router.beforeEach(beforeEach)
// 页面刷新时，重新赋值token,用户名也在界面上展示



if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'));
}
// console.log(store.state.urlName)
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {

    if (store.state.token) {

      next();
    } else {
      next({
        path: '/phone'
      })
    }
  } else {
    next();
  }
})

export default router;
