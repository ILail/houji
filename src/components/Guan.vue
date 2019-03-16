<template>
  <div v-show="showG">
    <div class="focus">
      <img src="@/assets/abs.png" alt>
      <div class="wen">欢迎进入[猴集]，便于使用请关注微信公众号</div>
      <div class="guanz" @click="guan">点击关注</div>
    </div>

    <!-- <div class="hitImg">
      <img src="@/assets/del.png" alt class="hit_one">
      <img src="@/assets/code.jpg" alt class="hit_img">
      <div class="img_c">长按识别二维码关注</div>
      <div class="img_con">猴集</div>
    </div>-->
    <van-popup v-model="show" position="middle" :close-on-click-overlay="false">
      <img src="@/assets/code.jpg" alt class="hit_img">
    </van-popup>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      show: false,
      showG: false
    };
  },
  mounted() {
    let iswx =
      navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
      "micromessenger";
    let num = this.$store.state.subscribe;
    console.log(num)
    if(num === 0){
      this.showG = true;
    }
    // if (iswx && num == 0) {
    //   this.showG = true;
    // }
  },
  methods: {
    guan() {
      this.show = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.focus {
  font-size: 0.28rem;
  background: #444;
  height: 1rem;
  display: flex;
  align-items: center;
}

.focus img {
  width: 0.7rem;
  height: 0.7rem;
  margin-left: 0.2rem;
}

.focus .guanz {
  width: 18%;
  color: #fff;
  background: #00dd00;
  padding: 0.15rem;
  border-radius: 0.1rem;
  text-align: center;
}

.focus .wen {
  color: #fff;
  width: 55%;
  margin: 0 0.3rem 0 0.2rem;
}

.hitImg {
  display: none;
  height: 100%;
  overflow: hidden;
  position: relative;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
}

.hitImg .hit_one {
  position: absolute;
  width: 8%;
  right: 8%;
  top: 8%;
}

.hitImg .hit_img {
  width: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.img_c {
  font-size: 0.3rem;
  color: white;
  position: absolute;
  bottom: 26.5%;
  left: 28%;
}

.img_con {
  font-size: 0.3rem;
  color: white;
  position: absolute;
  bottom: 22.5%;
  left: 40%;
}
</style>


