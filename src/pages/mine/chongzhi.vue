<template>
  <div class="active">
    <div style="background:#fff">
      <div class="fnagshi">充值金额</div>
      <div style="padding-left:2%">
        <span class="sthf">¥</span>
        <input type="text" class="sthf" v-model="moneys">
      </div>
    </div>

    <div style="background:#fff;margin-top:10px">
      <div class="fnagshi">充值方式</div>
      <div class="wx" style="border-bottom:1px solid #eee">
        <div>
          <img src="@/assets/wx.png" class="wxIMG">
          <span class="righta">微信支付</span>
        </div>
        <img :src="imgSrc" class="zfbIMG" ref="imgAllo" @click="wx">
      </div>

      <div class="zfb">
        <div>
          <img src="@/assets/zfb.png" class="wxIMG">
          <span class="righta">支付宝支付</span>
        </div>
        <img :src="imgSrc" class="zfbIMG" ref="imgAllt" @click="zfb">
      </div>
    </div>

    <div class="action" @click="nowWay">立即充值</div>
  </div>
</template>

<script>
import { getChong } from "@/components/axios/api";
export default {
  data() {
    return {
      bgImg: [require("@/assets/xuan.png"), require("@/assets/xu.png")],
      imgIndex: 0,
      imgIndexa: 1,
      moneys:""
    };
  },
  mounted() {
    // console.log(this.$refs.imgAllo);
    // console.log(this.$refs.imgAllt);
  },
  computed: {
    imgSrc() {
      return this.bgImg[this.imgIndex];
    }
  },
  methods: {
    wx() {
      this.$refs.imgAllo.src = this.bgImg[this.imgIndexa];
      this.$refs.imgAllt.src = this.bgImg[this.imgIndex];
    },
    zfb() {
      this.$refs.imgAllt.src = this.bgImg[this.imgIndexa];
      this.$refs.imgAllo.src = this.bgImg[this.imgIndex];
    },
    nowWay() {
      // getChong(alipay, this.moneys)
      //   .then(res => {
      //    console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err, "请求失败");
      //   });
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

.heard {
  text-align: center;
  overflow: hidden;
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
</style>

