<template>
  <div class="active">
    <div class="smal">
      <div class="cont">
        <span class="word">交易密码</span>
        <input
          type="tel"
          placeholder="输入支付密码"
          maxlength="6"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
          v-model="tell"
          style="width:60%;margin-left:20px"
        >
      </div>
      <div class="cont">
        <span class="word">再次输入</span>
        <input
          maxlength="6"
          type="tel"
          placeholder="再次输入密码"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
          v-model="duanx"
          style="width:60%;margin-left:20px"
        >
        <!-- <van-number-keyboard
          :show="show"
          extra-key="."
          close-button-text="完成"
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
        />-->
      </div>
    </div>
    <div class="baocun" @click="baocun">保存</div>
  </div>
</template>
<script>
import secret from "@/utils/utils";
import { peosMobless } from "@/components/axios/api";
// import Vue from "vue";
// import { NumberKeyboard } from "vant";

// Vue.use(NumberKeyboard);
export default {
  name: "Desgreo",
  data() {
    return {
      img: require("@/assets/rr.png"),
      tell: "",
      duanx: ""
      // show: false
    };
  },
  methods: {
    // showa() {
    //   this.show = true;
    //   console.log(123);
    // },
    // onInput(value) {
    //   this.duanx = value
    // },
    // onDelete() {
    //   Toast("delete");
    // },
    baocun() {
      if (this.tell != this.duanx) {
        return;
      }
      console.log(this.tell, this.duanx);
      peosMobless(this.tell, this.duanx)
        .then(res => {
          this.$toast({
            message: "更改成功",
            duration: "1000"
          });
          this.$router.go("-1");
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

.word {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  color: #333333;
  margin-top: 2px;
}

.smal {
  background: #ffffff;
}

.cont {
  display: flex;
  align-items: center;
  padding: 10px 2% 10px 2%;
  heigth: 50px;
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
