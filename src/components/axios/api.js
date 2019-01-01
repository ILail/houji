import {
  fetch
} from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js

//首页
export function lookOption() { //lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.Hallowmas + '/v2/frontPageHead',
    method: 'get', //请求方法
    // params:{}
    //   currentUserId:userId //传过去的参数
    // }
  })
}

// 头部搜索
export function search(name) {
  return fetch({
    url: api.Hallowmas + '/v2/index?keyword=' + name + '',
    method: "get",
    data: {
      keyword: name
    }
  })
}

//订单详情页面
export function crowd_funding(id) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/crowdFundingDetails?crowd_funding_id=' + id + '',
    method: "get",
    data: {
      id: id
    }
  })
}

// 分类页面
export function fs() {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/crowdFundingClass',
    method: "get",
  })
}

// 分类页面产品
export function fsDetail(id) {
  return fetch({
    url: api.Hallowmas + '/v2/index?crowd_funding_class_id=' + id + '',
    method: "get",
    data: {
      id: id
    }
  })
}

// 地理省份标志
export function address() {
  return fetch({
    url: api.Hallowmas + '/v2/geographica/geographicalList',
    method: "get",
  })
}

// 地理标志列表
export function addresslist(id) {
  return fetch({
    url: api.Hallowmas + '/v2/geographica/geographicalCrowdList?geographical_id= ' + 6 + '',
    method: "post",
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
    method: "post",
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
    method: "get",
    // data: {
    //   wish_nums: wish_nums,
    //   crowd_funding_return_id:crowd_funding_return_id,
    //   crowd_funding_id:crowd_funding_id
    // }
  })
}

// 商品规格
export function specifications(id) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/specifications?crowd_funding_id=' + id + '',
    method: "get",
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
    method: "post",

    data: data
  })
}
// 微信
export function wx(phone, code) {
  //let data = [];
  return fetch({
    url: api.Hallowmas + '/v2/login',
    method: "post",
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
    method: "get",
    data: {
      id: id,
      page: page
    }
  })
}

// 小众筹加入讨论

export function plunPushs(comment_id, crowd_funding_id, content) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/comment',
    method: "post",
    data: [
      comment_id,
      crowd_funding_id,
      content
    ]
  })
}

// 大众筹加入讨论
export function plunPush(crowd_funding_id, content) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/comment',
    method: "post",
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
    method: "get",

  })
}

// 猜你喜欢
export function gass() {
  return fetch({
    url: api.Hallowmas + '/v2/index?crowd_funding_type= ' + 111 + ' ',
    method: "get",

  })
}

// 为你推荐
export function foryou() {
  return fetch({
    url: api.Hallowmas + '/v2/recommendedForYou ',
    method: "get",

  })
}

// 删除心愿单
export function forDetil(wish_id) {
  return fetch({
    url: api.Hallowmas + '/v2/crowdFunding/delWishList',
    method: "DELETE",
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
export function Confirtwo(crowd_funding_id, crowd_funding_return_id,wish_nums,support_type) {
  return fetch({
    url: api.Hallowmas + '/v2/single/support',
    method: "POST",
    data: {
      crowd_funding_id: crowd_funding_id,
      crowd_funding_return_id: crowd_funding_return_id,
      wish_nums:wish_nums,
      support_type:support_type
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
    method: 'post',
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
export function getChong(channel,amount) {
  return fetch({
    url: api.Hallowmas + '/v2/member/recharge',
    method: "POST ",
    data: {
      channel: channel,
      amount:amount
    }
  })
}
