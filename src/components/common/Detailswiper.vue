<template>
  <div class="detailWrap">
    <!-- 头部 -->
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
      v-show="isshow"
      class="isFixed"
    ></ly-tab>
    <!-- 轮播 -->
    <van-swipe
      :autoplay="time"
      indicator-color="#D21623"
      @change="onChange"
      style="height:375.5px"
      v-show="showA"
    >
      <van-swipe-item v-show="showV">
        <video
          width="100%"
          height="100%"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-playsinline
          playsinline
          webkit-playsinline
          preload="auto"
          :src="video"
          :poster="pic"
          x-webkit-airplay="allow"
          @click="pauseVideo"
          @ended="onPlayerEnded($event)"
          style="object-fit:cover;"
        ></video>
        
        <img :src="imgs" class="imgsaa" @click="pauseVideo" v-show="showVi">
      </van-swipe-item>
      <van-swipe-item v-for="item of picList" :key="item.id">
        <img class="swiper-img needsclick" :src="item" @click="imghir">
      </van-swipe-item>
    </van-swipe>
    <!-- </div> -->
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <div class="swiper-box">
      <div class="swiper-container wrapA">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item of list" :key="item.id">
            <keep-alive>
              <component :is="item.component"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
    <!-- </van-pull-refresh> -->
    <div class="bottom" v-show="isshowa">
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
        <li class="joinw" @click="selectSorta()" v-show="show">立即购买</li>
        <li class="joinwa" v-show="shows">已经结束</li>
      </ul>
    </div>

    <!-- 弹窗 -->
    <div class="tanBottom" v-show="istanchuan">
      <div class="topt"></div>
      <div class="topone container" @click="chaClik()">
        <img :src="img_path" class="topImg">
        <div class="middle">
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
          <div class="queren" @click="confirm()" v-show="show">确认</div>
          <div class="querena" v-show="shows">已经结束</div>
        </div>
      </div>
    </div>

    <!-- 弹窗2-->
    <div class="tanBottom" v-show="istanchuana">
      <div class="topt"></div>
      <div class="topone container" @click="chaClik()">
        <img :src="img_path" class="topImg">
        <div class="middle">
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
          <div class="queren" @click="ljxd" v-show="showlj">立即购买</div>
          <div class="querens" v-show="showljs">已经结束</div>
        </div>
      </div>
    </div>
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
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { ImagePreview } from "vant";
Vue.use(Swipe).use(SwipeItem);
import Detail from "@/components/common/component/Detail";
import Travel from "@/components/common/component/Travel";
import Plun from "@/components/common/component/Plun";
import Suyuan from "@/components/common/component/Suyuan";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
import { wishList } from "@/components/axios/api";
import { specifications } from "@/components/axios/api";
import { crowd_funding } from "@/components/axios/api";
import store from "@/components/vuex/store";

