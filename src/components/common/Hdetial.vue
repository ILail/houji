<template>
  <div class="wrapAll" v-cloak>
    <!-- 轮播 -->
    <van-swipe :autoplay="3500" indicator-color="#D21623" style="height:375.5px">
      <van-swipe-item v-for="item of picList" :key="item.id">
        <img
          class="swiper-img needsclick"
          :src="item"
          @click="imghir"
          style="width:100%;height:100%"
        >
      </van-swipe-item>
    </van-swipe>
    <div v-show="show">
      <div class="middle">
        <div>
          <span class="one">限量购</span>
          <span class="two">抢购中</span>
        </div>
        <div class="wrapss">
          <span>仅剩{{list.left_nums}}件</span>
          <!-- <img :src="img" style="width:8px"> -->
        </div>
      </div>
      <div class="container">
        <div class="name top">{{list.crowd_funding_name}}</div>
        <div class="detail top">{{list.summary}}</div>
        <div class="all top">
          <span class="Lmoney">¥ {{money}}</span>
          <span class="Smoney">¥ {{moneys}}</span>
        </div>
      </div>

      <div class="line top"></div>
      <div class="container">
        <div class="spec" @click="spec">
          <div class="specWrap">
            <span class="specSpan">已选：</span>
            <input type="text" placeholder="请选择商品规格" v-model="consText" readonly>
          </div>
          <img :src="img" class="imgRight">
        </div>

        <div class="spec">
          <div class="specWrap">
            <span class="specSpan">活动：</span>
            <input type="text" placeholder="限购商品不可与优惠卷叠加使用" readonly>
          </div>
          <!-- <img :src="img" class="imgRight"> -->
        </div>

        <div class="spec" style="border:0">
          <div class="specWrap" @click="address">
            <span class="specSpan">配送：</span>
            <input type="text" placeholder="请选择收货地址" v-model="addresses" readonly>
          </div>
          <img :src="img" class="imgRight">
        </div>
      </div>
      <div class="line"></div>

      <div class="peoDela" v-html="list.content"></div>
    </div>
    <!-- 底部 -->
    <div class="bottom" v-show="bottom">
      <ul>
        <li class="shu" onclick="url()">
          <span style="margin-bottom:3px">
            <img src="@/assets/kefu.png" alt>
          </span>
          <span class="shuW">客服</span>
        </li>
        <li class="shu bordershu" @click="wishesHit">
          <span style="margin-bottom:5px">
            <img src="@/assets/sku.png">
          </span>

          <span class="shuW" style="margin-top:-1px">购物车</span>
        </li>
        <li class="xiadan" @click="selectSort">加入购物车</li>
        <li class="joinw" @click="joinNow">立即购买</li>
      </ul>
    </div>
    <van-popup v-model="showList" position="bottom" @click-overlay="clickOverlay">
      <div class="container">
        <div class="topone">
          <div class="middles">
            <img :src="img_path" class="topImg" @click="topImg">
            <div class="middlesM">
              <div>
                <span class="price">价格: ¥{{money}}</span>
                <span class="typen">¥{{moneys}}</span>
              </div>

              <span class="cons">已选：{{clickList}}</span>
            </div>
          </div>
          <div @click="confire">
            <img src="@/assets/cha.png" class="cha">
          </div>
        </div>
        <div class="roues">规格</div>
        <ul class="wrapUl">
          <li
            v-for=" (item,index) in listP "
            :key="item.id"
            @click="tab(index)"
            :class="{active:index == num}"
          >
            <span>{{item.return_content}}</span>
          </li>
        </ul>
        <div class="roues">数量</div>
        <div class="hitNum">
          <span @click="jian">-</span>
          <input type="text" v-model="numALL">
          <span @click="jia">+</span>
        </div>
        <div class="confire" @click="confire" v-if="confires">确认</div>
        <div class="confire" v-else @click="ljxd">立即购买</div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
