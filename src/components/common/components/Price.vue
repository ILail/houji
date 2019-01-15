<template>
  <div>
    <div class="middle container">
      <div class="same">
        <div>
          优惠卷：
          <span class="same_">暂无可用</span>
        </div>
        <div>
          <span style="margin-right:10px" class="same_" @click="showList">0张</span>
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
        <span>-¥0.00</span>
      </div>
      <div class="same zhic" style="border-bottom:1px solid #eee">
        <span>配送费用</span>
        <span>¥0.00</span>
      </div>
      <div class="people zhic">
        <span>买家留言：</span>
        <input type="text" placeholder="您可以在此给卖家留言">
      </div>
    </div>
    <div style="background:#eee;height:8px"></div>

    <!-- 优惠券列表 -->
    <van-popup v-model="show" position="bottom">
      <van-tabs v-model="active" swipeable animated>
        <van-tab title="未使用">
          <div class="smae">
            <div class="wrap container" v-for="(item , index) in list" :key="item.id" :style="note">
              <div class="wrapCenter">
                <div class="numsN">
                  <span class="nums">¥</span>
                  <span class="num">500</span>
                </div>
                <div class="wrapMiddle">
                  <span class="middles">全场每满500减60</span>
                  <span class="datas">2018.11.11-2018.11.13</span>
                </div>
                <div class="nows">去使用</div>
              </div>
              <div class="content">全场产品可以使用；限时活动通用优惠卷可以叠加使用</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已使用">
          <div class="smaes"></div>
        </van-tab>
        <van-tab title="已失效">
          <div class="smaes"></div>
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

Vue.use(Popup);

export default {
  name: "ConfirMiddle",
  props: {
    moneyAll: Number
  },
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("@/assets/linjuan/1.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        // width: 75 + "px",
        height: 125 + "px",
        overflow:"hidden"
      },
      wx: require("@/assets/right_.png"),
      show: false,
      active: 0,
      list: []
    };
  },
  created() {
    coupon(111)
      .then(res => {
        this.list = res.data.data.data;
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // coupon(112)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err, "请求失败");
    //   });

    // coupon(113)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err, "请求失败");
    //   });
  },
  methods: {
    showList() {
      this.show = true;
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
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

.smaes {
  height: 500px;
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

.same_ {
  color: #999;
}

.people {
  font-size: 14px;
}

.people input::-webkit-input-placeholder {
  color: #999;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.houji {
  padding: 10px 0 10px 0;
  border-bottom: 1px solid #eee;
}

.zhic {
  padding: 10px 0 10px 0;
}
</style>
