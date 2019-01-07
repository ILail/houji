<template>
  <div ref="wrappers">
    <div class="container">
      <div class="wrap">
        <router-link to="/search">
          <div class="header-input">
            <span class="middle">
              <img
                src="@/assets/search.png"
                style="vertical-align: sub;margin-right:4px;width:.28rem"
              >
            </span>
            <input placeholder="输入关键字" class="input">
          </div>
        </router-link>
      </div>
      <div :class="searchBarFixed == true ? 'isFixed' :''" id="searchBar">
        <div class="title">
          <div
            v-for="(item,index) in tabs"
            :key="item.id"
            :class="{active:index == num}"
            @click="tab(index,item.crowd_funding_class_id)"
          >{{item.class_name}}</div>
        </div>
      </div>
    </div>
    <!-- 下面内容 -->
    <div class="swiper-box">
      <div class="swiper-container wrapA">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item of list" :key="item.id">
            <keep-alive>
              <component :is="item.component" :tabs="tabs"></component>
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
<script>
import one from "@/pages/fs/components/cp";
import two from "@/pages/fs/components/mshu";
import three from "@/pages/fs/components/jzai";
import four from "@/pages/fs/components/dabiao";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
import Item from "@/components/Item.vue";
import { fs } from "@/components/axios/api";
import bus from "@/bus/bus";
export default {
  name: "Feilei",
  components: {
    Item
  },
  data() {
    return {
      selected: "feilei",
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
      list: [
        { component: one },
        { component: two },
        { component: three },
        { component: four }
      ],
      tabs: [],
      searchBarFixed: false,
      num: ""
    };
  },

  created: function() {
    fs()
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          this.tabs = res.data;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
    setTimeout(() => {
      this.$refs.wrappers.style.visibility = "visible";
    }, 1000);

    // this.$refs.wrappers.style.visibility = "visible";

    let mySwiperA = new Swiper(".wrapA", {});
    mySwiperA.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件

      this.$root.eventHub.$emit("slideTab", mySwiperA.activeIndex);
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    this.$root.eventHub.$on("changeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiperA.slideTo(index, 0, false);
    });
    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
    this.$root.eventHub.$on("slideTab", this.slideTab);
  },
  methods: {
    slideTab(index) {
      this.num = index;
      bus.$emit("userDefinedEvent", this.tabs[index]);
    },
    getVal: function(res) {
      this.selected = res;
    },
    tab(index, id) {
      this.id = id;
      // console.log(this.id);
      this.num = index;
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
    }
  }
};
</script>
<style lang="stylus" scoped>
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
  width: 94%;
  background: #fff;
}

.wrap {
  .header-input {
    flex: 1;
    font-size: 13px;
    position: relative;
    color: #999;

    .input {
      line-height: 0.6rem;
      margin-top: 0.12rem;
      width: 100%;
      border-radius: 0.1rem;
      background: #EDEDED;
      text-align: center;
    }

    .middle {
      position: absolute;
      left: 35%;
      top: 0.26rem;
    }
  }
}

.title {
  margin-top: 14px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 3% 0 3%;
  border-bottom: 1px solid #EDEDED;
}

.title div {
  font-size: 14px;
  color: #333;
}

.title .active {
  color: #D21623;
  border-bottom: 2px solid #D21623;
  padding-bottom: 0.2rem;
}

// 底部
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


