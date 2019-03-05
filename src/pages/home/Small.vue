<template>
  <div class="wrap">
    <!-- :class="searchBarFixed == true ? 'isFixed' :''" id="searchBar" -->
    <div class="isFixed">
      <!-- 头部 -->
      <div class="header">
        <div class="header-left" @click="shaoshao">
          <img src="@/assets/shousuo.png">
        </div>
        <router-link to="/search" style="width:75%">
          <div class="header-input">
            <span>
              <img
                src="@/assets/search.png"
                style="vertical-align: sub;margin-right:4px;width:.28rem"
              >
            </span>请输入您想支持的项目
          </div>
        </router-link>
        <div class="header-right" @click="xiaoxiao">
          <img src="@/assets/new.png">
        </div>
      </div>
      <!-- 导航 -->
      <ly-tab v-model="selectedId" :items="items" :options="options" @change="handleChange"></ly-tab>
    </div>
    <div class="wraL">
      <home-swiper :sowingMap="sowingMap" v-if="wrapImg"></home-swiper>
    </div>

    <!-- 轮播 -->
    <!-- <van-swipe :autoplay="3000" indicator-color="#D21623" :touchable="false" v-if="showSwiper">
      <van-swipe-item v-for="item of sowingMap" :key="item.id">
        <router-link
          :to="{  
        path: 'Detail',     
        query: {   
            key: item.link, // orderNum : this.searchData.orderNo
        }
    }"
        >
          <img :src="item.pic" style="height:190px;width:100%">
        </router-link>
      </van-swipe-item>
    </van-swipe>-->
    <!-- <div class="wrapper" v-if="wrapImg">
      <swiper :options="swiperOption" v-if="showSwiper">
        <swiper-slide v-for="item of sowingMap" :key="item.id">
          <router-link
            :to="{  
        path: 'Detail',     
        query: {   
            key: item.link, // orderNum : this.searchData.orderNo
        }
    }"
          >
            <img class="swiper-img" :src="item.pic">
         
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>-->
    <!-- 导航内容 -->
    <!-- <div class="swiper-container wrapWa">
      <div class="swiper-wrapper">
    <div class="swiper-slide">-->
    <fade-animation>
      <v-touch v-on:swipeleft="left" v-on:swiperight="right">
        <keep-alive>
          <component :is="currentView"></component>
        </keep-alive>
      </v-touch>
    </fade-animation>
    <!-- </div>
      </div>
    </div>-->
    <!-- 底部 -->
    <div class="tabberWarp">
      <div class="warp">
        <Item
          :txt="item.txt"
          :page="item.page"
          v-on:change="getVal"
          v-for="item in tabbarDes"
          :sel="selected"
          :key="item.id"
        >
          <img :src="item.normalImg" slot="normalImg">
          <img :src="item.activeImg" slot="activeImg">
        </Item>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
