<template>
  <div>
    <div class="middle container">
      <div class="same">
        <div>
          优惠卷：
          <span class="same_">暂无可用</span>
        </div>
        <div>
          <span style="margin-right:10px" class="same_" @click="showList">{{num}}张</span>
          <img :src="wx" style="vertical-align: bottom;">
        </div>
      </div>
      <div class="same houji">
        <div>
          猴集卡：
          <span class="same_">享受95折优惠</span>
        </div>
        <div>
          <img :src="wx" style="vertical-align: bottom;">
        </div>
      </div>
      <div class="same zhic">
        <span>支持金额</span>
        <span>¥{{moneyAll}}</span>
      </div>
      <div class="same">
        <span>活动优惠</span>
        <span>-¥{{newmoney}}.00</span>
      </div>
      <div class="same zhic" style="border-bottom:1px solid #eee">
        <span>配送费用</span>
        <span>¥0.00</span>
      </div>
      <div class="people zhic">
        <span class="peosn">买家留言：</span>
        <input type="text" placeholder="您可以在此给卖家留言">
      </div>
    </div>
    <div style="background:#eee;height:8px"></div>

    <!-- 优惠券列表 -->
    <van-popup v-model="show" position="bottom" @click-overlay="clickOverlay">
      <van-tabs v-model="active" swipeable animated>
        <van-tab title="未使用">
          <div class="hitImg" v-show="ispic">
            <img src="@/assets/linjuan/5.png">
            <div class="contenr">暂时无优惠卷，赶快去领取吧！</div>
          </div>
          <div class="smae">
            <div class="wrap container" v-for="(item , index) in list" :key="item.id" :style="note">
              <div class="wrapCenter">
                <div class="numsN">
                  <span class="nums">¥</span>
                  <span class="num">{{item.amount_limit}}</span>
                </div>
                <div class="wrapMiddle">
                  <span class="middles">{{item.title}}</span>
                  <span
                    class="datas"
                  >{{item.start_time | formatDate}}-{{item.end_time | formatDate}}</span>
                </div>
                <div class="nows" @click="prices(item.amount_limit,item.num,item.vouchers_id)">去使用</div>
              </div>
              <div class="content">全场产品可以使用；限时活动通用优惠卷可以叠加使用</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已使用">
          <div class="smaes">
            <div class="hitImg" v-show="ispics">
              <img src="@/assets/linjuan/5.png">
              <div class="contenr">赶快去使用优惠卷吧！</div>
            </div>
            <div
              class="wrap container"
              v-for="(item , index) in lists"
              :key="item.id"
              :style="noteone"
            >
              <div class="wrapCenter">
                <div class="numsN">
                  <span class="nums">¥</span>
                  <span class="num">500</span>
                </div>
                <div class="wrapMiddle">
                  <span class="middles">全场每满500减60</span>
                  <span
                    class="datas"
                  >{{item.start_time | formatDate}}-{{item.end_time | formatDate}}</span>
                </div>
                <div class="nows">已使用</div>
              </div>
              <div class="content">全场产品可以使用；限时活动通用优惠卷可以叠加使用</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已失效">
          <div class="smaes">
            <div class="hitImg" v-show="ispicss">
              <img src="@/assets/linjuan/5.png">
              <div class="contenr">保持不错，还没有错过优惠卷！</div>
            </div>
            <div
              class="wrap container"
              v-for="(item , index) in listss"
              :key="item.id"
              :style="noteone"
            >
              <div class="wrapCenter">
                <div class="numsN">
                  <span class="nums">¥</span>
                  <span class="num">500</span>
                </div>
                <div class="wrapMiddle">
                  <span class="middles">全场每满500减60</span>
                  <span
                    class="datas"
                  >{{item.start_time | formatDate}}-{{item.end_time | formatDate}}</span>
                </div>
                <div class="nows">已失效</div>
              </div>
              <div class="content">全场产品可以使用；限时活动通用优惠卷可以叠加使用</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { coupon } from "@/components/axios/api";
import { Tab, Tabs } from "vant";

Vue.use(Tab).use(Tabs);

import { Popup } from "vant";
import { Toast } from "vant";
Vue.use(Toast);
Vue.use(Popup);
import bus from "@/bus/bus";
export default {
  name: "ConfirMiddle",
  props: {
    moneyAll: Number
  },
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
      note: {
        backgroundImage: "url(" + require("@/assets/linjuan/1.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: 125 + "px",
        overflow: "hidden"
      },
      noteone: {
        backgroundImage: "url(" + require("@/assets/linjuan/3.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: 125 + "px",
        overflow: "hidden"
      },
      wx: require("@/assets/right_.png"),
      show: false,
      active: 0,
      list: [],
      num: "",
      lists: [],
      listss: [],
      ispic: false,
      ispics: false,
      ispicss: false,
      newmoney: 0,
      idNum: 0
    };
  },
  created() {
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
    coupon(112)
      .then(res => {
        this.lists = res.data.data.data;
        if (this.lists.length == 0) {
          this.ispics = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });

    coupon(113)
      .then(res => {
        this.listss = res.data.data.data;
        if (this.listss.length == 0) {
          this.ispicss = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    showList() {
      this.show = true;
    },
    prices(plice, num, id) {
      bus.$emit("priceChange", plice, num,id);
      if (plice < this.moneyAll) {
        this.show = false;
        this.newmoney = num;
        console.log("idnum=" + this.idNum);
        console.log("id" + id);
        console.log(this.idNum != id);
        if (this.idNum != id) {
          // this.moneyAlls = parseFloat(this.moneyAlls);
          // num = parseFloat(num);
          // this.moneyAlls = this.moneyAlls - num;
          // this.show = false;
          // this.newmoney = num;
          this.idNum = id;
        }
      } else {
        Toast("优惠卷不可用");
      }
    },
    clickOverlay() {
      this.newmoney = 0;
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.hitImg {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.hitImg img {
  width: 50%;
  margin-top: 20%;
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

.middles {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

// .smaes {
// height: 500px;
// }
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
</style>
