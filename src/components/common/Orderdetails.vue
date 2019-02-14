<template>
  <div class="wrap" ref="wrapss" style="visibility:hidden;">
    <!-- 地址 -->
    <img :src="wxone" style="width:100%">
    <div class="header">
      <div class="word">
        <span>{{letter.username}}</span>
        <span style="margin-left:12px">{{letter.mobile}}</span>
      </div>
      <div class="wordea">{{letter.address_info}}{{letter.address}}</div>
    </div>
    <!-- 产品 -->
    <div class="bottom">
      <div class="allW">
        <div class="top">
          <div>
            <img :src="headimgurl" class="img">
            
            <span class="topWord">{{name}}</span>
          </div>
          <div class="right_word">{{messages}}</div>
        </div>
        <div class="item" v-for="(pl,index) in json" :key="index" :data-id="index">
          <div class="left">
            <img v-lazy="pl.pic">
          </div>
          <div class="right">
            <div class="title">
              <div class="titleWord">{{pl.crowd_funding_name}}</div>
              <div class="titlew">
                <div class="pricr">￥{{pl.support_money}}</div>
                <div class="pNUM">x{{pl.wish_nums}}</div>
              </div>
            </div>
            <div class="detailsame">{{pl.return_content}}</div>
          </div>
        </div>
        <div class="contentW">共计{{return_nums}}件商品 合计：¥{{reality_money}}</div>
        <div class="twoWord">
          <span class="one" @click="wuliu(orderdetails)">查看物流</span>
          <span class="two" @click="corif()">确认收货</span>
        </div>
      </div>
    </div>
    <order-header :list="list" v-if="flag"></order-header>
    <order-bottom></order-bottom>
    <order-you></order-you>

    <van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
      <div class="corlword">是否确认收货</div>
    </van-dialog>
  </div>
</template>

<script>
import { DEtilWu } from "@/components/axios/api";
import { CorfirWu } from "@/components/axios/api";
import OrderHeader from "./components/Header";
import OrderBottom from "./components/Bottom";
import OrderYou from "./components/You";
export default {
  name: "Orderdetails",
  components: {
    OrderHeader,
    OrderBottom,
    OrderYou
  },
  data() {
    return {
      wxone: require("@/assets/mine/xu.png"),
      orderdetails: this.$route.query.dataObjo,
      letter: {},
      name: "",
      img: "",
      headimgurl: "",
      json: "",
      return_nums: "",
      reality_money: "",
      show: false,
      list: [],
      flag: false,
      messages: ""
    };
  },
  created() {
    DEtilWu(this.orderdetails)
      .then(res => {
        // console.log(res.data.data);
        this.letter = res.data.data.address; //地址
        this.name = res.data.data.nickname;
        this.headimgurl = res.data.data.headimgurl;
        this.json = res.data.data.options;
        this.return_nums = res.data.data.return_nums;
        this.reality_money = res.data.data.reality_money;
        let reality_money = res.data.data.reality_money;
        let addtime = res.data.data.addtime;
        let pay_mode = res.data.data.pay_mode;
        let support_money = res.data.data.support_money;
        let vouchers_money = res.data.data.vouchers_money;
        const resule = [];
        resule.push(
          this.orderdetails,
          addtime,
          support_money,
          pay_mode,
          vouchers_money,
          reality_money
        );

        setTimeout(() => {
          this.list = resule;
          this.flag = true;
        }, 100);

        let is_deliver = res.data.data.is_deliver;
        switch (is_deliver) {
          case 0:
            this.messages = "未发货";
            break;
          case 1:
            this.messages = "已发货";
            break;
          case 2:
            this.messages = "已收货";
            break;
          case 3:
            this.messages = "已退款";
            break;
          case 10:
            this.messages = "进行中";
            break;

          case 11:
            this.messages = "失败";
            break;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    setTimeout(() => {
      this.$refs.wrapss.style.visibility = "visible";
    }, 1700);
  },
  methods: {
    beforeClose(action, done) {
      if (action === "confirm") {
        CorfirWu(this.orderdetails)
          .then(res => {
            if (res.data.status == 1) {
              this.$toast({
                message: "确认成功",
                duration: "1500"
              });
            } else {
              this.$toast({
                message: "已经确认",
                duration: "1500"
              });
            }
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
        setTimeout(done, 500);
      } else {
        done();
      }
    },
    wuliu(tradeNO) {
      console.log(tradeNO);
      this.$router.push({
        path: "/wuliudetails",
        query: {
          dataObjo: tradeNO
        }
      });
    },
    corif() {
      this.show = true;
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;
  background-color: #f4f4f4;
}

.corlword {
  text-align: center;
  padding: 10px 0;
}

.header {
  padding: 20px 3.2%;
  background: #fff;
}

.word {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.word span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wordea {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-top: 8px;
  line-height: 1.5;
}

// 内容
.allW {
  margin-top: 8px;
  background: #fff;
  padding: 10px 3.2%;
}

.right {
  width: 73%;
  margin-left: 3%;
}

.bottom {
  margin-top: 12px;
}

.titlew {
  margin-top: 5px;
}

.title {
  display: flex;
  justify-content space-between
}

.titleWord {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 550;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width 70%
  line-height: 1.2;
  margin-top: 2px;
}

.detailsame {
  white-space: nowrap; /* 超出的空白区域不换行 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  width: 83%;
  margin-top: 8px;
  line-height: 1.2;
  max-width 70%
}

.pricr {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.pNUM {
  font-size: 14px;
  font-family: Helvetica;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-align: right;
  margin-top: 5px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item {
  display: flex;
  margin-top: 8px;
}

.top img {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.topWord {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-left: 8px;
}

.left {
  width: 23%;
  height: 80px;
}

.left img {
  width: 100%;
  border-radius: 5px;
}

.twoWord {
  text-align: right;
  padding: 15px 0 10px 0;
}

.twoWord .one {
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 5px;
  color: #000000;
  margin-right: 0.3rem;
}

.twoWord .two {
  border: 1px solid rgba(210, 22, 35, 1);
  border-radius: 5px;
  color: #D21623;
}

.twoWord span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  padding: 4px 8px;
  border: 1px solid red;
}

.contentW {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: right;
  padding: 5px 0;
}
</style>
