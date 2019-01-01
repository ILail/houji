<template>
  <div :class="{add_bg : active}">
    <div class="container">
      <div class="wrap">
        <div class="header">
          <div class="imgHeader">
            <!-- 头像 -->
            <img :src="letter.headimgurl" alt>
          </div>
          <div class="word">
            <!-- 用户头像 -->
            <div class="top">{{letter.username}}</div>
            <div class="same">现在开通立享¥298/年</div>
            <div class="same">开通猴集卡平均可省¥2050/年</div>
          </div>
        </div>
        <div class="date">到期时间：2019年10月30日</div>
      </div>
      <div class="content">
        <div class="card">猴集卡权益</div>
        <div class="list">
          <ul>
            <li @click="nongc1">
              <span>
                <img :src="five" alt>
              </span>
              <span class="name">农场体验</span>
              <span class="name_">品质生活</span>
            </li>

            <li @click="zero1">
              <span>
                <img :src="six" alt>
              </span>
              <span class="name">0元尝鲜</span>
              <span class="name_">专属活动</span>
            </li>

            <li @click="kefu1">
              <span>
                <img :src="seven" alt>
              </span>
              <span class="name">专属客服</span>
              <span class="name_">在线解答</span>
            </li>

            <li @click="xianl1">
              <span>
                <img :src="eight" alt>
              </span>
              <span class="name">限量货</span>
              <span class="name_">先到先得</span>
            </li>

            <li @click="tui1">
              <span>
                <img :src="nine" alt style="width:77%">
              </span>
              <span class="name">极速退款</span>
              <span class="name_">退换无忧</span>
            </li>

            <li @click="huiyuan1">
              <span>
                <img :src="ten" alt>
              </span>
              <span class="name">会员专享价</span>
              <span class="name_">全场95折</span>
            </li>

            <li @click="mores1">
              <span>
                <img :src="tweve" alt>
              </span>
              <span class="last">敬请期待</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 弹窗 -->
      <div class="wropB" v-if="show1">
        <div class="tan">{{nongc.title}}</div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{nongc.con}}</div>
        </div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{nongc.note}}</div>
        </div>
        <div class="cofr" @click="Qall">确认</div>
      </div>

      <div class="wropB" v-if="show2">
        <div class="tan">{{zero.title}}</div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{zero.con}}</div>
        </div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{zero.note}}</div>
        </div>
        <div class="cofr" @click="Qall">确认</div>
      </div>

      <div class="wropB" v-if="show3">
        <div class="tan">{{kefu.title}}</div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{kefu.con}}</div>
        </div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{kefu.note}}</div>
        </div>
        <div class="cofr" @click="Qall">确认</div>
      </div>

      <div class="wropB" v-if="show4">
        <div class="tan">{{xianl.title}}</div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{xianl.con}}</div>
        </div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{xianl.note}}</div>
        </div>
        <div class="cofr" @click="Qall">确认</div>
      </div>

      <div class="wropB" v-if="show5">
        <div class="tan">{{tui.title}}</div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{tui.con}}</div>
        </div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{tui.note}}</div>
        </div>
        <div class="cofr" @click="Qall">确认</div>
      </div>

      <div class="wropB" v-if="show6">
        <div class="tan">{{huiyuan.title}}</div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{huiyuan.con}}</div>
        </div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{huiyuan.note}}</div>
        </div>
        <div class="cofr" @click="Qall">确认</div>
      </div>

      <div class="wropB" v-if="show7">
        <div class="tan">{{mores.title}}</div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{mores.con}}</div>
        </div>
        <div class="coNW">
          <div class="yuan"></div>
          <div class="wordC">{{mores.note}}</div>
        </div>
        <div class="cofr" @click="Qall">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import secret from "@/utils/utils";
