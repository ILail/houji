<template>
  <div>
    <div class="peosWrap">
      <!-- 头部 -->
      <!-- <div class="title">
        <div></div>
        <div class="peos"></div>
        <div class="leftP">
          <img :src="require('@/assets/fabu.png')" alt>
          <span>发布</span>
        </div>
      </div>-->
      <!-- <yd-slider autoplay="3000" class="wrapperS">
        <yd-slider-item>
          <img
            class="swiper-img"
            src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112111437_31852.jpg"
          >
        </yd-slider-item>

        <yd-slider-item>
          <img
            class="swiper-img"
            src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112111437_31852.jpg"
          >
        </yd-slider-item>

        <yd-slider-item>
          <img
            class="swiper-img"
            src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112111437_31852.jpg"
          >
        </yd-slider-item>
      </yd-slider>-->
      <!-- 轮播 -->
      <!-- <div class="wrapperS">
      <swiper :options="swiperOptionS">
        <swiper-slide>
          <img
            class="swiper-img"
            src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112111437_31852.jpg"
          >
        </swiper-slide>
        <swiper-slide>
          <img
            class="swiper-img"
            src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112111437_31852.jpg"
          >
        </swiper-slide>
        <swiper-slide>
          <img
            class="swiper-img"
            src="http://qiniuyun.ngba.cn/Uploads/image/default/2018-11/20181112111437_31852.jpg"
          >
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      </div>-->
      <!-- 内容区 -->
      <!-- <div>
        <div class="content">
          <div class="peosCon">
            <div class="left">
              <img :src="require('@/assets/wx.jpg')">
            </div>
            <div class="right">
              <div class="word" style="color:#E88A25">
                城南花已开
                <span>
                  <img :src="require('@/assets/b.png')" class="wordImg">
                </span>
              </div>
              <div class="wordC">确实值得推荐，味道很不错。连续吃了两天！</div>
              <div class="number">
                <div>57分钟前</div>
                <div class="hitNum">
                  <div class="dianzan">
                    <img :src="require('@/assets/dian.png')">111
                  </div>
                  <div class="pl">
                    <img :src="require('@/assets/pl.png')">25
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="background:#eee;height:10px"></div>
      </div>
      <div>
        <div class="content">
          <div class="peosCon">
            <div class="left">
              <img :src="require('@/assets/wx.jpg')">
            </div>
            <div class="right">
              <div class="word" style="color:#E88A25">
                城南花已开
                <span>
                  <img :src="require('@/assets/b.png')" class="wordImg">
                </span>
              </div>
              <div class="wordC">确实值得推荐，味道很不错。连续吃了两天！</div>
              <div class="number">
                <div>57分钟前</div>
                <div class="hitNum">
                  <div class="dianzan">
                    <img :src="require('@/assets/dian.png')">111
                  </div>
                  <div class="pl">
                    <img :src="require('@/assets/pl.png')">25
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="background:#eee;height:10px"></div>
      </div>
      <div>
        <div class="content">
          <div class="peosCon">
            <div class="left">
              <img :src="require('@/assets/wx.jpg')">
            </div>
            <div class="right">
              <div class="word" style="color:#E88A25">
                城南花已开
                <span>
                  <img :src="require('@/assets/b.png')" class="wordImg">
                </span>
              </div>
              <div class="wordC">确实值得推荐，味道很不错。连续吃了两天！ 真的很好吃a！</div>
              <div class="number">
                <div>57分钟前</div>
                <div class="hitNum">
                  <div class="dianzan">
                    <img :src="require('@/assets/dian.png')">111
                  </div>
                  <div class="pl">
                    <img :src="require('@/assets/pl.png')">25
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="word">模块开发中</div>
    </div>
    <!-- <div class="fabu">
      <img src="@/assets/push.png">
    </div>-->
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
// import Vue from "vue";
// import { Slider, SliderItem } from "vue-ydui/dist/lib.rem/slider";
// /* 使用px：import {Slider, SliderItem} from 'vue-ydui/dist/lib.px/slider'; */

// Vue.component(Slider.name, Slider);
// Vue.component(SliderItem.name, SliderItem);
import Item from "@/components/Item.vue";
export default {
  name: "Peos",
  components: {
    Item
  },
  data() {
    return {
      selected: "peos",
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
      ]
    };
  },
  methods: {
    getVal: function(res) {
      this.selected = res;
    }
  }
};
</script>
<style lang="stylus" scoped>
.title {
  padding: 0 3% 0 3%;
  margin-top: 0.12rem;
  overflow: hidden;
  height: 44px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.peos {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
}

.leftP {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.leftP img {
  width: 0.34rem;
}

.wrapperS >>> .swiper-pagination-bullet-active {
  background: red;
}

.swiper-img {
  width: 100%;
}

.content {
  width: 94%;
  margin: 0 auto;
  padding: 0;
  position: relative;
}

.left {
  width: 12%;
}

.left img {
  width: 100%;
}

.right {
  width: 86%;
}

.peosCon {
  overflow: hidden;
  padding: 28px 0 18px 0;
  display: flex;
  justify-content: space-between;
}

.dianzan {
  margin-right: 10px;
}

.dianzan img {
  width: 0.28rem;
  height: 0.3rem;
  margin-right: 0.03rem;
}

.pl img {
  width: 0.32rem;
  height: 0.3rem;
  margin-right: 0.03rem;
}

.number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

.word {
  font-size: 15px;
}

.wordImg {
  width: 0.24rem;
  vertical-align: baseline;
}

.wordC {
  font-size: 15px;
  margin-top: 8px;
  line-height: 1.4;
}

.hitNum {
  display: flex;
  align-items: center;
}

.hitNum img {
  vertical-align: bottom;
}

.fabu {
  bottom: 60px;
  right: 10px;
  position: fixed;
  text-align: right;
}

.peosWrap {
  padding-bottom: 80px;
}

.fabu img {
  width: 40%;
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

.word{
  position absolute
  top 40%
  left 40%
  font-size 14px
}
</style>


