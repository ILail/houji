<template>
  <div>
    <div class="bottom">
      <div class="money">
        合计金额:
        <span style="margin-left:8px;font-size:18px">¥{{moneyAlls}}</span>
      </div>
      <div class="monn" @click="HIt">立即下单</div>
    </div>
  </div>
</template>

<script>
import { detailM } from "@/components/axios/api";
import { getDIZ } from "@/components/axios/api";
import bus from "@/bus/bus.js";
import axios from "axios";
import secret from "@/utils/utils";
// var ajax = new XMLHttpRequest();
// ajax.open("get", "http://www.nguiba.com/api/makeCode");
// ajax.send();
// ajax.onreadystatechange = function() {
//   if (ajax.readyState == 4 && ajax.status == 200) {
//     console.log(ajax.responseText);
//   }
// };
export default {
  name: "ConfirBottom",
  props: {
    moneyAll: Number
  },
  data() {
    return {
      wx: require("@/assets/right_.png"),
      wxone: require("@/assets/mine/xu.png"),
      details: "details",
      we_chat: "wx_pub",
      moneyAlls: this.moneyAll,
      oppenID: "",
      vouchers_id: 0,
      addressID: ""
    };
  },
  created() {
    getDIZ()
      .then(res => {
        this.addressID = res.data.data.user_address_id;
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    bus.$on("priceChange", (price, num, id) => {
      console.log(id);
      this.vouchers_id = id;
    });
  },
  methods: {
    HIt() {
      let routerParams = this.$route.query.dataObjo; //id
      let routerParamb = this.$route.query.dataObjb; //回报id
      let routerParamo = this.$route.query.dataObjc; //数量
      var naid = localStorage.getItem("key");
      console.log(
        this.details,
        this.we_chat,
        routerParams,
        routerParamb,
        this.addressID,
        this.moneyAlls,
        routerParamo,
        "",
        "我是小小舒",
        naid
      );
      detailM(
        this.details,
        this.we_chat,
        routerParams,
        routerParamb,
        this.addressID,
        this.moneyAlls,
        routerParamo,
        "",
        "我是小小舒",
        this.vouchers_id,
        naid
      )
        .then(res => {
          console.log(res);
          var pingpp = require("pingpp-js");
          const num = secret.Decrypt(res.data.data);
          console.log(num);
          pingpp.createPayment(num, function(result, err) {
            // object 需是 Charge/Order/Recharge 的 JSON 字符串
            // 可按需使用 alert 方法弹出 log
            console.log(123);
            console.log(result);
            console.log(err.msg);
            console.log(err.extra);
            if (result == "success") {
              // 只有微信JSAPI (wx_pub)、微信小程序（wx_lite）、QQ 公众号 (qpay_pub)、支付宝小程序（alipay_lite）支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
            } else if (result == "fail") {
              // Ping++ 对象 object 不正确或者微信JSAPI/微信小程序/QQ公众号支付失败时会在此处返回
            } else if (result == "cancel") {
              // 微信JSAPI、微信小程序、QQ 公众号、支付宝小程序支付取消支付
            }
          });
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.bottom {
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
</style>