import assign from "@/components/axios/assign.js";
import { SignPackage } from "@/components/axios/api";
// import store from "@/components/store/index";
export default {
  mixins: [assign],
  name: "Detail",
  components: {
    Detail,
    Travel,
    Plun,
    Suyuan
  },
  data() {
    return {
      // showC: false,
      showA: true,
      picList: [],
      pic: "",
      video: "",
      imgs: require("@/assets/bof.png"),
      daytime: "",
      show: true,
      shows: false,
      showlj: true,
      showljs: false,
      // 导航初始化
      selectedId: 0,
      items: [
        { label: "详情" },
        { label: "游记" },
        { label: "评论" },
        { label: "溯源" }
      ],
      options: {
        activeColor: "#D21623"
        // 可在这里指定labelKey为你数据里文字对应的字段名
      },
      handler: function(e) {
        e.preventDefault();
      },
      list: [
        { component: Detail },
        { component: Travel },
        { component: Plun },
        { component: Suyuan }
      ],
      isshow: false,
      isshowa: true,
      // 判断
      istanchuan: false,
      istanchuana: false,
      // 加减
      count: 1,
      // 弹窗规格的数组
      listP: [],
      // 弹窗的小图
      img_path: "",
      // 第一个默认规格
      clickList: "",
      // 弹窗切换的颜色
      num: 0,
      // 视频
      time: 3500,
      numv: "",
      showV: true,
      showVi: true,
      listC: {},
      id: this.$route.query.key
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
  },
  mounted() {
    crowd_funding(this.id)
      .then(res => {
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;

          this.picList = data.imgs.split(",");
          this.pic = res.data.video_pic;
          this.video = res.data.video_data;
          if (this.pic == "" && this.video == "") {
            this.showV = false;
          }
          this.img_path = data.imgs.split(",")[0];
          let residualTime = data.left_time;
          let day = parseInt(residualTime / (24 * 3600));
          this.daytime = day;
          if (day <= 0) {
            this.show = false;
            this.shows = true;
          }

          this.$nextTick(function() {
            this.listC = data;
            console.log(this.listC);
          });
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    this.$bus.$on("msg", msg => {
      if (this.daytime <= 0) {
        this.showlj = false;
        this.showljs = true;
      }
      this.istanchuana = msg;
      this.isshowa = !msg;
    });

    let mySwiperA = new Swiper(".wrapA", {});
    mySwiperA.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件
      this.selectedId = mySwiperA.activeIndex;
      // this.$root.eventHub.$emit("slideTab", mySwiperA.activeIndex);
      if (mySwiperA.activeIndex == 0) {
        this.isshow = false;
        this.showA = true;
        this.showVi = true;
      } else {
        this.isshow = true;
        this.showA = false;
      }
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    this.$root.eventHub.$on("changeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiperA.slideTo(index, 0, false);
    });

    const value = this.$store.state.accessToken;
    const url = window.location.href;
    // const url = url.split("&")[0];
    console.log(url);
    console.log(wx);
    console.log(value);
    if (value == "") return;

    SignPackage(url, value)
      .then(res => {
        console.log(res.data.data.signPackage);
        let signPackage = res.data.data.signPackage;

        wx.config({
          debug: true,
          appId: signPackage.appId,
          timestamp: signPackage.timestamp,
          nonceStr: signPackage.nonceStr,
          signature: signPackage.signature,
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
        });
        let allName = this.listC;
        let imgPath = this.img_path;
        console.log(allName);
        console.log(imgPath);
        wx.onMenuShareTimeline({
          title: allName.crowd_funding_name, // 分享标题
          desc: allName.summary, // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgPath // 分享图标
          // success: function() {
          //   this.$toast({
          //     message: "分享成功",
          //     duration: "500"
          //   });
          //   // 用户确认分享后执行的回调函数
          // }
          // cancel: function() {
          //   _this.$toast({
          //     message: "取消分享成功",
          //     duration: "500"
          //   });
          //   // 用户取消分享后执行的回调函数
          // }
        });
        wx.onMenuShareAppMessage({
          title: allName.crowd_funding_name, // 分享标题
          desc: allName.summary, // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgPath // 分享图标
          // success: function() {
          //   this.$toast({
          //     message: "分享成功",
          //     duration: "500"
          //   });
          //   // 用户确认分享后执行的回调函数
          // }
        });
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },

  methods: {
    onChange(index) {
      let video = document.querySelector("video");
      this.numV = index;
      if (this.numV != 0 && this.showV == true) {
        this.showVi = true;
        video.pause();
      }
    },
    imghir() {
      ImagePreview(this.picList);
    },
    pauseVideo() {
      //暂停\播放
      this.time = 0;
      let video = document.querySelector("video");
      if (this.showV == true) {
        video.play();
      }

      this.showVi = false;
    },
    onPlayerEnded(player) {
      this.time = 3500;
      //视频结束
      this.showVi = true;
    },
    wishesHit() {
      this.$router.push({
        path: "/wishs"
      });
    },
    handleChange(item, index) {
      this.nowIndex = index;
      this.$root.eventHub.$emit("changeTab", index);
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
    closeTouch: function() {
      document
        .getElementById("tan")
        .addEventListener("touchmove", this.handler, { passive: false }); //阻止默认事件
    },
    // openTouch: function() {
    //   document
    //     .getElementsByTagName("body")[0]
    //     .removeEventListener("touchmove", this.handler, { passive: false }); //打开默认事件
    // },

    // 点击弹窗
    selectSort() {
      this.closeTouch(); //关闭默认事件
      this.istanchuan = true;
      this.isshowa = false;
    },
    selectSorta() {
      this.closeTouch(); //关闭默认事件
      this.istanchuana = true;
      this.isshowa = false;
    },
    // 点击关闭
    chaClik() {
      // this.openTouch(); //打开默认事件
      this.istanchuan = false;
      this.istanchuana = false;
      this.isshowa = true;
    },
    // 点击规格变化
    tab(index) {
      // 颜色
      this.num = index;
      this.clickList = this.listP[index];
    },
    // 点击确定
    confirm() {
      wishList(
        this.count,
        this.clickList.crowd_funding_return_id,
        this.$route.query.key
      )
        .then(res => {
          // if (res.data.status == "-2012") {
          //   this.$router.push({ path: "/phone" });
          // } else {

          // }
          this.$toast({
            message: "添加购物车成功",
            duration: "1000"
          });
          this.istanchuan = false;
          this.isshowa = true;
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    // 点击下单
    ljxd() {
      // if (store.state.token == null) {
      //   this.$router.push({ path: "/phone" });
      // } else {

      // }
      const arry = [
        this.$route.query.key,
        this.clickList.crowd_funding_return_id,
        this.count
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
.joinwa {
  width: 30%;
  text-align: center;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  background: #D21623;
  height: 42px;
  line-height: 38px;
  opacity: 0.1;
}

// 解决swiper高度
.swiper-slide {
  height: 0px;
  overflow-y: hidden;
}

.swiper-slide-active {
  height: auto;
}

.isFixed {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  background: #fff;
}

.detailWrap {
  position: relative;
  padding-bottom: 50px;
  background: #fff;
}

.topt {
  position: fixed;
  width: 100%;
  height: 20%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
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

.topone .middle {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cha {
  margin-top: -70px;
  width: 72%;
  margin-right: -10px;
}

.middle {
  margin-left: 10px;
}

.middle .price {
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

.querens {
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
  opacity: 0.2;
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
  -webkit-overflow-scrolling: touch;
  /* ios 自带滚动条不平滑解决方法 */
}

.layerNode ::-webkit-scrollbar {
  display: none;
}

.content {
  margin-bottom: 18px;
  padding-top: 1px;
}

.layerNode .active {
  color: #D21623;
}

.imgsaa {
  position: absolute;
  left: 45%;
  width: 50px;
  top: 170px;
}

.detailWrap >>> .van-swipe__indicator {
  width: 8px;
  height: 8px;
  background-color: #fff;
  opacity: 1;
}

.swiper-img {
  width: 100%;
  height: 100%;
}
</style>
