import {
  fetch
} from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js
// console.log(api.Hallowmas)
//首页
export function lookOption() { //lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.Hallowmas + '/v2/frontPageHead',
    method: 'GET', //请求方法
    // params:{}
    //   currentUserId:userId //传过去的参数
    // }
  })
}

// 头部搜索
export function search(name) {
  return fetch({
    url: api.Hallowmas + '/v2/index?keyword=' + name + '',
    method: "GET",
    data: {
      keyword: name
    }
  })
}

//订单详情页面
export function crowd_funding(id) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/crowdFundingDetails?crowd_funding_id=' + id + '',
    method: "GET",
    data: {
      id: id
    }
  })
}

// 分类页面
export function fs() {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/crowdFundingClass',
    method: "GET",
  })
}

// 分类页面产品
export function fsDetail(id) {
  return fetch({
    url: api.Hallowmas + '/v2/index?crowd_funding_class_id=' + id + '',
    method: "GET",
    data: {
      id: id
    }
  })
}

// 地理省份标志
export function address() {
  return fetch({
    url: api.Hallowmas + '/v2/geographica/geographicalList',
    method: "GET",
  })
}

// 地理标志列表
export function addresslist(id) {
  return fetch({
    url: api.Hallowmas + '/v2/geographica/geographicalCrowdList',
    method: "POST",
    data: {
      id: id
    }
  })
}

// 加入心愿单
export function wishList(wish_nums, crowd_funding_return_id, crowd_funding_id) {
  //let data = [];
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/addWishList',
    method: "POST",
    data: {
      wish_nums: wish_nums,
      crowd_funding_return_id: crowd_funding_return_id,
      crowd_funding_id: crowd_funding_id
    }
  })
}
// 下单支持

//获取心愿单
export function wishPush() {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/wishList',
    method: "GET",
  })
}

// 商品规格
export function specifications(id) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/specifications?crowd_funding_id=' + id + '',
    method: "GET",
    data: {
      id: id
    }
  })
}
//获取验证码
export function yzm(mobile, code_type) {
  //let data = [];
  console.log(mobile, code_type)
  var data = {
    mobile,
    code_type
  }
  return fetch({
    url: api.Hallowmas + '/v2/verificationCode',
    method: "POST",

    data: data
  })
}
// 微信
export function wx(phone, code) {
  //let data = [];
  return fetch({
    url: api.Hallowmas + '/v2p1/login',
    method: "POST",
    data: {
      phone,
      code
    }
  })
}
// 获取众筹详情时时讨论

export function plun(id, page) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/discussionList?crowd_funding_id=' + id + '&page=' + page + '',
    method: "GET",
  })
}
//众筹详情时我的讨论

export function Myplun(id, page) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/discussionMyList?crowd_funding_id=' + id + '&page=' + page + '',
    method: "GET",
  })
}
// 小众筹加入讨论

export function plunPushs(comment_id, crowd_funding_id, content) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/comment',
    method: "POST",
    data: {
      comment_id,
      crowd_funding_id,
      content
    }
  })
}

// 大众筹加入讨论
export function plunPush(crowd_funding_id, content) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/comment',
    method: "POST",
    data: {
      crowd_funding_id: crowd_funding_id,
      content: content
    }
  })
}

// 用户信息
export function people() {
  return fetch({
    url: api.Hallowmas + '/v2/member/memberInfo',
    method: "GET",

  })
}

// 猜你喜欢
export function gass() {
  return fetch({
    url: api.Hallowmas + '/v2/index?crowd_funding_type= ' + 111 + ' ',
    method: "GET",

  })
}

// 为你推荐
export function foryou(page) {
  return fetch({
    url: api.Hallowmas + '/v2/recommendedForYou?page=' + page + '',
    method: "GET",

  })
}

// 删除心愿单
export function forDetil(wish_id) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/delWishList',
    method: "POST",
    data: {
      wish_id: wish_id
    }
  })
}
// 确认订单
export function Confirone(wish_id, support_type) {
  return fetch({
    url: api.Hallowmas + '/v2/single/support',
    method: "POST",
    data: {
      wish_id: wish_id,
      support_type: support_type
    }
  })
}

