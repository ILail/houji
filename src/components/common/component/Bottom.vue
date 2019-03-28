<template>
  <div class="wrap">
    <div class="price">
      <span>最新成交价：¥368</span>
      <span class="line"></span>
      <span>建议零售价：¥312</span>
    </div>
    <div class="word">
      <div>1. 满足7天无理由退换申请的前提下，包邮商品</div>
      <div>2. 48小时内发货，非包邮商品需要买家承担发货和退货邮费</div>
    </div>
    <div class="bottm">
      <span @click="Collection" v-if="Coll">收藏</span>
      <span @click="Collections" v-else>取消收藏</span>
      <span>转赠</span>
      <span @click="wangToBuy">转让</span>
      <span @click="wangToBuy">求购</span>
    </div>
    <!-- 中间弹窗 -->
    <van-popup v-model="showM">
      <div class="middleT">
        <div class="middleF">
          <img :src="img_path" class="topImg" style="margin:0">
          <div class="middleR">
            <div class="middleS">
              <span>单价：</span>
              <input type="text" placeholder="请输入">
            </div>
            <div class="middleS" style="padding-top:10px">
              <span>数量：</span>
              <input type="text" placeholder="请输入">
            </div>
          </div>
        </div>
        <div class="middleM">
          <span class="canle">取消</span>
          <span class="lines"></span>
          <span class="canles">确定</span>
        </div>
      </div>
    </van-popup>
    <!-- 底部弹窗-->
    <van-popup v-model="showSale" position="bottom">
      <div class="container">
        <div class="topSale">
          <div>
            <img :src="img_path" class="topImg">
            <span class="topWord">价格：¥386.00</span>
          </div>
          <div>
            <img src="@/assets/cha.png" class="cha">
          </div>
        </div>
        <div class="middle">
          <div class="numbers">数量</div>
          <div class="hitNum">
            <span>-</span>
            <input type="text" v-model="numB">
            <span>+</span>
          </div>
        </div>
        <div class="confer">确认</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Collection } from "@/components/axios/api";


export default {
  props: { img_path: {} },
  data() {
    return {
      Coll: true,
      showM: false,
      showSale: false,
      numB: 1,
      id: this.$route.query.key
    };
  },
  methods: {
    wangToBuy() {
      this.showM = true;
    },
    Collection() {
      Collection(this.id)
        .then(res => {
          res = res.data;
          // console.log(res)
          if (res.message == "操作成功") {
            this.Coll = false;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    Collections() {
      Collection(this.id)
        .then(res => {
          res = res.data;
          // console.log(res)
          if (res.message == "操作成功") {
            this.Coll = true;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  },
  created() {
    // myCollection()
    //   .then(res => {
    //     res = res.data;
    //   })
    //   .catch(err => {
    //     console.log(err, "请求失败");
    //   });
  },
  mounted() {
    this.$bus.$on("msgaa", msg => {
      this.showSale = !msg;
    });
  }
};
</script>
<style lang="stylus" scoped>
.wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 99;
  border-top: 1px solid #ccc;

  .price {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  .price span {
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
  }

  .price .line {
    width: 1px;
    height: 50px;
    background: rgba(204, 204, 204, 1);
  }

  .bottm {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    text-align: center;
    border-top: 1px solid #ccc;
  }

  .word {
    padding: 20px 4%;
    font-size: 13px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
  }

  .word div:nth-child(1) {
    padding-bottom: 10px;
  }

  .bottm span {
    width: 25%;
    font-size: 15px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
  }

  .bottm span:nth-child(2) {
    height: 50px;
    line-height: 50px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  .bottm span:nth-child(4) {
    background: #D21623;
    height: 50px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #fff;
    line-height: 45px;
  }

  .confer {
    height: 44px;
    line-height: 44px;
    background: #D21623;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
    font-size: 15px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
  }

  .middle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
  }

  .topSale {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .numbers {
    font-size: 15px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
  }

  .hitNum {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .hitNum input {
    width: 35px;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
    padding: 1.5px 0;
    text-align: center;
  }

  .hitNum span {
    width: 30px;
    border: 1px solid #666;
    padding: 5px 0;
  }

  .topImg {
    width: 89px;
    height: 89px;
    border-radius: 4px;
    margin-top: -30px;
  }

  .cha {
    width: 13px;
    margin-top: -30px;
    margin-right: 2px;
  }

  .topWord {
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(168, 43, 51, 1);
    margin-left: 10px;
  }

  .middleT {
    width: 5rem;
    padding: 40px 35px;
  }

  .middleF {
    display: flex;
    align-items: center;
  }

  .middleR {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 15px;
  }

  .middleS {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .middleS span {
    width: 35%;
    color: #666;
    font-family: PingFangSC-Regular;
  }

  .middleS input {
    width: 65%;
  }

  .middleS input::-webkit-input-placeholder {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    height: 21px;
    line-height: 21px;
    color: #8A8A8A;
  }

  .middleM {
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .lines {
    width: 1px;
    height: 26px;
    background: rgba(153, 153, 153, 1);
    opacity: 0.4;
  }

  .canle {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  .canles {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
</style>



