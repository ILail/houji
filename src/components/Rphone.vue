<template>
  <div class="wrap">
    <img src="@/assets/trad/1.png" class="img">
    <div class="content" :style="backgroundDiv">
      <div class="title">
        <img src="@/assets/trad/3.png" alt>
        <span>集选全球健康食材</span>
        <img src="@/assets/trad/4.png" alt>
      </div>
      <input
        type="text"
        class="imputO"
        maxlength="11"
        placeholder="请输入手机号"
        v-model="tel"
        @blur.prevent="inputs()"
      >
      <div class="wrapT">
        <input
          type="text"
          placeholder="请输入验证码"
          maxlength="6"
          class="imputB"
          v-model="code"
          @blur.prevent="inputs()"
        >
        <span class="GETm" @click="time" v-if="active">获取验证码</span>
        <span class="GETm" v-else>{{timed}}s重新发送</span>
      </div>
      <div class="now" @click="now" v-if="showN">立即领取</div>
      <div class="nows" v-else>领取成功</div>
    </div>
    <div class="rouls">规则详情</div>
    <div class="flex">
      <span class="yuan">1</span>
      <span class="word">输入手机号注册登陆领取好友转赠，下载猴集app查看礼品</span>
    </div>

    <div class="flex">
      <span class="yuan">2</span>
      <span class="word">猴集app商城我的仓库可以查看</span>
    </div>

    <div class="flex" style="padding-bottom:10px">
      <span class="yuan">3</span>
      <span class="word">本活动最终解释权归猴集所有</span>
    </div>
  </div>
</template>
<script>
import { yzm } from "@/components/axios/api";
import { verifyCode } from "@/components/axios/api";
import { tradeReceive } from "@/components/axios/api";
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  data() {
    return {
      tel: "",
      code: "",
      active: true,
      timed: 0,
      code_type: "land",
      showN: true,
      backgroundDiv: {
        backgroundImage: "url(" + require("@/assets/trad/2.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: 250 + "px"
      }
    };
  },
  methods: {
    inputs() {
      setTimeout(function() {
        var scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    time() {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.tel)) {
        this.$toast({
          message: "手机号码有误，请重填",
          duration: "1000"
        });
      } else {
        this.timed = 60;
        this.active = false;
        var auth_timetimer = setInterval(() => {
          this.timed--;
          if (this.timed <= 0) {
            this.active = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
        yzm(this.tel, this.code_type)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
      }
    },
    now() {
      let url = window.location.href;
      // console.log(url.split("?")[1].split("=")[1]);
      // let url = "http://webtest.ngba.cn/verify?shuyuhan=110";
      // console.log(url.split("?")[1].split("=")[1]);
      if (this.code == "") {
        this.$toast({
          message: "验证码不能为空",
          duration: "1000"
        });
        return false;
      }
      verifyCode(this.tel, this.code)
        .then(res => {
          console.log(res);
          if (res.data.message == "验证成功") {
            // alert("验证码成功");
            const id = url
              .split("?")[1]
              .split("=")[1]
              .split("&")[0];
            // alert(id);

            tradeReceive(this.tel, id)
              .then(res => {
                if (res.data.message == "领取成功") {
                  this.$toast({
                    message: "领取成功",
                    duration: "2500"
                  });
                  this.showN = false;
                  this.tel = "";
                  this.code = "";
                } else {
                  this.$toast({
                    message: res.data.message,
                    duration: "2500"
                  });
                }
              })
              .catch(err => {
                console.log(err, "请求失败");
              });
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  },
  mounted() {}
};
</script>
<style  lang="stylus" scoped>
.wrap {
  background-color: #29100D;
}

.nows {
  width: 70%;
  height: 45px;
  margin-left: 15%;
  line-height: 45px;
  text-align: center;
  margin-top: 15px;
  background: linear-gradient(90deg, rgba(123, 52, 21, 1), rgba(204, 166, 88, 1), rgba(195, 144, 80, 1));
  border-radius: 5px;
  border-bottom: 2px solid #76191A;
  font-size: 22px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #fff;
}

.img {
  width: 90%;
  padding: 25px 5%;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 15px 17%;
}

.title img {
  width: 40px;
}

.title span {
  font-size: 17px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(214, 164, 118, 1);
  margin-top: -2px;
}

.wrap .imputO {
  height: 38px;
  width: 67%;
  margin-left: 15%;
  background: rgba(240, 240, 240, 1);
  border: 1px solid rgba(214, 171, 73, 1);
  border-radius: 5px;
  padding: 0 0 0 10px;
}

input::-webkit-input-placeholder {
  font-size: 14px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
}

.wrapT {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin-left: 15%;
  margin-top: 15px;
}

.wrapT .imputB {
  width: 50%;
  height: 38px;
  border-radius: 5px;
  padding: 0 0 0 10px;
  border: 1px solid rgba(214, 171, 73, 1);
  background: rgba(240, 240, 240, 1);
}

.GETm {
  padding: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(79, 8, 11, 1);
  background: #E8C36F;
  border-radius: 5px;
}

.now {
  width: 70%;
  height: 45px;
  margin-left: 15%;
  line-height: 45px;
  text-align: center;
  margin-top: 15px;
  background: linear-gradient(90deg, rgba(123, 52, 21, 1), rgba(204, 166, 88, 1), rgba(195, 144, 80, 1));
  border-radius: 5px;
  border-bottom: 2px solid #76191A;
  font-size: 22px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(62, 18, 26, 1);
}

.rouls {
  text-align: center;
  margin-top: 25px;
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(233, 205, 150, 1);
}

.yuan {
  width: 15px;
  height: 15px;
  background: rgba(113, 0, 8, 1);
  border-radius: 50%;
  text-align: center;
  line-height: 15px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(220, 157, 133, 1);
}

.flex {
  display: flex;
  align-items: center;
  width: 92%;
  margin-left: 4%;
}

.flex .word {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  margin-left: 5px;
}
</style>