// 确认订单2
export function Confirtwo(crowd_funding_id, crowd_funding_return_id, wish_nums, support_type) {
  return fetch({
    url: api.Hallowmas + '/v2/single/support',
    method: "POST",
    data: {
      crowd_funding_id: crowd_funding_id,
      crowd_funding_return_id: crowd_funding_return_id,
      wish_nums: wish_nums,
      support_type: support_type
    }
  })
}


// 获取用户默认地址
export function getDIZ() {
  return fetch({
    url: api.Hallowmas + '/v2/member/getUserDefaultAddress',
    method: "GET",
  })
}
// 获取城市列表
export function getnewAddress() {
  return fetch({
    url: api.Hallowmas + '/v2/member/getAddressList',
    method: "GET",
  })
}
// 新增地址
export function newAddress(realname, mobile, province_id, city_id, area_id, address) {
  return fetch({
    url: api.Hallowmas + '/v2/member/memberAddressManagement',
    method: "POST",
    data: {
      realname: realname,
      mobile: mobile,
      province_id: province_id,
      city_id: city_id,
      area_id: area_id,
      address: address
    }
  })
}
// 获取获取地址列表
export function getAddress() {
  return fetch({
    url: api.Hallowmas + '/v2/member/memberAddressManagement',
    method: "GET",
  })
}
// 修改为默认地址
export function getUser(user_address_id) {
  return fetch({
    url: api.Hallowmas + '/v2/member/updateAddressDefault',
    method: "PUT",
    data: {
      user_address_id: user_address_id
    }
  })
}
// 游记

export function Travels(crowd_funding_id) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/crowdFundingTravels',
    method: 'POST',
    data: {
      crowd_funding_id: crowd_funding_id
    }
  })
}

// 删除地址 
export function getMove(user_address_id) {
  return fetch({
    url: api.Hallowmas + '/v2/member/memberAddressManagement',
    method: "DELETE",
    data: {
      user_address_id: user_address_id
    }
  })
}


// 充值
export function getChong(channel, amount, open_id) {
  return fetch({
    url: api.Hallowmas + '/v2/member/recharge',
    method: "POST",
    data: {
      channel: channel,
      amount: amount,
      open_id: open_id
    }
  })
}

// 购物车加减
export function Addjia(wish_id, wish_nums) {
  console.log(wish_id, wish_nums)
  var data = {
    wish_id,
    wish_nums
  }
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/editWishList',
    method: "POST",
    data: data
  })
}

// 我的全部项目
export function MyObject() {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/myProject?orderType=[under_way,completed,fail]',
    method: "GET",

  })
}
// 我的项目进行中
export function MyObjectone() {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/myProject?orderType=under_way',
    method: "GET",

  })
}
// 我的项目已完成
export function MyObjectwo() {
  // let completed = "fail"
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/myProject?orderType=completed',
    method: "GET",
  })
}
// 我的项目已
export function MyObjecthree() {
  // let completed = "fail"
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/myProject?orderType=fail',
    method: "GET",
  })
}
// 修改个人资料
export function peosMS(username, self_introduction) {

  return fetch({
    url: api.Hallowmas + '/v2/member/upMember',
    method: "PUT",
    data: {
      username: username,
      self_introduction: self_introduction
    }
  })
}
// 修改手机号码
export function peosMoble(mobile, code) {

  return fetch({
    url: api.Hallowmas + '/v2/member/replacePhone',
    method: "POST",
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// 修改密码
export function peosMobless(pay_password, pay_password_confirm) {

  return fetch({
    url: api.Hallowmas + '/v2/member/upMember',
    method: "PUT",
    data: {
      pay_password: pay_password,
      pay_password_confirm: pay_password_confirm
    }
  })
}
// 银行卡l列表
export function getBank() {

  return fetch({
    url: api.Hallowmas + '/v2/member/bankList',
    method: "GET",
  })
}
// 绑定银行卡
export function putBank(bank_id, account, realname, opening_bank) {

  return fetch({
    url: api.Hallowmas + '/v2/member/bindingBankCard',
    method: "POST",
    data: {
      bank_id: bank_id,
      account: account,
      realname: realname,
      opening_bank: opening_bank
    }
  })
}
// 体现申请
export function moreBank(bank_card_id, money) {

  return fetch({
    url: api.Hallowmas + '/v2/member/depositApply',
    method: "POST",
    data: {
      bank_card_id: bank_card_id,
      money: money
    }
  })
}

// 图片上传
export function imgUpdat(file) {

  return fetch({
    url: api.Hallowmas + '/v2/image',
    method: "POST",
    data: {
      file: file
    }
  })
}

// 福利专区
export function weal() {

  return fetch({
    url: api.Hallowmas + '/v2p1/Welfare/getWelfareList',
    method: "GET",
  })
}



// 详情页请求支付
export function detailM(pay_style, pay_type, crowd_funding_id, crowd_funding_return_id, address_id, support_money, crowd_funding_return_num, mark, vouchers_id, open_id,payment_password) {

  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/payment',
    method: "POST",
    data: {
      pay_style: pay_style,
      pay_type: pay_type,
      crowd_funding_id: crowd_funding_id,
      crowd_funding_return_id: crowd_funding_return_id,
      address_id: address_id,
      support_money: support_money,
      crowd_funding_return_num: crowd_funding_return_num,
      mark: mark,
      vouchers_id: vouchers_id,
      open_id: open_id,
      payment_password: payment_password
    }
  })
}

// 购物车页请求支付
export function detailMshop(pay_style, pay_type, wish_id, address_id, mark, vouchers_id, open_id, payment_password) {

  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/payment',
    method: "POST",
    data: {
      pay_style: pay_style,
      pay_type: pay_type,
      wish_id: wish_id,
      address_id: address_id,

      mark: mark,
      vouchers_id: vouchers_id,
      open_id: open_id,
      payment_password: payment_password,
    }
  })
}
//优惠卷列表
export function juanYOU() {

  return fetch({
    url: api.Hallowmas + '/v2/receive/list?page=' + 1 + '',
    method: "GET",
  })
}