// import wx from "weixin-js-sdk";
import HomeSwiper from "./components/components/swiper";
import FadeAnimation from "@/components/common/Fade";
import Tabbar from "@/components/common/Tan";
import Item from "@/components/Item";
import Home from "./components/Home";
import Dizhi from "./components/Dizhi";
import Fuli from "./components/Fuli";
// import Youji from "./components/Youji";
import Mshu from "./components/Mshu";
import Yugao from "./components/Yugao";
import Finish from "./components/finish";
// import Welfare from "./components/Welfare";
// import Swiper from "moon/swiper.min";
// import "moon/swiper.min.css";
import { lookOption } from "@/components/axios/api";
import assign from "@/components/axios/assign.js";
import { SignPackage } from "@/components/axios/api";
// import { WechatPlugin} from 'vux'
// Vue.use(WechatPlugin); //  微信
// const wx = Vue.wechat;
export default {
  mixins: [assign],
  name: "Small",
  components: {
    HomeSwiper,
    FadeAnimation,
    Tabbar,
    Item,
    Home,
    Dizhi,
    Fuli,
    Mshu,
    Yugao,
    Finish
  },
  data() {
    return {
      currentView: "Home",
      wrapImg: true,
      items: [
        { label: "推荐" },
        { label: "猴集卡" },
        { label: "地理标志" },
        { label: "海外淘" },
        { label: "预告" },
        { label: "已完成" }
      ],
      options: {
        activeColor: "#D21623"
        // 可在这里指定labelKey为你数据里文字对应的字段名
      },
      sowingMap: [],
      // 导航
      selectedId: 0,
      // 底部
      selected: "",
      tabbarDes: [
        {
          txt: "首页",
          page: "",
          normalImg: require("@/assets/foot/home.png"),
          activeImg: require("@/assets/foot/homes.png")
        },
        {
          txt: "分类",
          page: "feilei",
          normalImg: require("@/assets/foot/fix.png"),
          activeImg: require("@/assets/foot/fixs.png")
        },
        {
          txt: "花果山",
          page: "peos",
          normalImg: require("@/assets/foot/peos.png"),
          activeImg: require("@/assets/foot/peoss.png")
        },
        {
          txt: "购物车",
          page: "wishs",
          normalImg: require("@/assets/foot/wish.png"),
          activeImg: require("@/assets/foot/wishs.png")
        },
        {
          txt: "我的",
          page: "mines",
          normalImg: require("@/assets/foot/mine.png"),
          activeImg: require("@/assets/foot/mines.png")
        }
      ],
      // 置顶
      searchBarFixed: false
      // list: [
      //   { component: Home },
      //   { component: Dizhi },
      //   { component: Fuli },
      //   { component: Youji },
      //   { component: Mshu },
      //   { component: Yugao },
      //   { component: Finish },
      //   // { component: Welfare }
      // ],
      // nowIndex: 0
    };
  },
  // computed: {
  //   showSwiper() {
  //     return this.sowingMap.length;
  //   }
  // },
  created() {
    lookOption()
      .then(res => {
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;
          this.sowingMap = data.sowingMap;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    let value = localStorage.getItem("keys");
    let url = window.location.href;
    console.log(this.$wx);
    if (value == null) return;
    SignPackage(url, value)
      .then(res => {
        console.log(this.$wx);
        console.log(res.data.data.signPackage);
        let signPackage = res.data.data.signPackage;
        this.$wx.config({
          debug: false,
          appId: signPackage.appId,
          timestamp: signPackage.timestamp,
          nonceStr: signPackage.nonceStr,
          signature: signPackage.signature,
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
        });
        this.$wx.ready(function() {
          this.$wx.onMenuShareAppMessage({
            title: "猴集官方服务号", // 分享标题
            desc: "集全球健康食材！！！", // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://h5.ngba.cn/image/pic300.jpg", // 分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              alert("分享给朋友成功");
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
        });
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // window.addEventListener("scroll", this.watchScroll);
    // var mySwiperA = new Swiper(".wrapWa", {
    // preventClicks : true,//默认true
    // preventLinksPropagation : true,
    // touchMoveStopPropagation: false
    // observer: true
    // });
    // this.$root.eventHub.$on("changeTab", index => {
    //   // 点击导航键跳转相应内容区
    //   mySwiperA.slideTo(index, 0, false);
    // });
    // mySwiperA.on("slideChange", () => {
    //   this.selectedId = mySwiperA.activeIndex;
    //   // console.log(mySwiperA.activeIndex);
    //   switch (mySwiperA.activeIndex) {
    //     case 0:
    //       this.$toast({
    //         message: "加载中...",
    //         duration: "500"
    //       });
    //       this.currentView = "Home";
    //       break;
    //     case 1:
    //       this.$toast({
    //         message: "加载中...",
    //         duration: "500"
    //       });
    //       this.currentView = "Dizhi";
    //       break;
    //     case 2:
    //       this.$toast({
    //         message: "加载中...",
    //         duration: "500"
    //       });
    //       this.currentView = "Fuli";
    //       break;
    //     case 3:
    //       this.$toast({
    //         message: "加载中...",
    //         duration: "500"
    //       });
    //       this.currentView = "Youji";
    //       break;
    //     case 4:
    //       this.$toast({
    //         message: "加载中...",
    //         duration: "500"
    //       });
    //       this.currentView = "Mshu";
    //       break;
    //     case 5:
    //       this.$toast({
    //         message: "加载中...",
    //         duration: "500"
    //       });
    //       this.currentView = "Yugao";
    //       break;
    //     case 6:
    //       this.$toast({
    //         message: "加载中...",
    //         duration: "500"
    //       });
    //       this.currentView = "Finish";
    //       break;
    //   }
    //   if (mySwiperA.activeIndex >= 2) {
    //     this.wrapImg = false;
    //   } else {
    //     this.wrapImg = true;
    //   }
    // });
  },
  methods: {
    left() {
      // console.log(123);
      // console.log(this.currentView);
      switch (this.currentView) {
        case "Home":
          this.currentView = "Fuli";
          this.selectedId = 1;
          this.wrapImg = false;

          break;
        case "Fuli":
          this.currentView = "Dizhi";
          this.selectedId = 2;
          break;

        case "Dizhi":
          this.currentView = "Mshu";
          this.selectedId = 3;
          break;

        case "Mshu":
          this.currentView = "Yugao";
          this.selectedId = 4;
          this.wrapImg = false;
          break;

        case "Yugao":
          this.currentView = "Finish";
          this.selectedId = 5;
          this.wrapImg = false;
          break;

        case "Finish":
          this.currentView = "Home";
          this.selectedId = 0;
          document.body.scrollTop = 0;
          break;
      }
    },
    right() {
      // console.log(1234);
      // console.log(this.currentView);
      switch (this.currentView) {
        case "Home":
          this.currentView = "Finish";
          this.selectedId = 5;
          this.wrapImg = false;
          document.body.scrollTop = 0;
          break;

        case "Finish":
          this.currentView = "Yugao";
          this.selectedId = 4;
          this.wrapImg = false;
          break;

        case "Yugao":
          this.currentView = "Mshu";
          this.selectedId = 3;
          break;

        case "Mshu":
          this.currentView = "Dizhi";
          this.selectedId = 2;
          break;

        case "Dizhi":
          this.currentView = "Fuli";
          this.selectedId = 1;
          this.wrapImg = false;
          break;

        case "Fuli":
          this.currentView = "Home";
          this.selectedId = 0;
          break;
      }
    },
    getVal: function(res) {
      this.selected = res;
    },
    handleChange(item, index) {
      // console.log(item);
      // this.$root.eventHub.$emit("changeTab", index);
      switch (index) {
        case 0:
          // this.$toast({
          //   message: "加载中...",
          //   duration: "500"
          // });
          this.currentView = "Home";
          break;
        case 1:
          // this.$toast({
          //   message: "加载中...",
          //   duration: "500"
          // });
          this.currentView = "Fuli";
          break;
        case 2:
          // this.$toast({
          //   message: "加载中...",
          //   duration: "500"
          // });
          this.currentView = "Dizhi";
          break;
        case 3:
          // this.$toast({
          //   message: "加载中...",
          //   duration: "500"
          // });
          this.currentView = "Mshu";
          break;
        case 4:
          // this.$toast({
          //   message: "加载中...",
          //   duration: "500"
          // });
          this.currentView = "Yugao";
          break;
        case 5:
          // this.$toast({
          //   message: "加载中...",
          //   duration: "500"
          // });
          this.currentView = "Finish";
          break;
      }
      if (index != 0 && index != 2 && index != 3) {
        this.wrapImg = false;
      } else {
        this.wrapImg = true;
      }
    },
    // watchScroll() {
    //   var scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   var _this = this;
    //   if (scrollTop > 32) {
    //     _this.searchBarFixed = true;
    //   } else {
    //     _this.searchBarFixed = false;
    //   }
    // },
    changes(id) {
      if (id == 237 || id == 275 || id == 286) {
        this.$router.push({
          path: "/Detail",
          query: {
            key: id
          }
        });
      } else {
        this.$router.push({
          path: "/hdetial",
          query: {
            key: id
          }
        });
      }
    },
    shaoshao() {
      // this.$router.push("/shao");
    },
    xiaoxiao() {
      this.$router.push("/xiao");
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.watchScroll);
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wraL {
  margin-top: 76px;
}

.header {
  display: flex;
  line-height: 0.64rem;
  align-items: center;
  justify-content: space-between;
  width: 93%;
  margin: 0 auto;
  padding: 0;
  position: relative;

  .header-left img {
    width: 0.64rem;
  }

  .header-input {
    height: 0.64rem;
    line-height: 0.64rem;
    background: #EDEDED;
    border-radius: 0.1rem;
    color: #999;
    text-align: center;
  }

  .header-right img {
    width: 0.64rem;
  }
}

.wrap >>> .ly-tabbar {
  box-shadow: none;
}

.wrap >>> .ly-tab-active-bar {
  bottom: 0;
}

.isFixed {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  background: #fff;
}

.warp {
  width: 100%;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0;
}

.warp img {
  width: 20px;
  height: 20px;
}

.tabberWarp img {
  margin-top: 10px;
  margin-bottom: 5px;
}

.tabberWarp {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 5px;
  background: #fff;
  z-index: 9999;
}
</style>
