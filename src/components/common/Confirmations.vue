<template>
  <div class="WrapAll" v-show="showCon">
    <img :src="wxone" style="width:100%">
    <div class="header container" @click="address" v-if="show">
      <div>
        <div class="word">
          <span>{{letter.realname}}</span>
          <span style="margin-left:12px">{{letter.mobile}}</span>
        </div>
        <div class="wordea">{{letter.address_info}}{{letter.address}}</div>
      </div>
      <div>
        <img :src="wx" style="width:7px">
      </div>
    </div>
    <div class="middles" v-if="shoiw" @click="addresssw">
      <div class="middlea">+</div>
      <div class="middleW">添加收货地址</div>
    </div>
    <div style="background:#eee;height:8px"></div>
    <div class="middle container">
      <div class="same">
        <div class="sameInput">
          <span>优惠卷：</span>
          <input type="text" placeholder="暂无使用" v-model="juan" readonly v-show="aa">
          <input type="text" placeholder="暂不可用" readonly v-show="aas">
        </div>
        <div @click="showList" v-show="aa" class="numZ">
          <span style="margin-right:10px" class="same_">{{num}}张</span>
          <img :src="wx" style="vertical-align: bottom; width:7px">
        </div>
        <div v-show="aas" class="numZ">
          <span style="margin-right:10px" class="same_">{{num}}张</span>
          <img :src="wx" style="vertical-align: bottom; width:7px">
        </div>
      </div>
      <div class="same houji">
        <div class="sameInput">
          <span>猴集卡：</span>
          <input type="text" placeholder="享受10折优惠" v-model="saleING" readonly v-show="aa">
          <input type="text" placeholder="暂不可用" readonly v-show="aas">
        </div>

        <div @click="showLists" v-show="aa">
          <img :src="wx" style="vertical-align: bottom; width:7px">
        </div>
        <div v-show="aas">
          <img :src="wx" style="vertical-align: bottom; width:7px">
        </div>
      </div>
      <div class="same zhic">
        <span>支持金额</span>
        <span>¥{{moneyAll}}</span>
      </div>
      <div class="same">
        <span>活动优惠</span>
        <span>-¥{{newmoney}}</span>
      </div>
      <div class="same zhic" style="border-bottom:1px solid #eee">
        <span>配送费用</span>
        <span>¥0.00</span>
      </div>
      <div class="people zhic">
        <span class="peosn">买家留言：</span>
        <input type="text" placeholder="您可以在此给卖家留言" v-model="liuyab">
      </div>
    </div>
    <div style="background:#eee;height:8px"></div>
    <div class="container bottom">
      <div v-for="(item,index) in json" :key="item.id" :id="index" class="allW">
        <div class="top">
          <img :src="item.headimgurl">

          <span class="topWord">{{item.nickname}}</span>
        </div>
        <div class="item" v-for="(pl,index) in json[index].options" :key="index" :data-id="index">
          <div class="left">
            <img v-lazy="pl.pic">
          </div>
          <div class="right">
            <div class="title">
              <div class="titleWord">{{pl.crowd_funding_name}}</div>
              <div class="titlew">
                <div class="pricr">￥{{pl.support_money}}</div>
                <div class="pNUM">x{{pl.wish_nums}}</div>
              </div>
            </div>
            <div class="detailsame">{{pl.return_content}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottoms">
      <div class="money">
        合计金额:
        <span style="margin-left:8px;font-size:18px">¥{{totalMoney}}</span>
      </div>
      <div class="monn" @click="HIt">立即下单</div>
    </div>

    <!-- 优惠券列表 -->
    <van-popup v-model="shows" position="bottom" @click-overlay="clickOverlay">
      <van-tabs v-model="active" swipeable animated>
        <van-tab title="选择优惠卷">
          <div class="hitImg" v-show="ispic" @click="hitImg">
            <img src="@/assets/linjuan/5.png">
            <div class="contenr">暂时无优惠卷，赶快点我领取吧！</div>
          </div>
          <div class="smae">
            <div class="wrap container" v-for="item in list" :key="item.id" :style="note">
              <div class="wrapCenter">
                <div class="numsN">
                  <span class="nums">¥</span>
                  <span class="num">{{item.amount_limit}}</span>
                </div>
                <div class="wrapMiddle">
                  <span class="middlesa">{{item.title}}</span>
                  <span
                    class="datas"
                  >{{item.start_time | formatDate}}-{{item.end_time | formatDate}}</span>
                </div>
                <div
                  class="nows"
                  @click="prices(item.amount_limit,item.num,item.vouchers_id,item.title)"
                >去使用</div>
              </div>
              <div class="content">全场产品可以使用；限时活动通用优惠卷可以叠加使用</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { getDIZ } from "@/components/axios/api";
import { Confirtwo } from "@/components/axios/api";
import { coupon } from "@/components/axios/api";
import { crowd_funding } from "@/components/axios/api";
import secret from "@/utils/utils";
// import * as types from "@/components/vuex/types";
// import store from "@/components/vuex/store";
export default {
  name: "Confirmations",
  filters: {
    formatDate: function(value) {
      value *= 1000;
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + MM + "-" + d;
    }
  },
  data() {
    return {
      showCon: false,
      aa: true,
      aas: false,
      routerParams: this.$route.query.dataObjo,
      routerParamb: this.$route.query.dataObjb,
      routerParamo: this.$route.query.dataObjc,
      wx: require("@/assets/rr.png"),
      wxone: require("@/assets/mine/xu.png"),
      shoiw: false,
      show: true,
      letter: {},
      liuyab: "",
      // 地址
      json: [],
      moneyAll: "",
      note: {
        backgroundImage: "url(" + require("@/assets/linjuan/1.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: 125 + "px",
        overflow: "hidden"
      },

      shows: false,
      active: 0,
      list: [],
      num: "",
      ispic: false,
      newmoney: 0.0,
      idNum: 0,
      // 价格
      details: "details",
      // we_chat: "wx_pub",
      oppenID: "",
      vouchers_id: 0,
      addressID: "",
      // 结算

      juan: "",
      saleING: "",
      totalMoney: ""
    };
  },
  //   beforeCreate(){

  // },
  created() {
    // 接受详情页那边传来的商品id逗号分开
    getDIZ()
      .then(res => {
        this.letter = res.data.data;
        this.addressID = res.data.data.user_address_id;
        // console.log(this.letter);
        if (this.letter.length == 0) {
          this.show = false;
          this.shoiw = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });

    // 发送请求
    Confirtwo(this.routerParams, this.routerParamb, this.routerParamo, 111)
      .then(res => {
        this.json = res.data.data.wish_list.list;
        this.moneyAll = res.data.data.wish_list.total_money;
        var userID = localStorage.getItem("userID");
        console.log(userID);
        crowd_funding(this.routerParams)
          .then(res => {
            res = res.data;
            if (res.status && res.data) {
              const data = res.data;
              // console.log(data);
              const routerParama = data.reality_money;
              if (data.class_name == "活动专区") {
                this.aa = false;
                this.aas = true;
                // let moeysA = this.json[0].options[0].support_money;

                let nums = this.moneyAll - routerParama;
                const newmoneyS = nums * this.routerParamo;
                this.newmoney = newmoneyS.toFixed(2);
                if (this.newmoney < 0) {
                  this.newmoney = 0.0;
                }
                this.totalMoney = this.moneyAll - this.newmoney;
              }else{
                 this.totalMoney = this.moneyAll - this.newmoney;
              }
            }
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
        if (this.moneyAll == "0.01") {
          this.newmoney = 0.0;
          this.totalMoney = this.moneyAll - this.newmoney;
        }
      })
      .catch(err => {
        // 清楚token 重新授权
        this.$router.push('/phone')
        // window.localStorage.clear();
        console.log(err, "请求失败");
      });

    coupon(111)
      .then(res => {
        this.list = res.data.data.data;
        this.num = res.data.data.total;
        if (this.num == 0) {
          this.ispic = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    this.$toast({
      type: "loading",
      message: "加载中...",
      duration: "1250"
    });
    setTimeout(() => {
      this.showCon = true;
    }, 1300);
  },
  // computed() {},
  methods: {
    address() {
      this.$router.push({
        path: "/shouhuo"
      });
    },
    addresssw() {
      this.$router.push({
        path: "/tianjia"
      });
    },
    showList() {
      this.shows = true;
    },
    prices(plice, num, id, title) {
      // console.log(this.moneyAll);
      if (plice < this.moneyAll) {
        this.shows = false;
        this.newmoney = num;
        this.juan = title;
        this.saleING = "优惠卷与猴集卡不能同时使用";
        this.totalMoney = this.moneyAll - num;
        // console.log("idnum=" + this.idNum);
        // console.log("id" + id);
        // console.log(this.idNum != id);
        if (this.idNum != id) {
          this.idNum = id;
        }
      } else {
        this.$toast({
          message: "不满足优惠条件不可用",
          duration: "500"
        });
        this.juan = "";
      }
    },
    showLists() {
      this.$router.push("/onsale");
    },
    clickOverlay() {
      this.newmoney = this.moneyAll * 0.05;
      this.totalMoney = this.moneyAll - this.newmoney;
      this.saleING = "";
    },
    hitImg() {
      this.$router.push("/linjuan");
    },
    HIt() {
      if (this.addressID == undefined) {
        this.$toast({
          message: "请输入地址",
          duration: "1000"
        });
        return false;
      }
      let naid = localStorage.getItem("openids");
      console.log(naid);
      const arry = [
        this.details,
        // this.we_chat,
        this.routerParams,
        this.routerParamb,
        this.addressID,
        this.totalMoney,
        this.routerParamo,
        this.liuyab,
        this.idNum,
        naid
      ];
      this.$router.push({
        path: "/zhifu",
        query: {
          dataObja: arry[0],
          dataObjb: arry[1],
          dataObjc: arry[2],
          dataObjd: arry[3],
          dataObje: arry[4],
          dataObjf: arry[5],
          dataObjg: arry[6],
          dataObjh: arry[7],
          dataObji: arry[8]
        }
      });
      // bus.$emit(
      //   "AllChange",
      //   this.details,
      //   this.we_chat,
      //   this.routerParams,
      //   this.routerParamb,
      //   this.addressID,
      //   this.totalMoney,
      //   this.routerParamo,
      //   this.liuyab,
      //   this.idNum,
      //   naid
      // );
      // this.$router.push("/zhifu");
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.WrapAll >>> .van-tab, .van-tab--active {
  width: 100%;
  position: fixed;
}

.WrapAll >>> .van-tabs__content--animated {
  overflow: visible;
  height: 450px;
}

.WrapAll >>> .van-tabs__content--animated::-webkit-scrollbar {
  display: none;
}

.sameInput {
  width: 80%;
}

.sameInput input::-webkit-input-placeholder {
  color: #999;
}

.sameInput input {
  color: #999;
}

.sameInput {
  display: flex;
  align-items: center;
}

.sameInput span {
  margin-top: -2px;
}

.middles {
  text-align: center;
  padding: 15px 0;
}

.middlea {
  color: #fff;
  background: #eeeeee;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  margin-left: 47%;
  margin-bottom: 8px;
}

.middleW {
  font-size: 14px;
  font-weight: 550;
  font-family: PingFangSC-Regular;
  color: rgba(2, 2, 2, 1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 20px 0;
}

.word span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wordea {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-top: 8px;
  line-height: 1.5;
}

.WrapAll >>>.van-tabs__line {
  display: none;
}

.WrapAll >>>.van-ellipsis {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.hitImg {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 50px 0;
}

.hitImg img {
  width: 50%;
}

.hitImg .contenr {
  margin-top: 5px;
  color: #999;
}

.numsN {
  display: flex;
  align-items: center;
}

.datas {
  font-size: 12px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 10px;
}

.nums {
  font-size: 18px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.num {
  font-size: 36px;
  font-family: SanFranciscoDisplay-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}

.nows {
  padding: 5px 10px;
  border: 2px solid #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  border-radius: 5px;
}

.numl {
  font-size: 18px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.middlesa {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.content {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 15px;
  left: 7.2%;
}

.wrapCenter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4.4%;
  margin-top: 25px;
}

.wrapMiddle {
  flex-direction: column;
  display: flex;
  align-items: center;
}

.smae {
  padding-bottom: 20px;
}

.wrap {
  margin-top: 20px;
}

.middle {
  padding: 20px 0 0 0;
}

.same {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.numZ {
  display: flex;
  align-items: center;
}

.same_ {
  color: #999;
}

.people {
  font-size: 14px;
}

.peosn {
  margin-top: -2px;
}

.people input::-webkit-input-placeholder {
  color: #999;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.houji {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.zhic {
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 15px 0;
}

.bottom {
  padding: 20px 0 65px 0;
}

.top {
  display: flex;
  align-items: center;
}

.item {
  display: flex;
  margin-top: 16px;
}

.top img {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.topWord {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-left: 8px;
  margin-top: -2px;
}

.left {
  width: 23%;
  height: 80px;
}

.left img {
  width: 100%;
  border-radius: 5px;
  height: 77.83px;
}

.allW {
  margin-top: 8px;
}

.right {
  width: 73%;
  margin-left: 3%;
}

.bottom_all {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.titlew {
  margin-top: 5px;
}

.title {
  display: flex;
  justify-content: space-between;
}

.titleWord {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 550;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2;
  margin-top: 2px;
}

.detailsame {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  width: 83%;
  margin-top: 8px;
  line-height: 1.2;
}

.pricr {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.pNUM {
  font-size: 14px;
  font-family: Helvetica;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-align: right;
  margin-top: 5px;
}

.bottoms {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 3.2%;
  height: 50px;
  background: #fff;
  border-top: 8px solid #eee;
  overflow: hidden;
}

.money {
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(210, 22, 35, 1);
}

.monn {
  background: rgba(210, 22, 35, 1);
  height: 50px;
  width: 115px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 15px;
}

@media (max-width: 330px) {
  .nows {
    padding: 3px 6px;
  }

  .content {
    bottom: 6px;
  }
}
</style>