// 客服
var isSdkReady = false;
ysf("onready", function() {
  isSdkReady = true;
});
window.url = function() {
  if (isSdkReady) {
    location.href = ysf("url");
  } else {
    alert("sdk尚未加载成功，请稍后再试");
  }
};
// import store from "@/components/vuex/store";
import { crowd_funding } from "@/components/axios/api";
import { SignPackage } from "@/components/axios/api";
import { specifications } from "@/components/axios/api";
import { getDIZ } from "@/components/axios/api";
import { ImagePreview } from "vant";
import assign from "@/components/axios/assign.js";
import Vue from "vue";
// import { Sku } from "vant";
// Vue.use(Sku);
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);
export default {
  mixins: [assign],
  data() {
    return {
      confires: true,
      showList: false,
      bottom: true,
      show: false,
      id: this.$route.query.key,
      money: "",
      moneys: "",
      picList: [],
      listP: [],
      img: require("@/assets/rr.png"),
      list: "",
      img_path: "",
      clickList: "",
      img_paths: "",
      num: 0,
      consText: "",
      numALL: 1,
      addresses: ""
    };
  },
  created() {
    crowd_funding(this.id)
      .then(res => {
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;
          this.money = data.reality_money;
          this.moneys = data.support_money;
          this.img_paths = data.imgs.split(",")[0];
          this.list = data;
          this.picList = data.imgs.split(",");
          const value = localStorage.getItem("accessTokens");
          const url = window.location.href;
          if (value == null) return;
          SignPackage(url, value)
            .then(res => {
              let signPackage = res.data.data.signPackage;
              wx.config({
                debug: false,
                appId: signPackage.appId,
                timestamp: signPackage.timestamp,
                nonceStr: signPackage.nonceStr,
                signature: signPackage.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
              });

              wx.onMenuShareTimeline({
                title: this.list.crowd_funding_name, // 分享标题
                desc: this.list.summary, // 分享描述
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.img_paths // 分享图标
              });
              wx.onMenuShareAppMessage({
                title: this.list.crowd_funding_name, // 分享标题
                desc: this.list.summary, // 分享描述
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.img_paths // 分享图标
              });
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });

    specifications(this.id)
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          this.listP = data;
          this.img_path = data[0].img_path;
          this.clickList = data[0].return_content;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // 地址
    getDIZ()
      .then(res => {
        // console.log(res.data.data)
        const address = res.data.data.address;
        this.addresses = "至  " + address;
        if (res.data.data.length == 0) {
          this.addresses = "请选择收货地址";
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  watch: {
    numALL() {
      if (this.numALL >= 100) {
        this.$toast({
          message: "最大99",
          duration: "1000"
        });
        this.numALL = 99;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 1350);
  },
  methods: {
    tab(index) {
      // 颜色
      this.num = index;
      this.clickList = this.listP[index].return_content;
    },
    spec() {
      this.showList = true;
      this.bottom = false;
    },
    confire() {
      this.showList = false;
      this.bottom = true;
      this.consText = this.clickList;
    },
    clickOverlay() {
      this.bottom = true;
    },
    joinNow() {
      this.showList = true;
      this.bottom = false;
      this.confires = false;
    },
    imghir() {
      ImagePreview(this.picList);
    },
    topImg() {
      ImagePreview(this.img_path.split(","));
    },
    address() {
      if (this.$store.state.token == "") {
        console.log(123);
        window.localStorage.clear();
      }
      this.$router.push({
        path: "/shouhuo"
      });
      // }
    },
    jian() {
      if (this.numALL == 1) {
        this.$toast({
          message: "已经最小",
          duration: "1000"
        });
        return;
      }
      this.numALL--;
    },
    jia() {
      if (this.numALL >= 99) {
        this.$toast({
          message: "已经最大",
          duration: "1000"
        });
        return;
      }
      this.numALL++;
    },

    wishesHit() {
      this.$router.push({
        path: "/wishs"
      });
    },
    selectSort() {
      this.$toast({
        message: "不能添加购物车",
        duration: "1000"
      });
    },
    // 点击下单
    ljxd() {
      if (this.$store.state.token == "") {
        console.log(123);
        window.localStorage.clear();
      }
      const arry = [
        this.$route.query.key,
        this.listP[0].crowd_funding_return_id,
        this.numALL
      ];
      this.$router.push({
        path: "/querenone",
        query: {
          dataObjo: arry[0],
          dataObjb: arry[1],
          dataObjc: arry[2]
        }
      });
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wrapAll >>> .van-swipe__indicator {
  width: 8px;
  height: 8px;
  background-color: #fff;
  opacity: 1;
}

.middle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  background: #FBA23E;
  padding: 0 3%;
}

.middle .one {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.middle .two {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
}

.spec {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #E5E5E5;
}

.specWrap {
  width: 90%;
  display: flex;
  align-items: center;
}

.specSpan {
  font-size: 14px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  line-height: 21px;
}

.spec input {
  font-family: PingFangSC-Light;
  font-size: 14px;
  width: 80%;
  color: rgba(102, 102, 102, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spec input::-webkit-input-placeholder {
  font-size: 14px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
}

.top {
  margin-top: 20px;
}

.imgRight {
  width: 8px;
  height: 13px;
}

.line {
  height: 10px;
  background: rgba(244, 244, 244, 1);
}

.peoDela >>> p img {
  width: 100%;
}

.peoDela {
  padding-bottom: 59px;
}

.name {
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 1.2;
}

.detail {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 1.2;
}

.wrapss {
  display: flex;
  align-items: center;
}

.wrapss span {
  font-size: 12px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
}

.Lmoney {
  font-size: 23px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(210, 22, 35, 1);
}

.all {
  display: flex;
  align-items: baseline;
}

.Smoney {
  text-decoration: line-through;
  font-size: 16px;
  font-family: SanFranciscoDisplay-Light;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
  margin-left: 0.3rem;
}

// 底部
.bottom ul {
  display: flex;
  align-items: center;
}

.shu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
}

.bottom ul li {
  padding-top: 8px;
  padding-bottom: 8px;
}

.bottom img {
  width: 20px;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 9999;
  border-top: 1px solid rgba(204, 204, 204, 1);
}

.shuW {
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  margin-top: 2px;
}

.bordershu {
  border-left: 1px solid rgba(204, 204, 204, 1);
  border-right: 1px solid rgba(204, 204, 204, 1);
}

.xiadan {
  width: 30%;
  text-align: center;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: #333;
}

.joinw {
  width: 30%;
  text-align: center;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  background: #D21623;
  height: 42px;
  line-height: 38px;
}

// 弹窗
.wrapAll >>> .van-popup {
  overflow-y: visible;
}

.topone {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.middles {
  display: flex;
  align-items: flex-end;
}

.middlesM .cons {
  width: 220px;
  padding-top: 10px;
  padding-bottom: 2px;
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.middlesM {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.topImg {
  width: 89px;
  height: 89px;
  border-radius: 4px;
  margin-top: -30px;
}

.cha {
  width: 13px;
  margin-top: 8px;
  margin-right: 2px;
}

.middles .price {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(168, 43, 51, 1);
}

.middles .typen {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  text-decoration: line-through;
  margin-left: 10px;
}

.roues {
  margin: 20px 0 15px 0;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
}

.wrapUl {
  width: 100%;
  height: 201px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  /* ios 自带滚动条不平滑解决方法 */
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.confire {
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  height: 44px;
  background: #D21623;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  margin: 50px 0 15px 0;
}

.wrapUl li {
  padding-top: 10px;
  padding-bottom: 15px;
}

.wrapUl span {
  line-height: 26px;
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  padding: 5px 10px;
  border: 1px solid rgba(102, 102, 102, 1);
  border-radius: 4px;
  display: inline-block;
}

.wrapUl .active span {
  border: 1px solid rgba(168, 43, 51, 1);
  color: #A82B33;
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

[v-cloak] {
  display: none !important;
}
</style>

