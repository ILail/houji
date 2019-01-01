<template>
  <div ref="wrappers" style="visibility:hidden;">
    <!-- 推荐 -->
    <div :class="searchBarFixed == true ? 'isFixed' :''" id="searchBar">
      <home-header></home-header>
      <ly-tab v-model="selectedId" :items="items" :options="options" @change="handleChange"></ly-tab>
    </div>
    <van-swipe :autoplay="3000" indicator-color="#D21623" v-if="shiw">
      <van-swipe-item v-for="item of sowingMap" :key="item.id">
        <router-link
          :to="{  
        path: 'Detail',     
        query: {   
            key: item.link, // orderNum : this.searchData.orderNo
        }
    }"
        >
          <img class="swiper-img" :src="item.pic" style="height:190px">
        </router-link>
      </van-swipe-item>
    </van-swipe>
    <div class="swiper-box">
      <div class="swiper-container wrapWa">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item of list" :key="item.id">
            <keep-alive>
              <component :is="item.component"></component>
            </keep-alive>
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
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe).use(SwipeItem);
import { lookOption } from "@/components/axios/api";
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
        {
          txt: "花果山",
          page: "peos",
          normalImg: require("@/assets/foot/peos.png"),
          activeImg: require("@/assets/foot/peoss.png")
        },
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
        { label: "福利专区" },
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
     setTimeout(
      function() {
        this.$refs.wrappers.style.visibility = "visible"
      }.bind(this),
      800
    );
    lookOption()
      .then(res => {
        // console.log(res.data);
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
    // this.scroll = new Bscroll(this.$refs.wrapper);
    window.addEventListener("scroll", this.watchScroll);
    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
    // this.$root.eventHub.$on("slideTab", this.slideTab);
    // 首页图片 设置定时器加载 不然swiper 会有bug (图片的吭) bind 解决this 指向
    setTimeout(
      function() {
        var mySwiperA = new Swiper(".wrapWa", {
          // 页面高度自适应
          autoHeight: true
          // initialSlide: this.$route.path === "/" ? 0 : 0
        });

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
        // console.log(mySwiperA);
      }.bind(this),
      1000
    );
  },
  methods: {
    getVal: function(res) {
      this.selected = res;
    },
    handleChange(item, index) {
      this.nowIndex = index;

      this.$root.eventHub.$emit("changeTab", index);
    },

    // slideTab(index) {
    // this.nowIndex = index;
    // let router = new VueRouter();
    // let href = index === 0 ? "/" : "/";
    // 利用路由的push方法更新路径地址
    // router.push(href);
    // },
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
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
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
