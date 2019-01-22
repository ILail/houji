<template>
  <div>
    <img :src="img" alt class="Himg" @click="showLists">
    <div class="list">
      <div
        v-for="(item,index) in wordArry"
        :key="item.id"
        :class="{active:index == num}"
        @click="wordActive(index)"
        class="listLI"
      >{{item}}</div>
    </div>

    <div class="swiper-box">
      <div class="swiper-container wrapS">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item of list" :key="item.id">
            <keep-alive>
              <component :is="item.component"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
    <div style="height:200px;width:100%"></div>
    <!-- 产品 -->
    <!-- <div class="main_a">
      <div class="listAll container">
        <img
          src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112105532_76920.jpg"
          class="crowd-img"
        >
        <div class="intro-area">
          <div class="title">朱礼茶国品安吉茶一罐50克</div>
          <div class="intro">不是所有的白茶都是安吉白茶</div>
          <div class="middle">
            <span class="priceNow">限时价：</span>
            <span class="priceTrue">¥ 125</span>
          </div>
          <div class="bottom">
            <span class="bottomS">仅剩286件</span>
            <span class="bottomM">马上抢</span>
          </div>
        </div>
      </div>
      <div style="background:#eee;height:10px"></div>
      <div class="listAll container">
        <img
          src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112105532_76920.jpg"
          class="crowd-img"
        >
        <div class="intro-area">
          <div class="title">朱礼茶国品安吉茶一罐50克</div>
          <div class="intro">不是所有的白茶都是安吉白茶</div>
          <div class="middle">
            <span class="priceNow">限时价：</span>
            <span class="priceTrue">¥ 125</span>
          </div>
          <div class="bottom">
            <span class="bottomS">仅剩286件</span>
            <span class="bottomM">马上抢</span>
          </div>
        </div>
      </div>
      <div style="background:#eee;height:10px"></div>
      <div class="listAll container">
        <img
          src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112105532_76920.jpg"
          class="crowd-img"
        >
        <div class="intro-area">
          <div class="title">朱礼茶国品安吉茶一罐50克</div>
          <div class="intro">不是所有的白茶都是安吉白茶</div>
          <div class="middle">
            <span class="priceNow">限时价：</span>
            <span class="priceTrue">¥ 125</span>
          </div>
          <div class="bottom">
            <span class="bottomS">仅剩286件</span>
            <span class="bottomM">马上抢</span>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
import one from "@/pages/home/weal/one";
import two from "@/pages/home/weal/two";
import three from "@/pages/home/weal/three";
import { weal } from "@/components/axios/api";
export default {
  name: "Fuli",
  data() {
    return {
      show: false,
      wordArry: ["上半场", "下半场", "限量半价"],
      list: [{ component: one }, { component: two }, { component: three }],
      num: 0,
      img: ""
    };
  },
  created() {
    weal()
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          console.log(data)
          this.img = data.sowingmap[0].pic;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    let mySwiperS = new Swiper(".wrapS", {});
    mySwiperS.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件

      this.$root.eventHuC.$emit("slideTab", mySwiperS.activeIndex);
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    this.$root.eventHuC.$on("changeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiperS.slideTo(index, 0, false);
    });
    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
    this.$root.eventHuC.$on("slideTab", this.slideTab);
  },
  methods: {
    slideTab(index) {
      this.num = index;
    },
    wordActive(index) {
      this.num = index;
      this.$root.eventHuC.$emit("changeTab", index);
    },
    showLists() {
      this.$router.push("/onsale");
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.Himg {
  width: 100%;
  margin-bottom: 5px;
}

.list {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin: 0.3rem 10% 0;
}

.listLI {
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
  padding-bottom: 0.2rem;
}

.listLI:nth-child(2) {
  margin: 0 0.9rem;
}

.line {
  background: #C8C8C8;
  width: 1px;
  height: 10px;
  margin: -0.05rem 0.5rem 0;
}

.list .active {
  border-bottom: 2px solid #F28F18;
  color: #F28F18;
  font-weight: 600;
}
</style>
 