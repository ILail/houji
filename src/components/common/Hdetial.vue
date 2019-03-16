<template>
  <div class="wrapAll">
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
          <span>限量购</span>
          <span>抢购中</span>
        </div>
        <div class="wrapss">
          <span>仅剩{{list.left_nums}}件</span>
          <img :src="img" style="width:8px">
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
    </div>
    <div class="peoDela" v-html="list.content"></div>
    <!-- 底部 -->
    <div class="bottom">
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
        <li class="xiadan" @click="selectSort()">加入购物车</li>
        <li class="joinw" @click="ljxd()">立即购买</li>
      </ul>
    </div>

    <!-- 弹窗2-->
    <!-- <div class="tanBottom" v-show="istanchuana">
      <div class="topt"></div>
      <div class="topone container" @click="chaClik()">
        <img :src="img_path" class="topImg">
        <div class="middles">
          <span class="price">价格: ¥{{clickList.support_money}}</span>
          <span class="typen">{{clickList.return_name}}</span>
        </div>
        <div>
          <img src="@/assets/cha.png" class="cha">
        </div>
      </div>
      <div class="container">
        <div class="guige">规格</div>
        <div class="layerNode">
          <div
            class="content"
            v-for=" (item,index) in listP "
            :key="item.id"
            @click="tab(index)"
            :class="{active:index == num}"
          >
            <div class="contentF">{{item.return_name}}：</div>
            <div class="contentC">{{item.return_content}}</div>
          </div>
        </div>
        <div class="numB" id="tan">
          <div class="numBa">数量</div>
          <ul class="listnum">
            <li class="jia" v-on:click="jia">-</li>
            <li class="numW">{{ count}}</li>
            <li class="jian" v-on:click="jian">+</li>
          </ul>
          <div class="queren" @click="ljxd">立即购买</div>
        </div>
      </div>
    </div>-->
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
import store from "@/components/vuex/store";
import { crowd_funding } from "@/components/axios/api";
import { specifications } from "@/components/axios/api";
import { ForList } from "@/components/axios/api";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { ImagePreview } from "vant";
import { Sku } from "vant";
import { SignPackage } from "@/components/axios/api";
import assign from "@/components/axios/assign.js";
Vue.use(Sku);
Vue.use(Swipe).use(SwipeItem);
export default {
  mixins: [assign],
  data() {
    return {
      show: false,
      // isshowa: true,
      count: 1,
      // istanchuana: false,
      id: this.$route.query.key,
      money: "",
      moneys: "",
      picList: [],
      listP: [],
      img: require("@/assets/rrs.png"),
      list: "",
      img_path: "",
      clickList: "",
      num: 0
    };
  },
  created() {
    specifications(this.id)
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          this.listP = data;
          this.clickList = data[0];
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    crowd_funding(this.id)
      .then(res => {
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;
          // console.log(data);

          this.money = data.reality_money;
          this.moneys = data.support_money;
          this.img_path = data.imgs.split(",")[0];
          this.list = data;
          this.picList = data.imgs.split(",");
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    // setTimeout(() => {
    //   this.$refs.wrappers.style.visibility = "visible";
    // }, 1250);
    // this.$toast({
    //   type: "loading",
    //   message: "加载中...",
    //   duration: "1250"
    // });
    setTimeout(() => {
      this.show = true;
    }, 1300);
    const value = this.$store.state.accessToken;
    const url = window.location.href;
    // const newUrl = url.split('&')[0]
    console.log(url);
    console.log(wx);
    console.log(value);
    const _this = this;
    if (value == '') return;
    SignPackage(url, value)
      .then(res => {
        console.log(res.data.data.signPackage);
        let signPackage = res.data.data.signPackage;
        wx.config({
          debug: false,
          appId: signPackage.appId,
          timestamp: signPackage.timestamp,
          nonceStr: signPackage.nonceStr,
          signature: signPackage.signature,
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
        });
        wx.ready(function() {
          wx.onMenuShareTimeline({
            title: _this.list.crowd_funding_name, // 分享标题
            desc: _this.list.summary, // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _this.img_path, // 分享图标
            success: function() {
              _this.$toast({
                message: "分享成功",
                duration: "500"
              });
              // 用户确认分享后执行的回调函数
            }
            // cancel: function() {
            //   _this.$toast({
            //     message: "取消分享成功",
            //     duration: "500"
            //   });
            //   // 用户取消分享后执行的回调函数
            // }
          });
          wx.onMenuShareAppMessage({
            title: _this.list.crowd_funding_name, // 分享标题
            desc: _this.list.summary, // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _this.img_path, // 分享图标
            success: function() {
              _this.$toast({
                message: "分享成功",
                duration: "500"
              });
              // 用户确认分享后执行的回调函数
            }
          });
        });
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    jia: function() {
      if (this.count == 1) {
        return;
      }
      this.count--;
    },
    jian: function() {
      if (this.count >= 99) {
        return;
      }
      this.count++;
    },
    imghir() {
      ImagePreview(this.picList);
    },
    wishesHit() {
      this.$router.push({
        path: "/wishs"
      });
    },
    closeTouch: function() {
      document
        .getElementById("tan")
        .addEventListener("touchmove", this.handler, { passive: false }); //阻止默认事件
    },
    selectSort() {
      this.$toast({
        message: "不能添加购物车",
        duration: "1000"
      });
    },
    // selectSorta() {
    //   this.closeTouch(); //关闭默认事件
    //   this.istanchuana = true;
    //   this.isshowa = false;
    // },
    // // 点击关闭
    // chaClik() {
    //   // this.openTouch(); //打开默认事件

    //   this.istanchuana = false;
    //   this.isshowa = true;
    // },
    // 点击规格变化
    tab(index) {
      // 颜色
      this.num = index;
      this.clickList = this.listP[index];
    },
    // 点击下单
    ljxd() {
      if (store.state.token == null) {
        console.log(123);
        this.$router.push({ path: "/phone" });
      } else {
        const arry = [
          this.$route.query.key,
          this.clickList.crowd_funding_return_id,
          this.count
          // this.$route.query.money
        ];
        this.$router.push({
          path: "/querenone",
          query: {
            dataObjo: arry[0],
            dataObjb: arry[1],
            dataObjc: arry[2]
            // dataObjd: arry[3]
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.top {
  margin-top: 20px;
}

.middle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 3.6%;
  background: #D21623;
  color: #fff;
}

.middle span {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.peoDela >>> p img {
  width: 100%;
}

.peoDela >>> p {
  margin-top: 20px;
  padding-bottom: 50px;
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
  margin-right: 0.2rem;
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

.topImg {
  width: 89px;
  height: 89px;
  border-radius: 2px;
}

.topone {
  margin-top: -30px;
}

.topone {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.topone .middles {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cha {
  margin-top: -70px;
  width: 72%;
  margin-right: -10px;
}

.middles {
  margin-left: 10px;
}

.middles .price {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(168, 43, 51, 1);
  margin-bottom: 10px;
}

.typen {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
}

.guige {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 20px;
  margin-bottom: 20px;
}

.contentF {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  margin-bottom: 5px;
}

.contentC {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  border: 1px solid #666666;
  padding: 5px 10px;
  line-height: 1.5;
}

.numB {
  position: fixed;
  bottom: 0;
  overflow: hidden;
  width: 94%;
}

.numBa {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 10px;
}

.listnum li {
  float: left;
  margin-bottom: 28px;
}

[v-cloak] {
  display: none;
}

.queren {
  width: 100%;
  background: rgba(210, 22, 35, 1);
  border-radius: 2px;
  overflow: hidden;
  height: 44px;
  margin-bottom: 14px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  line-height: 44px;
}

.querena {
  width: 100%;
  background: rgba(210, 22, 35, 1);
  border-radius: 2px;
  overflow: hidden;
  height: 44px;
  margin-bottom: 14px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  line-height: 44px;
  opacity: 0.1;
}

.jia, .jian {
  border: 1px solid #eeeeee;
  padding: 7px 12px;
  color: #999999;
}

.numW {
  padding: 6.3px 15px;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  color: #666666;
  font-size: 15px;
}

.layerNode {
  width: 100%;
  height: 194px;
  background-color: #fff;
  position: absolute;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* ios 自带滚动条不平滑解决方法 */
}

.content {
  margin-bottom: 18px;
  padding-top: 1px;
}

.layerNode .active {
  color: #D21623;
}

.tanBottom {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80%;
  z-index: 999;
}

.wrapAll >>> .van-swipe__indicator {
  width: 8px;
  height: 8px;
  background-color: #fff;
  opacity: 1;
}
</style>

