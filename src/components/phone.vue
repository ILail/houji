<template>
  <div class="container">
    <div class="number">
      <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="tell">
    </div>
    <div class="line"></div>
    <div class="mobel">
      <input type="tel" placeholder="短信验证码" v-model="duanx" maxlength="6" style="font-size:16px">
      <span class="test" @click="time" v-if="active">获取验证码</span>
      <span class="test" v-if="!active">{{timed}}s重新发送</span>
    </div>
    <div class="line"></div>
    <div class="enters" v-on:click="enter" v-if="showbtn">登录</div>
    <div class="enter" v-if="show">登录</div>

    <div class="bott">
      <div class="lyuan">
        <div class="yuan"></div>
      </div>
      <div class="content">
        我已仔细阅读并同意
        <a
          href="http://csapi.nguiba.com/api/v2p2/article/details?article_type=user_protocol"
          target="_blank"
        >《用户服务协议》</a>
        <a
          href="http://csapi.nguiba.com/api/v2p2/article/details?article_type=privacy"
          target="_blank"
        >《隐私政策》</a>
      </div>
    </div>
  </div>
</template>
<script>
import { yzm } from "@/components/axios/api";
import { wx } from "@/components/axios/api";
import * as types from "@/components/vuex/types";
export default {
  data() {
    return {
      tell: "",
      duanx: "",
      timed: 0,
      active: true,
      auth_timetimer: null,
      code_type: "land",
      showbtn: false,
      show: true
    };
  },
  methods: {
    // 点击获取验证 post后台
    time() {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.tell)) {
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
        yzm(this.tell, this.code_type)
          .then(res => {
            // console.log(res);
            this.showbtn = true;
            this.show = false;
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
      }
    },
    // 点击登录 获得token 写入缓存
    enter() {
      if (this.duanx == "") {
        this.$toast({
          message: "验证码不能为空",
          duration: "1000"
        });
        return false;
      }
      wx(this.tell, this.duanx)
        .then(res => {
          let imgs = res.data.data.user_rank_id;
          localStorage.setItem("userID", imgs);
          if (res.data.data.length == 0) {
            this.$toast({
              message: "请正确输入验证码",
              duration: "1000"
            });
          } else {
            let tokenmine = res.data.data.token;
            // this.changeLogin({ Authorization: tokenmine});

            this.$store.commit(types.LOGIN, tokenmine);
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
a {
  text-decoration: underline;
  color: #D21623;
}

.number {
  height: 40px;
  margin-top: 80px;
}

.number input {
  width: 100%;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
}

.line {
  width: 100%;
  height: 2px;
  background: rgba(235, 235, 235, 1);
}

.mobel {
  height: 40px;
  margin-top: 40px;
}

.mobel input {
  width: 71%;
  height: 20px;
  line-height: 20px;
}

.test {
  height: 54px;
  border: 1px solid rgba(153, 153, 153, 1);
  border-radius: 5px;
  font-size: 13px;
  font-family: PingFangSC-Regular;
  color: #999;
  padding: 4px 6px;
}

.enter {
  height: 44px;
  background: rgba(210, 22, 35, 1);
  border-radius: 10px;
  margin-top: 40px;
  line-height: 44px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  opacity: 0.3;
}

.enters {
  height: 44px;
  background: rgba(210, 22, 35, 1);
  border-radius: 10px;
  margin-top: 40px;
  line-height: 44px;
  text-align: center;
  color: #fff;
  font-size: 15px;
}

.number input::-webkit-input-placeholder {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.mobel input::-webkit-input-placeholder {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.lyuan {
  border: 2px solid #D21623;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  position: relative;
  float: left;
}

.yuan {
  width: 7px;
  height: 7px;
  background: #D21623;
  border-radius: 50%;
  position: absolute;
  left: 2px;
  top: 2px;
}

.bott {
  overflow: hidden;
  margin-top: 15px;
}

.content {
  width: 93%;
  float: right;
  margin-top: 1px;
  margin-left: 5px;
  font-size: 12px;
}
</style>


