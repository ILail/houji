import Vue from 'vue'
import Router from 'vue-router'
import store from '@/components/store/index'
Vue.use(Router)
// export default new Router({})
const routes = [{
    path: '/',
    component: resolve => require(["@/pages/home/Small"], resolve),
    meta: {
      title: '猴集',
    },
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
    component: resolve => require(["@/pages/home/components/centerj"], resolve),
    meta: {
      // requireAuth: true,
      title: '领卷中心',
    },
  },
  {
    path: '/wishs',
    component: resolve => require(["@/pages/wish/Wish"], resolve),
    meta: {
      // requireAuth: true,
      uio:false,
      title: '购物车',
    },
  },
  {
    path: '/days',
    component: resolve => require(["@/components/common/Day"], resolve),
    meta: {
      title: '每日新品',
    },
  },
  {
    path: '/mines',
    component: resolve => require(["@/pages/mine/Mine"], resolve),
    meta: {
      // requireAuth: true,
      title: '个人中心',
    },
  },
  {
    path: '/peos',
    meta: {
      title: '花果山',
    },
  },
  {
    path: '/sortCfList',
    component: resolve => require(["@/components/common/SortCfList"], resolve),
  },
  {
    path: '/Classify',
    component: resolve => require(["@/pages/fs/Classify"], resolve),
    meta: {
      title: '分类'
    },
  },
  {
    path: '/shao',
    component: resolve => require(["@/pages/home/components/Shao"], resolve),
    meta: {
      title: '扫一扫',
    },
  },
  {
    path: '/xiao',
    component: resolve => require(["@/pages/home/components/Xiao"], resolve),
    meta: {
      title: '消息中心',
    },
  },
  {
    path: '/jioayid',
    component: resolve => require(["@/components/common/Jdetial"], resolve),
    meta: {
      title: '交易详情',
    },
  },
  {
    path: '/hdetial',
    component: resolve => require(["@/components/common/Hdetial"], resolve),
    meta: {
      title: '活动专区',
    },
  },
  {
    path: '/search',
    component: resolve => require(["@/components/search/Search"], resolve),
    meta: {
      title: '搜索',
    },
  },
  {
    path: '/detail',
    component: resolve => require(["@/components/common/Detailswiper"], resolve),
    meta: {
      title: '详情页',
    },
  },
  {
    path: '/addressdetail',
    component: resolve => require(["@/pages/home/components/Addressdetail"], resolve),
    meta: {
      title: '地理标志'
    }
  },
  {
    path: '/show',
    component: resolve => require(["@/components/search/Show"], resolve),
    meta: {
      title: '产品展示',
    },
  },
  {
    path: '/phone',
    component: resolve => require(["@/components/phone"], resolve),
    meta: {
      title: '绑定手机号',
    },
  },
  {
    path: '/myjob',
    component: resolve => require(["@/pages/mine/components/components/Myjob"], resolve),
    meta: {
      title: '我的项目',
    },
  },
  {
    path: '/fit',
    component: resolve => require(["@/pages/mine/components/components/fit"], resolve),
    meta: {
      title: '设置',
    },
  }, {
    path: '/personone',
    component: resolve => require(["@/pages/mine/components/components/personone"], resolve),
    meta: {
      title: '个人资料',
    },
  },
  {
    path: '/desgreo',
    component: resolve => require(["@/pages/mine/components/components/desgreo"], resolve),
    meta: {
      title: '账号与安全',
    },
  },
  {
    path: '/absolu',
    component: resolve => require(["@/pages/mine/components/components/absolu"], resolve),
    meta: {
      title: '关于我们',
    },
  },
  {
    path: '/zfu',
    component: resolve => require(["@/pages/mine/components/components/zfu"], resolve),
    meta: {
      title: '支付密码',
    },
  },
  {
    path: '/gengph',
    component: resolve => require(["@/pages/mine/components/components/gengph"], resolve),
    meta: {
      title: '更改手机号',
    },
  },

  {
    path: '/bindm',
    component: resolve => require(["@/pages/mine/components/components/BindMobile"], resolve),
    meta: {
      title: '绑定手机号',
    },
  },
  {
    path: '/shouhuo',
    component: resolve => require(["@/pages/mine/components/components/shouhuo"], resolve),
    meta: {
      title: '收货地址',
    },
  },
  {
    path: '/tianjia',
    component: resolve => require(["@/pages/mine/components/components/tianjia"], resolve),
    meta: {
      title: '添加地址',
    },
  },
  {
    path: '/liping',
    component: resolve => require(["@/pages/mine/components/components/liping"], resolve),
    meta: {
      title: '礼品卡',
    },
  },
  {
    path: '/juan',
    component: resolve => require(["@/pages/mine/components/components/juan"], resolve),
    meta: {
      title: '优惠卷',
    },
  },
  {
    path: '/myorders',
    component: resolve => require(["@/pages/mine/components/components/myorders"], resolve),
    meta: {
      title: '我的订单',
    },
  },
  {
    path: '/moneyall',
    component: resolve => require(["@/pages/mine/components/components/mymoney"], resolve),
    meta: {
      title: '我的钱包',
    },
  },
  {
    path: '/chongzhi',
    component: resolve => require(["@/pages/mine/components/components/chongzhi"], resolve),
    meta: {
      title: '充值',
    },
  }, {
    path: '/zhifu',
    component: resolve => require(["@/components/common/Paymoney"], resolve),
    meta: {
      title: '支付',
    },
  },
  {
    path: '/zhifuone',
    component: resolve => require(["@/components/common/Paymoneyone"], resolve),
    meta: {
      title: '支付',
    },
  },
  {
    path: '/tixian',
    component: resolve => require(["@/pages/mine/components/components/tixian"], resolve),
    meta: {
      title: '提现',
    },
  }, {
    path: '/finish',
    component: resolve => require(["@/components/common/Finish"], resolve),
    meta: {
      title: '支付完成',
    },
  },
  {
    path: '/jiaoyi',
    component: resolve => require(["@/pages/mine/components/components/jyi"], resolve),
    meta: {
      title: '交易记录',
    },
  },
  {
    path: '/yhkbd',
    component: resolve => require(["@/pages/mine/components/components/bank"], resolve),
    meta: {
      title: '银行卡绑定',
    },
  },
  {
    path: '/queren',
    component: resolve => require(["@/components/common/Confirmation"], resolve),
    meta: {
      // requireAuth: true,
      title: '确认订单',
    },
  },
  {
    path: '/querenone',
    component: resolve => require(["@/components/common/Confirmations"], resolve),
    meta: {
      // requireAuth: true,
      title: '确认订单',
    },
  },
  {
    path: '/onsale',
    component: resolve => require(["@/components/common/Sale"], resolve),
    meta: {
      title: '猴集卡',
    },
  },
  {
    path: '/orderdetails',
    component: resolve => require(["@/components/common/Orderdetails"], resolve),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/wuliudetails',
    component: resolve => require(["@/components/common/Logistics"], resolve),
    meta: {
      title: '物流详情',
    },
  },
  {
    path: '/Authorization',
    component: resolve => require(["@/components/Authorization"], resolve),
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


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.token) {
//       next();
//     } else {
//       next({
//         path: '/Authorization'
//       })
//     }
//   } else {
//     next();
//   }
// })


export default router;
