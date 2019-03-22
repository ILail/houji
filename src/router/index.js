import Vue from 'vue'
import Router from 'vue-router'
import store from '@/components/store/index'
Vue.use(Router)
// export default new Router({
const routes = [{
    path: '/',

    // component: resolve => require(['@/pages/home/Small'], resolve),
    component: resolve => require(["@/pages/home/Small"], resolve),
    // name: '猴集',
    // component: Small,
    meta: {
      // uio: true,

      title: '猴集',
    },
    // children: [{

    // }]
  },
  {
    path: '/word',
    component: resolve => require(["@/pages/home/components/AddressWord"], resolve),
    meta: {

      title: '海外淘',
    },
  },
  {
    path: '/linjuan',
    // name: '领卷中心',
    // component: Centerj,
    component: resolve => require(["@/pages/home/components/centerj"], resolve),
    meta: {
      // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      title: '领卷中心',
    },
  },
  {
    path: '/wishs',
    // name: '购物车',
    // component: Wish,
    component: resolve => require(["@/pages/wish/Wish"], resolve),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      // oppendid: true,
      title: '购物车',
    },
  },
  {
    path: '/days',
    // name: '购物车',
    // component: Wish,
    component: resolve => require(["@/components/common/Day"], resolve),
    meta: {
      title: '每日新品',
    },
  },
  {
    path: '/mines',
    // name: '个人中心',
    // component: Mine,
    component: resolve => require(["@/pages/mine/Mine"], resolve),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      // oppendid: true,
      title: '个人中心',
    },
  },
  {
    path: '/peos',
    // name: '花果山',
    meta: {
      title: '花果山',
    },
    // component: Feilei,
    // meta: {
    // oppendid: true,
    // },
  },
  // {
  //   path: '/feilei',
  //   // name: '分类',
  //   // component: Feilei,
  //   component: resolve => require(["@/pages/fs/Feilei"], resolve),
  //   meta: {
  // oppendid: true,
  //     title: '分类'
  //   },
  // },
  {
    path: '/sortCfList',
    // name: '分类',
    // component: Feilei,
    component: resolve => require(["@/components/common/SortCfList"], resolve),
  },
  {
    path: '/Classify',
    // name: '分类',
    // component: Feilei,
    component: resolve => require(["@/pages/fs/Classify"], resolve),
    meta: {
      // oppendid: true,
      title: '分类'
    },
  },
  {
    path: '/shao',
    // name: '扫一扫',
    // component: Shao
    component: resolve => require(["@/pages/home/components/Shao"], resolve),
    meta: {
      title: '扫一扫',
    },

  },
  {
    path: '/xiao',
    // name: '消息中心',
    component: resolve => require(["@/pages/home/components/Xiao"], resolve),
    // component: Xiao
    meta: {
      title: '消息中心',
    },
  },
  {
    path: '/jioayid',
    // name: '交易详情',
    component: resolve => require(["@/components/common/Jdetial"], resolve),

    meta: {
      title: '交易详情',
    },
    // component: Jdetial,
  },
  {
    path: '/hdetial',
    // name: '活动专区',
    component: resolve => require(["@/components/common/Hdetial"], resolve),
    meta: {
      title: '活动专区',
    },
    // component: Hdetial
  },
  {
    path: '/search',
    // name: '搜索',
    component: resolve => require(["@/components/search/Search"], resolve),
    meta: {
      title: '搜索',
    },
    // component: Search
  },
  {
    path: '/detail',
    // name: '详情页',
    component: resolve => require(["@/components/common/Detailswiper"], resolve),
    meta: {
      title: '详情页',
    },
    // component: Detail,
  },
  {
    path: '/addressdetail',
    // name: '地址',
    component: resolve => require(["@/pages/home/components/Addressdetail"], resolve),
    meta: {
      title: '地理标志'
    }
    // component: Addressdetail
  },
  {
    path: '/show',
    // name: '产品展示',
    component: resolve => require(["@/components/search/Show"], resolve),
    meta: {
      title: '产品展示',
    },
    // component: Show
  },
  {
    path: '/phone',
    // name: '绑定手机号',
    component: resolve => require(["@/components/phone"], resolve),
    meta: {
      title: '绑定手机号',
    },
    // component: Phone
  },
  {
    path: '/myjob',
    // name: '我的项目',
    component: resolve => require(["@/pages/mine/components/components/Myjob"], resolve),
    meta: {
      title: '我的项目',
    },
    // component: Myjob
  },
  {
    path: '/fit',
    // name: '设置',
    component: resolve => require(["@/pages/mine/components/components/fit"], resolve),
    meta: {
      title: '设置',
    },
    // component: Fit
  }, {
    path: '/personone',
    // name: '个人资料',
    component: resolve => require(["@/pages/mine/components/components/personone"], resolve),
    meta: {
      title: '个人资料',
    },
    // component: Personone
  },
  {
    path: '/desgreo',
    // name: '账号与安全',
    component: resolve => require(["@/pages/mine/components/components/desgreo"], resolve),
    meta: {
      title: '账号与安全',
    },
    // component: Desgreo
  },
  {
    path: '/absolu',
    // name: '关于我们',
    component: resolve => require(["@/pages/mine/components/components/absolu"], resolve),
    meta: {
      title: '关于我们',
    },
    // component: Absolu
  },
  {
    path: '/zfu',
    // name: '支付密码',
    component: resolve => require(["@/pages/mine/components/components/zfu"], resolve),
    meta: {
      title: '支付密码',
    },
    // component: Zfu
  },
  {
    path: '/gengph',
    // name: '更改手机号',
    component: resolve => require(["@/pages/mine/components/components/gengph"], resolve),
    meta: {
      title: '更改手机号',
    },
    // component: Gengph
  },

  {
    path: '/bindm',
    // name: '更改手机号',
    component: resolve => require(["@/pages/mine/components/components/BindMobile"], resolve),
    meta: {
      title: '绑定手机号',
    },
    // component: Gengph
  },
  {
    path: '/shouhuo',
    // name: '收货地址',
    component: resolve => require(["@/pages/mine/components/components/shouhuo"], resolve),
    meta: {
      title: '收货地址',
    },
    // component: Shouhuo
  },
  {
    path: '/tianjia',
    // name: '添加地址',
    component: resolve => require(["@/pages/mine/components/components/tianjia"], resolve),
    meta: {
      title: '添加地址',
    },
    // component: Tianjia
  },
  {
    path: '/liping',
    // name: '礼品卡',
    component: resolve => require(["@/pages/mine/components/components/liping"], resolve),
    meta: {
      title: '礼品卡',
    },
    // component: Liping
  },
  {
    path: '/juan',
    // name: '优惠卷',
    component: resolve => require(["@/pages/mine/components/components/juan"], resolve),
    meta: {
      title: '优惠卷',
    },
    // component: Juan
  },
  {
    path: '/myorders',
    // name: '我的订单',
    component: resolve => require(["@/pages/mine/components/components/myorders"], resolve),
    meta: {
      title: '我的订单',
    },
    // component: Myorders
  },
  {
    path: '/moneyall',
    // name: '我的钱包',
    component: resolve => require(["@/pages/mine/components/components/mymoney"], resolve),
    meta: {
      title: '我的钱包',
    },
    // component: Mym
  },
  {
    path: '/chongzhi',
    // name: '充值',
    component: resolve => require(["@/pages/mine/components/components/chongzhi"], resolve),
    meta: {
      title: '充值',
    },
    // component: Czhi
  }, {
    path: '/zhifu',
    // name: '支付',
    component: resolve => require(["@/components/common/Paymoney"], resolve),
    meta: {
      title: '支付',
    },
    // component: Zhifu
  },
  {
    path: '/zhifuone',
    // name: '支付',
    component: resolve => require(["@/components/common/Paymoneyone"], resolve),
    meta: {
      title: '支付',
    },
    // component: Zhifuone
  },
  {
    path: '/tixian',
    // name: '提现',
    component: resolve => require(["@/pages/mine/components/components/tixian"], resolve),
    meta: {
      title: '提现',
    },
    // component: Txiana
  }, {
    path: '/finish',
    // name: '支付完成',
    component: resolve => require(["@/components/common/Finish"], resolve),
    meta: {
      title: '支付完成',
    },
    // component: Finish
  },
  {
    path: '/jiaoyi',
    // name: '交易记录',
    component: resolve => require(["@/pages/mine/components/components/jyi"], resolve),
    meta: {
      title: '交易记录',
    },
    // component: Jiaoyi
  },
  {
    path: '/yhkbd',
    // name: '银行卡绑定',
    component: resolve => require(["@/pages/mine/components/components/bank"], resolve),
    meta: {
      title: '银行卡绑定',
    },
    // component: bankMark
  },
  {
    path: '/queren',
    // name: '确认订单',
    component: resolve => require(["@/components/common/Confirmation"], resolve),
    meta: {
      requireAuth: true,
      title: '确认订单',
    },
    // component: Confirmation
  },
  {
    path: '/querenone',
    // name: '确认订单',
    component: resolve => require(["@/components/common/Confirmations"], resolve),
    meta: {
      requireAuth: true,
      title: '确认订单',
    },
    // component: Confirmations
  },
  {
    path: '/onsale',
    // name: '猴集卡',
    component: resolve => require(["@/components/common/Sale"], resolve),
    meta: {
      title: '猴集卡',
    },
    // component: Sale
  },
  {
    path: '/orderdetails',
    // name: '订单详情',
    component: resolve => require(["@/components/common/Orderdetails"], resolve),
    meta: {
      title: '订单详情',
    },
    // component: Orderdetails
  },
  {
    path: '/wuliudetails',
    // name: '物流详情',
    component: resolve => require(["@/components/common/Logistics"], resolve),
    meta: {
      title: '物流详情',
    },
    // component: Wuliudetails
  },
  {
    path: '/Authorization',
    // name: '消息中心',
    component: resolve => require(["@/components/Authorization"], resolve),
    // component: Xiao
    meta: {
      title: '授权登录',
    },
  },
]


const router = new Router({
  mode: 'history',
  // base: '',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes,

});

// token 登录 之前直接手机号认证 现在直接微信认证获取
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'));
// }

router.beforeEach((to, from, next) => {
  // const toRouter = to.path
  // const fromRouter = from.path
  // console.log(toRouter)
  // console.log(fromRouter)
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token == '') {

      console.log(123)
      next();
      window.localStorage.clear()
      // window.reload()
      // next({
      //   path: '/Authorization'
      // })
    }else{
      next()
    }
  }else{
    next()
  }
})
export default router;
