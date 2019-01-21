<template>
  <div class="wrap">
    <!-- 推荐 -->
    <div :class="searchBarFixed == true ? 'isFixed' :''" id="searchBar">
      <home-header></home-header>
      <ly-tab v-model="selectedId" :items="items" :options="options" @change="handleChange"></ly-tab>
    </div>
    <van-swipe :autoplay="3000" indicator-color="#D21623" :touchable="false" v-if="shiw">
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
    </van-swipe>
    <div class="swiper-box">
      <div class="swiper-container wrapWa">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item of list" :key="item.id">
            <component :is="item.component"></component>
          </div>
        </div>
      </div>
    </div>
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

    <van-popup v-model="shows">
      <img src="@/assets/linjuan/6.png" alt class="imgNew" @click="hitNew">
    </van-popup>
    <van-popup v-model="showsa">
      <img src="@/assets/linjuan/7.png" alt class="imgNew">
    </van-popup>
    <!-- <div class="allIMG" v-if="shows">
    
    </div>

    <div class="allIMG" v-if="showsa">
      <img src="@/assets/linjuan/7.png" alt class="imgNew" @click="hitNe">
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);
import { peosLin } from "@/components/axios/api";
import Item from "@/components/Item.vue";
import Home from "@/pages/home/Home.vue";
import Dizhi from "@/pages/home/Dizhi.vue";
import Fuli from "@/pages/home/Fuli.vue";
import Youji from "@/pages/home/Youji.vue";
import Mshu from "@/pages/home/Mshu.vue";
import Yugao from "@/pages/home/Yugao.vue";
import Finish from "@/pages/home/finish.vue";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
import HomeHeader from "@/pages/home/components/Header.vue";
import { lookOption } from "@/components/axios/api";
import { huoqu } from "@/components/axios/api";
import { Code } from "@/components/axios/api";
// import { Member } from "@/components/axios/api";

export default {
  name: "Small",
  components: {
    HomeHeader,
    Home,
    Dizhi,
    Fuli,
    Youji,
    Mshu,
    Yugao,
    Item,
    Finish
  },
  data() {
    return {
      showsa: false,
      shows: false,
      shiw: true,
      sowingMap: [],
      meta: {
        keepAlive: true // true 表示需要使用缓存 false表示不需要被缓存
      },
      selectedId: 0,
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
        // {
        //   txt: "花果山",
        //   page: "peos",
        //   normalImg: require("@/assets/foot/peos.png"),
        //   activeImg: require("@/assets/foot/peoss.png")
        // },
        {
          txt: "心愿单",
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
      searchBarFixed: false,
      list: [
        { component: Home },
        { component: Dizhi },
        { component: Fuli },
        { component: Youji },
        { component: Mshu },
        { component: Yugao },
        { component: Finish }
      ],
      nowIndex: 0
    };
  },
  created: function() {
    var userID = localStorage.getItem("userID");
    // console.log(userID);
    if (userID == "1") {
      this.shows = true;
    }
    // 获取当前页面的链接给后台
    huoqu(window.location.href)
      .then(res => {
        let URL = res.data.data;
        // console.log(URL);
        var value = localStorage.getItem("shuyuhan");
        // console.log(value);
        // 只做一次跳转
        if (value == null || value == undefined) {
          setTimeout(function() {
            localStorage.setItem("shuyuhan", "18");
            window.location.href = URL;
            // console.log(URL);
          }, 800);
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
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
    // 拿到跳转后的链接
    const url = window.location.href;
    if (url.split("?").length == 1) {
      // this.$router.push("/");
    } else {
      const localarr = url.split("?")[1].split("&");
      let code = localarr[0].split("=")[1];
      // console.log(code);
      Code(code)
        .then(res => {
          // console.log(url);
          // console.log(res.data.data);
          var imgs = res.data.data; //声明个变量存储下数据
          localStorage.setItem("key", imgs); //将变量imgs存储到name字段
          // this.$router.go(-2);
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }

    window.addEventListener("scroll", this.watchScroll);
    let mySwiperA = new Swiper(".wrapWa", {});
    mySwiperA.on("slideChange", () => {
      this.selectedId = mySwiperA.activeIndex;
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件
      // this.$root.eventHub.$emit("slideTab", mySwiperA.activeIndex);
      if (mySwiperA.activeIndex >= 3) {
        this.shiw = false;
      } else {
        this.shiw = true;
      }
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    this.$root.eventHub.$on("changeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiperA.slideTo(index, 0, false);
    });

    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址---如果是自己定义写nav
    // this.$root.eventHub.$on("slideTab", this.slideTab);
  },
  methods: {
    getVal: function(res) {
      this.selected = res;
    },
    handleChange(item, index) {
      this.nowIndex = index;
      this.$root.eventHub.$emit("changeTab", index);
    },
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var _this = this;
      if (scrollTop > 0) {
        _this.searchBarFixed = true;
      } else {
        _this.searchBarFixed = false;
      }
    },
    destroyed() {
      window.removeEventListener("scroll", this.watchScroll);
    },
    hitNew() {
      peosLin()
        .then(res => {
          localStorage.setItem("userID", "0");
          this.shows = false;
          this.showsa = true;
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wrap >>>.van-popup {
  width: 65%;
}

.imgNew {
  width: 100%;
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
</style>