import { people } from "@/components/axios/api";
export default {
  data() {
    return {
      five: require("@/assets/mine/1.png"),
      six: require("@/assets/mine/2.png"),
      seven: require("@/assets/mine/3.png"),
      eight: require("@/assets/mine/4.png"),
      nine: require("@/assets/mine/5.png"),
      ten: require("@/assets/mine/6.png"),
      tweve: require("@/assets/mine/7.png"),
      letter: "",
      nongc: {
        title: "农场体验",
        con:
          "猴集卡会员可参与每月一次的“畅游你的胃”活动，入选通过可探访猴集全球各地的农场基地机会一次，全程免费如：澳洲抓龙虾、法国吃生蚝、智利吃樱桃、新疆扎红枣、东大吃大米。",
        note: "选拔规则以活动为准，选拔通过后我们将在第一时间联系体验用户。"
      },
      zero: {
        title: "0元尝鲜",
        con: "猴集卡会员尊享平台限时0元秒杀、限时折扣活动的优先权。",
        note:
          "会员卡用户在同时与普通用户进行限时优惠活动的时候，会员卡用户拥有一切绝对优先的通道。"
      },
      kefu: {
        title: "专属客服",
        con:
          "猴集卡会员在下单时候点击联系在线客服，无需排队，客服将在线为您答疑解惑。",
        note:
          "系统会自动判定您的身份，如果您是猴集卡会员用户，在商品详情界面点击客服，将无需排队，即时与客服联系沟通。"
      },
      xianl: {
        title: "限量货",
        con: "全网限量好货，猴集卡会员尊享有限权益抢购。",
        note:
          "会员卡用户在同时与普通用户进行限量商品抢购的时候，会员卡用户拥有一切绝对优先的通道。"
      },
      tui: {
        title: "极速退款",
        con: "极速退换货，无需漫长等待，集您所急。",
        note:
          "猴集卡会员用户：1、在因质量问题的时候需要退款，可以第一时间联系专属客服，客服这边处理好之后第一时间退款。（客户仍需退货）2、在因非质量问题进行退款的时候，后台这边会极速审核无需漫长的等待就可以收到退款。"
      },
      huiyuan: {
        title: "会员专享价",
        con: "猴集卡会员尊享全场所有商品九五折，活动商品与限量商品不包含在内。",
        note:
          "在购物车界面勾选商品点击“立即下单”之后，会跳转到支付界面，这个时候您可以看到系统总价已经自动给猴集卡会员用户对应的折扣价。"
      },
      mores: {
        title: "更多期待",
        con:
          "更多会员卡权益正在到来，比如为您自己喜欢的产品代言……让会员享受更多的物超所值！",
        note: "猴集卡一切权益最终解释权归猴集官方所有。"
      },
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      active: false
    };
  },
  created() {
    people()
      .then(res => {
        const num = secret.Decrypt(res.data.data);
        this.letter = JSON.parse(num);
        console.log(this.letter);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },

  methods: {
    Qall() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
      this.show6 = false;
      this.show7 = false;
      this.active = false;
    },
    nongc1() {
      this.active = true;
      this.show1 = true;
    },
    zero1() {
      this.active = true;
      this.show2 = true;
    },
    kefu1() {
      this.active = true;
      this.show3 = true;
    },
    xianl1() {
      this.active = true;
      this.show4 = true;
    },
    tui1() {
      this.active = true;
      this.show5 = true;
    },
    huiyuan1() {
      this.active = true;
      this.show6 = true;
    },
    mores1() {
      this.active = true;
      this.show7 = true;
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.add_bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #dddddd;
}

.wrap {
  width: 100%;
  background: rgba(37, 29, 16, 1);
  border-radius: 4px;
  height: 155px;
}

.header {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  padding-top: 36px;
  padding-left: 40px;
}

.imgHeader img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: lightblue;
  margin-right: 5%;
}

.header .word {
  margin: 0 0 0 20px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(203, 180, 136, 1);
}

.date {
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
  padding-bottom: 15px;
  margin-top: 15px;
}

.top {
  font-size: 14px;
}

.same {
  font-size: 13px;
  margin-top: 10px;
}

.content .card {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin-top: 40px;
}

.list ul {
  margin-top: 30px;
  overflow: hidden;
}

.list ul li {
  float: left;
  width: 25%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  overflow: hidden;
  text-align: center;
}

.list img {
  width: 70%;
}

.list .name {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-top: 10px;
  margin-bottom: 5px;
}

.list .last {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-top: 10px;
  color: #333;
}

.list .name_ {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

// 弹窗
.tan {
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 20px;
}

.wordC {
  width: 96%;
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
  margin-bottom: 20px;
  line-height: 1.5;
}

.cofr {
  height: 26px;
  background: rgba(202, 181, 137, 1);
  border-radius: 2px;
  line-height: 26px;
  text-align: center;
  width: 80%;
  margin-left: 10%;
  font-size: 14px;
}

.wropB {
  width: 80%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 999;
  padding: 20px;
}

.wropB .yuan {
  width: 5px;
  height: 5px;
  background: #939393;
  border-radius: 50%;
  margin-top: 8px;
}

.coNW {
  display: flex;
  justify-content: space-between;
}
</style>



