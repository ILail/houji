<template>
  <div class="active">
    <div class="smal">
      <ul>
        <li class="line" @click="one">
          <span class="word">手机</span>
          <span class="imgsa">
            <span style="margin-right:10px">13136184755</span>
            <img :src="img" style="width:7%;vertical-align: sub;">
          </span>
        </li>
        <li class="line" @click="two">
          <span class="word">支付密码</span>
          <span class="imgsa">
            <img :src="img">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Desgreo",
  data() {
    return {
      img: require("@/assets/rr.png")
    };
  },
  methods: {
    one() {
      this.$router.push("/zfu");
    },
    two() {
      this.$router.push("/gengph");
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
  margin-right: 15px;
  height: 30px;
}
</style>
