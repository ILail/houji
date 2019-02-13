import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Small from '@/pages/home/Small'
import Addressdetail from '@/pages/home/components/Addressdetail'
import Centerj from '@/pages/home/components/centerj'
import Shao from '@/pages/home/components/Shao'
import Xiao from '@/pages/home/components/Xiao'

// 分类
import Feilei from '@/pages/fs/Feilei'

// 购物车
import Wish from '@/pages/wish/Wish'

// 我的中心
import Mine from '@/pages/mine/Mine'

// 我的中心点击的页面
import Absolu from '@/pages/mine/components/components/absolu'
import bankMark from '@/pages/mine/components/components/bank'
import Czhi from '@/pages/mine/components/components/chongzhi'
import Desgreo from '@/pages/mine/components/components/desgreo'
import Fit from '@/pages/mine/components/components/fit'
import Gengph from '@/pages/mine/components/components/gengph'
import Juan from '@/pages/mine/components/components/juan'
import Jiaoyi from '@/pages/mine/components/components/jyi'
import Liping from '@/pages/mine/components/components/liping'
import Myjob from '@/pages/mine/components/components/Myjob'
import Mym from '@/pages/mine/components/components/mymoney'
import Myorders from '@/pages/mine/components/components/myorders'
import Personone from '@/pages/mine/components/components/personone'
import Shouhuo from '@/pages/mine/components/components/shouhuo'
import Tianjia from '@/pages/mine/components/components/tianjia'
import Txiana from '@/pages/mine/components/components/tixian'
import Zfu from '@/pages/mine/components/components/zfu'

// 手机登录
import Phone from '@/components/phone'

//商品详情页
import Detail from '@/components/common/Detailswiper'

// 领取会员
import Sale from '@/components/common/Sale'
// 支付完成跳转
import Finish from '@/components/common/Finish'

// 订单详情页
import Orderdetails from '@/components/common/Orderdetails'
// 物流页面
import Wuliudetails from '@/components/common/Logistics'

import Jdetial from '@/components/common/Jdetial'
// 活动详情页
import Hdetial from '@/components/common/Hdetial'

// 支付页面
import Zhifu from '@/components/common/Paymoney'
import Zhifuone from '@/components/common/Paymoneyone'
// 搜索页 及其 展示
import Show from '@/components/search/Show'
import Search from '@/components/search/Search'

// 支付详情页
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
    meta: {
      oppendid: true,
    },
  },
  {
    path: '/linjuan',
    name: '领卷中心',
    component: Centerj,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/wishs',
    name: '购物车',
    component: Wish,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      oppendid: true,
    },
  },
  {
    path: '/mines',
    name: '个人中心',
    component: Mine,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      oppendid: true,
    },
  },
  {
    path: '/feilei',
    name: '分类',
    component: Feilei,
    meta: {
      oppendid: true,
    },
  },
  {
    path: '/shao',
    name: '扫一扫',
    component: Shao
  },
  {
    path: '/xiao',
    name: '消息中心',
    component: Xiao
  },
  {
    path: '/jioayid',
    name: '交易详情',
    component: Jdetial
  },
  {
    path: '/hdetial',
    name: '活动专区',
    component: Hdetial
  },
  {
    path: '/search',
    name: '搜索',
    component: Search
  },
  {
    path: '/detail',
    name: '详情页',
    component: Detail,
  },
  {
    path: '/addressdetail',
    name: '地址',
    component: Addressdetail
  },
  {
    path: '/show',
    name: '产品展示',
    component: Show
  },
  {
    path: '/phone',
    name: '绑定手机号',
    component: Phone
  },
  {
    path: '/myjob',
    name: '我的项目',
    component: Myjob
  },
  {
    path: '/fit',
    name: '设置',
    component: Fit
  }, {
    path: '/personone',
    name: '个人资料',
    component: Personone
  },
  {
    path: '/desgreo',
    name: '账号与安全',
    component: Desgreo
  },
  {
    path: '/absolu',
    name: '关于我们',
    component: Absolu
  },
  {
    path: '/zfu',
    name: '支付密码',
    component: Zfu
  },
  {
    path: '/gengph',
    name: '更改手机号',
    component: Gengph
  },
  {
    path: '/shouhuo',
    name: '收货地址',
    component: Shouhuo
  },
  {
    path: '/tianjia',
    name: '添加地址',
    component: Tianjia
  },
  {
    path: '/liping',
    name: '礼品卡',
    component: Liping
  },
  {
    path: '/juan',
    name: '优惠卷',
    component: Juan
  },
  {
    path: '/myorders',
    name: '我的订单',
    component: Myorders
  },
  {
    path: '/moneyall',
    name: '我的钱包',
    component: Mym
  },
  {
    path: '/chongzhi',
    name: '充值',
    component: Czhi
  }, {
    path: '/zhifu',
    name: '支付',
    component: Zhifu
  },
  {
    path: '/zhifuone',
    name: '支付',
    component: Zhifuone
  },
  {
    path: '/tixian',
    name: '提现',
    component: Txiana
  }, {
    path: '/finish',
    name: '支付完成',
    component: Finish
  },
  {
    path: '/jiaoyi',
    name: '交易记录',
    component: Jiaoyi
  },
  {
    path: '/yhkbd',
    name: '银行卡绑定',
    component: bankMark
  },
  {
    path: '/queren',
    name: '确认订单',
    component: Confirmation
  },
  {
    path: '/querenone',
    name: '确认订单',
    component: Confirmations
  },
  {
    path: '/onsale',
    name: '猴集卡',
    component: Sale
  },
  {
    path: '/orderdetails',
    name: '订单详情',
    component: Orderdetails
  },
  {
    path: '/wuliudetails',
    name: '物流详情',
    component: Wuliudetails
  }
]

const router = new Router({
  routes
});


// 缓存页面
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
