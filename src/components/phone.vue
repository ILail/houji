<template>
  <div class="container">
    <div class="number">
      <input type="text" placeholder="请输入手机号" v-model="tell">
    </div>
    <div class="line"></div>
    <div class="mobel">
      <input type="text" placeholder="短信验证码" v-model="duanx" style="font-size:16px">
      <span class="test" @click="time" v-if="active">获取验证码</span>
      <span class="test" v-if="!active">{{timed}}s重新发送</span>
    </div>
    <div class="line"></div>
    <div class="enter" @click="enter">登录</div>
    <div class="bott">
      <div class="lyuan">
        <div class="yuan"></div>
      </div>
      <div class="content">
        我已仔细阅读并同意
        <a
          href="http://csapi.nonggui8.com/api/v1/article/details?article_type=user_protocol"
          target="_blank"
        >《用户服务协议》</a>
        <a
          href="http://csapi.nonggui8.com/api/v1/article/details?article_type=privacy"
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
      code_type: "land"
    };
  },
  methods: {
    // 点击获取验证 post后台
    time() {
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
          console.log(res);
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    // 点击登录 获得token 写入缓存
    enter() {
      wx(this.tell, this.duanx)
        .then(res => {
          // token
          // console.log(res.data);
          let tokenmine = res.data.data.token;
          // this.changeLogin({ Authorization: tokenmine});

          this.$store.commit(types.LOGIN, tokenmine);
          this.$router.push("/");
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
  width: 75%;
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
  margin-top: 15px;
}

.content {
  float: left;
  margin-top: 1px;
  margin-left: 5px;
}
</style>


