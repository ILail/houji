<template>
  <div class="active">
    <div style="background:#fff">
      <div class="fnagshi">支付金额</div>
      <div class="sdsword">
        <span class="sthf">¥</span>
        <input type="text" class="sthf" v-model="amount" style="margin-left:10px">
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

      <!-- <div class="zfb">
        <div>
          <img src="@/assets/zfb.png" class="wxIMG">
          <span class="righta">支付宝支付</span>
        </div>
        <img :src="imgSrc" class="zfbIMG" ref="imgAllt" @click="zfb">
      </div>-->
    </div>

    <div class="action" @click="nowWay">立即支付</div>
    <van-popup v-model="show" @click-overlay="clickOverlay">
      <div class="wrapPase">
        <img src="@/assets/cha.png" class="cha" @click="cha">
        <span>请输入支付密码</span>
        <span></span>
      </div>
      <div class="lines"></div>
      <div class="pricess">
        <span>¥</span>
        <span>{{amount}}</span>
      </div>
      <!-- <div class="inputS">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>-->

      <van-password-input :value="value" @focus="showKeyboard = true"/>
    </van-popup>

    <van-number-keyboard
      extra-key="."
      close-button-text="完成"
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @close="closeA"
      theme="custom"
      :style="Zindex"
    />
  </div>
</template>

<script>
import Vue from "vue";
import secret from "@/utils/utils";
import { zfuM } from "@/components/axios/api";
import { buyResell } from "@/components/axios/api";

import { NumberKeyboard } from "vant";
import { Button } from "vant";
import { PasswordInput } from "vant";

Vue.use(PasswordInput);
Vue.use(Button);
Vue.use(NumberKeyboard);

export default {
  data() {
    return {
      bgImg: [require("@/assets/xuan.png"), require("@/assets/xu.png")],
      show: false,

      imgIndex: 0,
      imgIndexa: 1,
      value: "",
      pay_type: "",
      code: "",
      showKeyboard: false,
      Zindex: {
        zIndex: 99999
      },
      trade_id: this.$route.query.arry[0],
      nums: this.$route.query.arry[1],
      address_id: this.$route.query.arry[2],
      amount: this.$route.query.arry[3]
    };
  },
  computed: {
    imgSrc() {
      return this.bgImg[this.imgIndex];
    }
  },
  methods: {
    cha() {
      this.show = false;
      this.showKeyboard = false;
    },
    clickOverlay() {
      this.showKeyboard = false;
    },
    wx() {
      this.$refs.imgAllo.src = this.bgImg[this.imgIndexa];
      this.$refs.imgAlls.src = this.bgImg[this.imgIndex];
      this.pay_type = "wx_pub";
    },

    yue() {
      this.$refs.imgAlls.src = this.bgImg[this.imgIndexa];
      this.$refs.imgAllo.src = this.bgImg[this.imgIndex];
      this.pay_type = "balance";
    },
    nowWay() {
      if (this.pay_type == "") {
        this.$toast({
          message: "请选择支付方式",
          duration: "1500"
        });
      }
      if (this.pay_type == "balance") {
        switch (this.code) {
          case 0:
            this.show = false;
            this.showKeyboard = false;
            this.$toast({
              message: "请先设置支付密码",
              duration: "1000"
            });
            setTimeout(() => {
              this.$router.push("/zfu");
            }, 1500);
            break;
          case 1:
            this.show = true;
            this.showKeyboard = true;
        }
      }
      if (this.pay_type == "wx_pub") {
        buyResell(
          this.trade_id,
          this.nums,
          this.pay_type,
          this.address_id,
          this.value,
          this.amount
        )
          .then(res => {
            console.log(res);
            var pingpp = require("pingpp-js");
            const num = secret.Decrypt(res.data.data);
            console.log(num);
            var _this = this;
            pingpp.createPayment(num, function(result, err) {
              // object 需是 Charge/Order/Recharge 的 JSON 字符串
              // 可按需使用 alert 方法弹出 log

              console.log(result);
              console.log(err.msg);
              console.log(err.extra);
              if (result == "success") {
                // alert("123")
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
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      // console.log(this.value)
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    closeA() {
      // 确认的回调
      if (this.value.length == "6") {
        // this.show = false;
        // this.showKeyboard = false;
        // console.log()
        // 余额支付
        buyResell(
          this.trade_id,
          this.nums,
          this.pay_type,
          this.address_id,
          this.value,
          this.amount
        )
          .then(res => {
            console.log(res);
            if (res.data.message == "支付密码错误!") {
              this.$toast({
                message: "支付密码错误!",
                duration: "1500"
              });
            }
            if (res.data.message == "余额不足!") {
              this.$toast({
                message: "余额不足请充值",
                duration: "1500"
              });
              setTimeout(() => {
                this.$router.push("/chongzhi");
              }, 2000);
            }
            if (res.data.message == "买入成功") {
              this.show = false;
              this.showKeyboard = false;
              this.$toast({
                message: "支付成功",
                duration: "1500"
              });
              setTimeout(() => {
                this.$router.push("/finish");
              }, 2000);
            }
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
      } else {
        this.$toast({
          message: "请输入6位数字密码",
          duration: "1000"
        });
      }
    }
  },
  created() {
    zfuM()
      .then(res => {
        this.code = res.data.data.code;
        console.log(this.code);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    // console.log(this.trade_id);
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.active >>> .van-password-input__security {
  height: 35px;
  padding: 20px 5% 20px 5%;
  width: 90%;
}

.active >>> .van-password-input__security li:nth-child(1) {
  border-left: 1px solid #414141;
}

.active >>> .van-password-input__security li {
  border-top: 1px solid #414141;
  border-right: 1px solid #414141;
  border-bottom: 1px solid #414141;
}

.active >>> .van-popup {
  width: 90%;
  border-radius: 2px;
  top: 40%;
  padding-bottom: 10px;
}

.wrapPase {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5%;
}

.wrapPase span {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(65, 65, 65, 1);
}

.lines {
  width: 100%;
  height: 1px;
  background: rgba(204, 204, 204, 0.6);
}

.pricess {
  font-size: 28px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(65, 65, 65, 1);
  text-align: center;
  padding: 18px 0;
}

.inputS {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}

.inputS span:nth-child(1) {
  border-left: 1px solid #414141;
}

.inputS span {
  height: 32px;
  width: 42px;
  border-top: 1px solid #414141;
  border-right: 1px solid #414141;
  border-bottom: 1px solid #414141;
}

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
  font-family: PingFangSC-Medium;
  font-weight: 500;
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

.cha {
  width: 13px;
}
</style>

