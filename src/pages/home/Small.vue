<template>
  <div class="wrap">
    <div :class="searchBarFixed == true ? 'isFixed' :''" id="searchBar">
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
    <mt-swipe :auto="3500" style="height:187.5px" v-if="wrapImg">
      <mt-swipe-item v-for="item of sowingMap" :key="item.id">
        <!-- <router-link
          :to="{  
        path: 'hdetial',     
        query: {   
            key: item.link, // orderNum : this.searchData.orderNo
        }
    }"
        >-->
        <img class="swiper-img" v-lazy="item.pic" @click="changes(item.link)">
        <!-- </router-link> -->
      </mt-swipe-item>
    </mt-swipe>
    <!-- 导航内容 -->
    <div class="swiper-container wrapWa">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="index of 7" :key="index">
          <keep-alive>
            <component :is="currentView"></component>
          </keep-alive>
        </div>
      </div>
    </div>

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
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import Tabbar from "@/components/common/Tan";
import Item from "@/components/Item";
import Home from "./components/Home";
import Dizhi from "./components/Dizhi";
import Fuli from "./components/Fuli";
import Youji from "./components/Youji";
import Mshu from "./components/Mshu";
import Yugao from "./components/Yugao";
import Finish from "./components/finish";
// import Welfare from "./components/Welfare";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
import { lookOption } from "@/components/axios/api";
// import assign from "@/components/axios/assign.js";
export default {
  // mixins: [assign],
  name: "Small",
  components: {
    Tabbar,
    Item,
    Home,
    Dizhi,
    Fuli,
    Youji,
    Mshu,
    Yugao,
    Finish
    // Welfare
  },
  data() {
    return {
      currentView: "Home",
      wrapImg: true,
      items: [
        { label: "推荐" },
        { label: "地理标志" },
        { label: "猴集卡" },
        { label: "有机产品" },
        { label: "民宿" },
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
          // console.log(data);
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
    var mySwiperA = new Swiper(".wrapWa", {
      // preventClicks : true,//默认true
      // preventLinksPropagation : true,
      touchMoveStopPropagation: false,
      observer: true
    });
    this.$root.eventHub.$on("changeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiperA.slideTo(index, 0, false);
    });
    mySwiperA.on("slideChange", () => {
      this.selectedId = mySwiperA.activeIndex;
      // console.log(mySwiperA.activeIndex);
      switch (mySwiperA.activeIndex) {
        case 0:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Home";
          break;
        case 1:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Dizhi";
          break;
        case 2:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Fuli";
          break;
        case 3:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Youji";
          break;
        case 4:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Mshu";
          break;

        case 5:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Yugao";
          break;

        case 6:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Finish";
          break;
      }

      if (mySwiperA.activeIndex >= 2) {
        this.wrapImg = false;
      } else {
        this.wrapImg = true;
      }
    });
  },
  methods: {
    getVal: function(res) {
      this.selected = res;
    },
    handleChange(item, index) {
      this.$root.eventHub.$emit("changeTab", index);
      switch (index) {
        case 0:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Home";
          break;
        case 1:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Dizhi";
          break;
        case 2:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Fuli";
          break;
        case 3:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Youji";
          break;
        case 4:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Mshu";
          break;

        case 5:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Yugao";
          break;

        case 6:
          this.$toast({
            message: "加载中...",
            duration: "500"
          });
          this.currentView = "Finish";
          break;
      }
      if (index >= 2) {
        this.wrapImg = false;
      } else {
        this.wrapImg = true;
      }
    },
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var _this = this;
      if (scrollTop > 32) {
        _this.searchBarFixed = true;
      } else {
        _this.searchBarFixed = false;
      }
    },
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

.active span {
  color: #d21623;
}

.wrap >>> .mint-swipe-indicator {
  opacity: 1;
  background: #fff;
}

.wrap >>> .mint-swipe-indicator.is-active {
  background: #b21822;
}

.swiper-img {
  width: 100%;
  height: 100%;
}
</style>