// 获取地址
export function huoqu(url) {

  return fetch({
    url: api.Hallowmas + '/returnWechatUrl',
    method: "POST",
    data: {
      url: url
    }
  })
}

// 领取优惠卷
export function hitLq(vouchers_id) {

  return fetch({
    url: api.Hallowmas + '/v2/receive/coupon',
    method: "POST",
    data: {
      vouchers_id: vouchers_id
    }
  })
}

// 领取优惠卷
export function coupon(coupon_type) {

  return fetch({
    url: api.Hallowmas + '/v2/coupon/list',
    method: "POST",
    data: {
      coupon_type: coupon_type
    }
  })
}

// 获得oppenid
export function Code(code) {

  return fetch({
    url: api.Hallowmas + '/getOpenId',
    method: "POST",
    data: {
      code: code
    }
  })
}

// 用户领取会员
export function Member() {

  return fetch({
    url: api.Hallowmas + '/v2/member/memberReceiveMembership',
    method: "GET",
  })
}

// 我的订单
export function Allorder(order_type, page) {

  return fetch({
    url: api.Hallowmas + '/v2/member/getMemberOrder',
    method: "POST",
    data: {
      order_type: order_type,
      page: page
    }
  })
}

// 2.1用户领取会员首页
export function peosLin() {

  return fetch({
    url: api.Hallowmas + '/v2p1/member/memberReceiveMembership?user_rank_id=' + 4 + '',
    method: "GET",
  })
}

// 判断支付密码

export function zfuM() {

  return fetch({
    url: api.Hallowmas + '/v2/member/checkPassword',
    method: "GET",
  })
}

// 用户查询具体某一订单物流信息

export function MessageWu(trade_no) {

  return fetch({
    url: api.Hallowmas + '/v2/member/getOrderTraces',
    method: "POST",
    data:{
      trade_no:trade_no
    }
  })
}

// 确认收货
export function CorfirWu(trade_no) {

  return fetch({
    url: api.Hallowmas + '/v2/member/memberConfirmReceipt',
    method: "POST",
    data:{
      trade_no:trade_no
    }
  })
}

// 申请退款
export function offerWu(trade_no) {

  return fetch({
    url: api.Hallowmas + '/v2/member/memberApplyForRefund',
    method: "POST",
    data:{
      trade_no:trade_no
    }
  })
}

// 订单详情
export function DEtilWu(trade_no) {

  return fetch({
    url: api.Hallowmas + '/v2/member/getMemberOrderDetail',
    method: "POST",
    data:{
      trade_no:trade_no
    }
  })
}

// 订单为你推荐
export function ForWu() {

  return fetch({
    url: api.Hallowmas + '/v2/recommendedForYou',
    method: "GET",
  })
}