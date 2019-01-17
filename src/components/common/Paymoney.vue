<template>
  <div class="active">
    <div style="background:#fff">
      <div class="fnagshi">支付金额</div>
      <div class="sdsword">
        <span class="sthf">¥</span>
        <input type="text" class="sthf" v-model="moneys" style="margin-left:10px">
      </div>
    </div>

    <div style="background:#fff;margin-top:10px">
      <div class="fnagshi">支付方式</div>
      <div class="wx" style="border-bottom:1px solid #eee">
        <div>
          <img src="@/assets/yue.png" class="wxIMG">
          <span class="righta">余额支付</span>
        </div>
        <img :src="imgSrc" class="zfbIMG" ref="imgAlls" @click="yue">
      </div>
      <div class="wx" style="border-bottom:1px solid #eee">
        <div>
          <img src="@/assets/wx.png" class="wxIMG">
          <span class="righta">微信支付</span>
        </div>
        <img :src="imgSrc" class="zfbIMG" ref="imgAllo" @click="wx">
      </div>

      <div class="zfb">
        <div>
          <img src="@/assets/zfb.png" class="wxIMG">
          <span class="righta">支付宝支付</span>
        </div>
        <img :src="imgSrc" class="zfbIMG" ref="imgAllt" @click="zfb">
      </div>
    </div>

    <div class="action" @click="nowWay">立即支付</div>
  </div>
</template>

<script>
import secret from "@/utils/utils";
import { detailM } from "@/components/axios/api";
export default {
  data() {
    return {
      bgImg: [require("@/assets/xuan.png"), require("@/assets/xu.png")],
      imgIndex: 0,
      imgIndexa: 1,
      pay_style: this.$route.query.dataObja,
      pay_type: "",
      crowd_funding_id: this.$route.query.dataObjb,
      crowd_funding_return_id: this.$route.query.dataObjc,
      address_id: this.$route.query.dataObjd,
      moneys: this.$route.query.dataObje,
      crowd_funding_return_num: this.$route.query.dataObjf,
      mark: this.$route.query.dataObjg,
      vouchers_id: this.$route.query.dataObjh,
      open_id: this.$route.query.dataObji
    };
  },
  mounted() {},
  computed: {
    imgSrc() {
      return this.bgImg[this.imgIndex];
    }
  },
  methods: {
    wx() {
      this.$refs.imgAllo.src = this.bgImg[this.imgIndexa];
      this.$refs.imgAllt.src = this.bgImg[this.imgIndex];
      this.$refs.imgAlls.src = this.bgImg[this.imgIndex];
      this.pay_type = "wx_pub";
    },
    zfb() {
      this.$refs.imgAllt.src = this.bgImg[this.imgIndexa];
      this.$refs.imgAllo.src = this.bgImg[this.imgIndex];
      this.$refs.imgAlls.src = this.bgImg[this.imgIndex];
      this.pay_type = "alipay";
    },
    yue() {
      this.$refs.imgAlls.src = this.bgImg[this.imgIndexa];
      this.$refs.imgAllo.src = this.bgImg[this.imgIndex];
      this.$refs.imgAllt.src = this.bgImg[this.imgIndex];
      this.pay_type = "balance";
    },
    nowWay() {
      console.log(this.pay_type);
      if (this.pay_type == "alipay") {
        this.$toast({
          message: "模式控制",
          duration: "500"
        });
        return false;
      }
      if (this.pay_type == "balance") {
        this.$toast({
          message: "余额支付",
          duration: "500"
        });
        return false;
      }
      if (this.pay_type == "") {
        this.$toast({
          message: "请先选择支付方法",
          duration: "1000"
        });
        return false;
      }
      detailM(
        this.pay_style,
        this.pay_type,
        this.crowd_funding_id,
        this.crowd_funding_return_id,
        this.address_id,
        this.moneys,
        this.crowd_funding_return_num,
        this.mark,
        this.vouchers_id,
        this.open_id
      )
        .then(res => {
          console.log(res);
          var pingpp = require("pingpp-js");
          const num = secret.Decrypt(res.data.data);
          console.log(num);
          pingpp.createPayment(num, function(result, err) {
            // object 需是 Charge/Order/Recharge 的 JSON 字符串
            // 可按需使用 alert 方法弹出 log
            var _this = this;
            console.log(result);
            console.log(err.msg);
            console.log(err.extra);
            if (result == "success") {
              console.log(123);
              _this.$router.push("/finish");
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

