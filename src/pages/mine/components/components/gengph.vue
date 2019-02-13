<template>
  <div class="active">
    <div class="smal">
      <div class="cont">
        <span class="word">手机号</span>
        <input
          maxlength="11"
          type="tel"
          placeholder="输入新的手机号"
          v-model="tell"
          style="width:60%;margin-left:32px"
        >
      </div>
      <div class="cont">
        <div class="conts">
          <span class="word">验证码</span>
          <input
            maxlength="11"
            type="tel"
            placeholder="输入验证码"
            v-model="duanx"
            style="width:60%;margin-left:20px"
          >
        </div>
        <span class="yanz" @click="time" v-if="active">获取验证码</span>
        <span class="yanz" v-if="!active">{{timed}}s重新发送</span>
      </div>
    </div>
    <div class="baocun" @click="baocun">保存</div>
  </div>
</template>
<script>
import { peosMoble } from "@/components/axios/api";
import { yzm } from "@/components/axios/api";
// import store from "@/components/vuex/store";
// import * as types from "@/components/vuex/types";
export default {
  name: "Desgreo",
  data() {
    return {
      img: require("@/assets/rr.png"),
      tell: "",
      duanx: "",
      timed: 0,
      active: true,
      code_type: "land"
    };
  },
  created() {},
  methods: {
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
    baocun() {
      peosMoble(this.tell, this.duanx)
        .then(res => {
          console.log(res);
          this.$toast("更改成功");
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
.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
}

.conts {
  display: flex;
  width: 75%;
}

.word {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  color: #333333;
  margin-top: 2px;
}

.yanz {
  width: 27%;
  margin-top: 2px;
  color: rgba(210, 22, 35, 1);
}

.smal {
  background: #ffffff;
}

.cont {
  display: flex;
  align-items: center;
  padding: 10px 2% 10px 2%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}

.baocun {
  height: 50px;
  background: rgba(210, 22, 35, 1);
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  line-height: 50px;
  text-align: center;
  width: 96%;
  margin-left: 2%;
  margin-top: 20px;
}
</style>
