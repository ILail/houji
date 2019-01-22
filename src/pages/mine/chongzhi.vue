<template>
  <div class="active">
    <div style="background:#fff">
      <div class="fnagshi">充值金额</div>
      <div class="sdsword">
        <span class="sthf">¥</span>
        <input type="tel" class="sthf" v-model="moneys" style="margin-left:10px">
      </div>
    </div>

    <div style="background:#fff;margin-top:10px">
      <div class="fnagshi">充值方式</div>
      <div class="wx" style="border-bottom:1px solid #eee">
        <div>
          <img src="@/assets/wx.png" class="wxIMG">
          <span class="righta">微信支付</span>
        </div>
        <img :src="imgSrc" class="zfbIMG" ref="imgAllo" @click="wx">
      </div>
      <!-- 
      <div class="zfb">
        <div>
          <img src="@/assets/zfb.png" class="wxIMG">
          <span class="righta">支付宝支付</span>
        </div>
        <img :src="imgSrc" class="zfbIMG" ref="imgAllt" @click="zfb">
      </div>-->
    </div>

    <div class="action" @click="nowWay">立即充值</div>
  </div>
</template>

<script>
import { getChong } from "@/components/axios/api";
import secret from "@/utils/utils";
// import Pingpp from "@/bus/charge.js";
// import Swiper from "moon/swiper.min";
export default {
  data() {
    return {
      bgImg: [require("@/assets/xuan.png"), require("@/assets/xu.png")],
      imgIndex: 0,
      imgIndexa: 1,
      moneys: "",
      channel: ""
    };
  },
  computed: {
    imgSrc() {
      return this.bgImg[this.imgIndex];
    }
  },
  methods: {
    wx() {
      this.$refs.imgAllo.src = this.bgImg[this.imgIndexa];
      // this.$refs.imgAllt.src = this.bgImg[this.imgIndex];
      this.channel = "wx_pub";
    },
    // zfb() {
    //   this.$refs.imgAllt.src = this.bgImg[this.imgIndexa];
    //   this.$refs.imgAllo.src = this.bgImg[this.imgIndex];
    //   this.channel = "alipay";
    // },
    nowWay() {
      // 获取opdId
      var naid = localStorage.getItem("key");
      var pingpp = require("pingpp-js");
      if (this.channel == "alipay") {
        this.$toast({
          message: "模式控制",
          duration: "500"
        });
        return false;
      }
      if (this.moneys == "") {
        this.$toast({
          message: "请输入金额",
          duration: "500"
        });
        return false;
      }
      if (this.channel == "") {
        this.$toast({
          message: "请选择方式",
          duration: "500"
        });
        return false;
      }
      getChong(this.channel, this.moneys * 100, naid)
        .then(res => {
          const num = secret.Decrypt(res.data.data);
          // console.log(res.data);
          // if (res.data.status == 0) {
          //   this.$toast({
          //     message: "输入金额不能小于1",
          //     duration: "2000"
          //   });
          // }
          var _this = this;
          pingpp.createPayment(num, function(result, err) {
            if (result == "success") {
              _this.$toast({
                message: "充值成功",
                duration: "2000"
              });
              // 只有微信公众账号 (wx_pub)、微信小程序 (wx_lite)、QQ 公众号 (qpay_pub)、支付宝口碑 (alipay_qr)
              // 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
            } else if (result == "fail") {
              console.log(2);
              // data 不正确或者微信公众账号/微信小程序/QQ 公众号/支付宝口碑支付失败时会在此处返回
            } else if (result == "cancel") {
              console.log(3);
              // 微信公众账号、微信小程序、QQ 公众号、支付宝口碑支付取消支付
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
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.sdsword {
  padding-left: 2%;
  display: flex;
  align-items: center;
}

.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
}

.heard {
  text-align: center;
  overflow: hidden;
}

.action {
  text-align: center;
  line-height: 50px;
  height: 50px;
  background: rgba(210, 22, 35, 1);
  border-radius: 5px;
  font-size: 15px;
  color: #fff;
  margin-top: 30px;
  width: 96%;
  margin-left: 2%;
}

.wxIMG {
  width: 40px;
}

.zfbIMG {
  width: 18px;
}

.wx, .zfb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 2% 8px 2%;
}

.fnagshi {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-left: 2%;
  padding-top: 8px;
  padding-bottom: 13px;
}

.sthf {
  font-size: 24px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
}

.righta {
  margin-left: 10px;
}
</style>

