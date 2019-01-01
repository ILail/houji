<template>
  <div class="active">
    <div>
      <img src="@/assets/abs.png" alt class="imgaaa">
      <div class="banben">版本 v2.0</div>
    </div>
    <div class="smal">
      <ul>
        <li class="line" @click="geren('http://csapi.nonggui8.com/api/v1/article/details?article_type=about')">
          <span class="word">关于我们</span>
          <span class="imgsa">
            <img :src="img">
          </span>
        </li>
        <li class="line" @click="desgreo('http://csapi.nonggui8.com/api/v1/article/details?article_type=user_protocol')">
          <span class="word">用户协议</span>
          <span class="imgsa">
            <img :src="img">
          </span>
        </li>
        <li class="line" @click="absolua('http://csapi.nonggui8.com/api/v1/article/details?article_type=privacy')">
          <span class="word">隐私政策</span>
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
  name: "Absolu",
  data() {
    return {
      img: require("@/assets/rr.png")
    };
  },
  methods: {
    geren(e) {
      window.location.href = e;
    },
    desgreo(e1) {
      window.location.href = e1;
    },
    absolua(e2) {
      window.location.href = e2;
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.imgaaa {
  width: 15%;
  text-align: center;
  margin-left: 43%;
  padding-top: 30px;
}

.banben {
  text-align: center;
  padding-bottom: 30px;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
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
