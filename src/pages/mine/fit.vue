<template>
  <div class="active">
    <div class="smal">
      <ul>
        <li class="line" @click="geren">
          <span class="word">个人资料</span>
          <span class="imgsa">
            <img :src="img">
          </span>
        </li>
        <li class="line" @click="desgreo">
          <span class="word">账号与安全</span>
          <span class="imgsa">
            <img :src="img">
          </span>
        </li>
        <li class="line" @click="absolu">
          <span class="word">关于我们</span>
          <span class="imgsa">
            <img :src="img">
          </span>
        </li>
        <li class="line">
          <span class="word">消息免打扰</span>
          <div class="SAME">
            <van-switch v-model="checked" size="24px" active-color="#259B24"/>
          </div>
        </li>
        <li class="line">
          <span class="word">清除缓存</span>
        </li>
      </ul>
    </div>
    <div class="warpall">
      <div class="enterH" @click="enenneen">退出登录</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Switch } from "vant";

Vue.use(Switch);
export default {
  name: "Fit",
  data() {
    return {
      img: require("@/assets/rr.png"),
      checked: false
    };
  },
  methods: {
    enenneen() {
      this.$router.push("/phone");
    },
    geren() {
      this.$router.push("/personone");
    },
    desgreo() {
      this.$router.push("/desgreo");
    },
    absolu() {
      this.$router.push("/absolu");
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

.imgsa {
  text-align: center;
}

.imgsa img {
  width: 25%;
}

.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px 0 10px 2%;
}

.word {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  color: #333333;
}

.enterH {
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: #fff;
  margin-top: 10px;
  font-size: 14px;
}

.warpall {
  background: #F4F4F4;
  hieght: 500px;
}

.smal {
  background: #ffffff;
}

.SAME {
  margin-right: 10px;
  height: 30px;
}
</style>
