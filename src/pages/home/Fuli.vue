<template>
  <div>
    <!-- <home-swiper :list="sowingMap"></home-swiper> -->
    <div class="swiper-sale">
      <div class="swiper-container wrapSale">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiperTime" v-for="item of navList" :key="item.id">
            <span class="time">{{item.time}}</span>
            <span class="name">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="height:200px;width:100%"></div>
    <div v-if="show">
      <!-- 剩余时间 -->
      <div class="muchTime">
        <div class="line"></div>
        <div class="content">
          本场还剩余
          <span style="color:#333333">2：30：15</span>
        </div>
        <div class="line"></div>
      </div>
      <div style="background:#eee;height:10px"></div>
      <!-- 产品 -->
      <div class="main_a">
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
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
// import HomeSwiper from "./components/Swiper";
import { lookOption } from "@/components/axios/api";
export default {
  name: "Fuli",
  // components: {
  //   HomeSwiper
  // },
  // 从后台获取到时间数据
  data() {
    return {
      show: false,
      navList: [
        {
          name: "已经开抢",
          time: "10:00"
        },
        {
          name: "已经开抢",
          time: "12:00"
        },
        {
          name: "已经开抢",
          time: "14:00"
        },
        {
          name: "已经开抢",
          time: "16:00"
        },
        {
          name: "已经开抢",
          time: "18:00"
        },
        {
          name: "已经开抢",
          time: "20:00"
        }
      ],
      searchBarFixed: false,
      sowingMap: []
    };
  },
  created() {
    lookOption()
      .then(res => {
        // console.log(res.data);
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;
          this.sowingMap = data.sowingMap;
          this.popuLarity = data.popularity;
          this.dayProduct = data.dayProduct;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    var mySwiperA = new Swiper(".wrapSale", {
      autoHeight: true,
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true
    });
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.cube-scroll-nav-bar-item {
  display: inline-block;
  padding: 20px 20px !important;
}

.swiperTime {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 0 10px 0;
}

.wrapSale {
  background: rgba(210, 22, 35, 0.1);
}

.time {
  color: #333333;
  margin-bottom: 3px;
  font-size: 15px;
}

.name {
  color: #333333;
  font-size: 10px;
}

.muchTime {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0 20px 0;
}

.line {
  width: 20%;
  background: #cccccc;
  height: 1px;
}

.main_a {
  padding-bottom: 60px;
}

.content {
  color: #333333;
  font-size: 15px;
}

.listAll .crowd-img {
  width: 30%;
  border-radius: 0.1rem;
  height: 30%;
}

.main_a .listAll {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 18px 0 18px 0;
}

.listAll .intro-area {
  width: 67%;
  position: relative;
}

.intro-area .title {
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
}

.intro-area .intro {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.priceNow {
  color: #333333;
  font-size: 10px;
}

.priceTrue {
  color: #D21623;
  font-size: 13px;
}

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.middle {
  margin-top: 10px;
}

.bottomS {
  padding: 2px 13px 2px 13px;
  border-radius: 15px;
  background: rgba(210, 22, 35, 0.1);
  color: #D21623;
  font-size: 9px;
}

.bottomM {
  padding: 6px 16px;
  background: #D21623;
  border-radius: 5px;
  color: #fff;
  margin-right: 15px;
}
</style>
 