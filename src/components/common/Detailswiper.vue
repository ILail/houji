<template>
  <div class="detailWrap" v-cloak>
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

    <div class="swiper-box">
      <div class="swiper-container wrapA">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item of list" :key="item.id">
            <keep-alive>
              <component :is="item.component" :listAll="listAll"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom" v-show="isbottom">
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
        <li class="joinw" @click="selectSorts()" v-if="joinw">立即购买</li>
        <li class="joinwa" v-else>已结束</li>
      </ul>
    </div>
    <van-popup v-model="showList" position="bottom" @click-overlay="clickOverlay">
      <div class="container">
        <div class="topone">
          <div class="middles">
            <img :src="img_path" class="topImg" @click="topImg">
            <div class="middlesM">
              <div>
                <span class="price">价格: ¥{{money}}</span>
              </div>

              <span class="cons">已选：{{clickList}}</span>
            </div>
          </div>
          <div @click="confireC">
            <img src="@/assets/cha.png" class="cha">
          </div>
        </div>
        <div class="roues">规格</div>
        <ul class="wrapUl">
          <li
            v-for=" (item,index) in listP "
            :key="item.id"
            @click="tab(index)"
            :class="{active:index == num}"
          >
            <span>{{item.return_content}}</span>
          </li>
        </ul>
        <div class="roues">数量</div>
        <div class="hitNum">
          <span @click="jian">-</span>
          <input type="text" v-model="numALL">
          <span @click="jia">+</span>
        </div>
        <div class="confire" @click="confire" v-if="confires" v-show="!over">确认</div>
        <div class="confire" v-else @click="ljxd" v-show="!over">立即购买</div>
        <div class="confiress" v-show="over">已结束</div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
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

import { crowd_funding } from "@/components/axios/api";
import { wishList } from "@/components/axios/api";
import { specifications } from "@/components/axios/api";

import store from "@/components/vuex/store";
// import assign from "@/components/axios/assign.js";
export default {
  // mixins: [assign],
  name: "Detail",
  components: {
    Detail,
    Travel,
    Plun,
    Suyuan
  },
  data() {
    return {
      over: false,
      joinw: true,
      showA: true,
      confires: true,
      showList: false,
      picList: [],
      pic: "",
      video: "",
      imgs: require("@/assets/bof.png"),
      daytime: "",
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
      // 顶部
      isshow: false,
      // 内容
      isbottom: true,
      numALL: 1,
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
      id: this.$route.query.key,
      money: "",
      listAll: ""
    };
  },
  created() {
    crowd_funding(this.id)
      .then(res => {
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;
          this.listAll = data;
          this.picList = data.imgs.split(",");
          this.img_path = this.picList[0];
          this.pic = res.data.video_pic;
          this.video = res.data.video_data;
          if (this.pic == "" && this.video == "") {
            this.showV = false;
          }

          let residualTime = data.left_time;
          let day = parseInt(residualTime / (24 * 3600));
          this.daytime = day;
          if (day <= 0) {
            this.joinw = false;
            this.over = true;
          }
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    specifications(this.id)
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          this.listP = data;
          this.money = data[0].support_money;
          // this.img_path = data[0].img_path;
          this.clickList = data[0].return_content;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  watch: {
    numALL() {
      if (this.numALL >= 100) {
        this.$toast({
          message: "最大99",
          duration: "1000"
        });
        this.numALL = 99;
      }
    }
  },
  mounted() {
    this.$bus.$on("msg", msg => {
      this.isbottom = msg;
      this.showList = !msg;
      this.confires = msg;
    });

    this.$nextTick(() => {
      const mySwiperA = new Swiper(".wrapA", {});

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
    clickOverlay() {
      this.isbottom = true;
    },
    selectSort() {
      this.isbottom = false;
      this.showList = true;
      this.confires = true;
    },
    selectSorts() {
      this.isbottom = false;
      this.showList = true;
      this.confires = false;
    },
    topImg() {
      ImagePreview(this.img_path.split(","));
    },
    tab(index) {
      // 颜色
      this.num = index;
      this.clickList = this.listP[index].return_content;
      this.money = this.listP[index].support_money;
    },

    jian() {
      if (this.numALL == 1) {
        this.$toast({
          message: "已经最小",
          duration: "1000"
        });
        return;
      }
      this.numALL--;
    },
    jia() {
      if (this.numALL >= 99) {
        this.$toast({
          message: "已经最大",
          duration: "1000"
        });
        return;
      }
      this.numALL++;
    },
    confireC() {
      this.showList = false;
      this.isbottom = true;
    },
    confire() {
      this.showList = false;
      this.isbottom = true;
      if (store.state.token == "") {
        this.$router.push({ path: "/phone" });
      } else {
        wishList(
          this.numALL,
          this.listP[this.num].crowd_funding_return_id,
          this.id
        )
          .then(res => {
            if (res.data.message == "操作成功") {
              this.$toast({
                message: "添加购物车成功",
                duration: "1000"
              });
            }
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
      }
    },
    // 点击下单
    ljxd() {
      if (store.state.token == "") {
        this.$router.push({ path: "/phone" });
      }
      const arry = [
        this.id,
        this.listP[this.num].crowd_funding_return_id,
        this.numALL
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
.detailWrap {
  position: relative;
  padding-bottom: 50px;
  background: #fff;
}

// 解决swiper高度
.swiper-slide {
  height: 0px;
  overflow-y: hidden;
}

.swiper-slide-active {
  height: auto;
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

.isFixed {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  background: #fff;
}

// 底部
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
.detailWrap >>> .van-popup {
  overflow-y: visible;
}

.topone {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.middles {
  display: flex;
  align-items: flex-end;
}

.middlesM .cons {
  width: 4.8rem;
  padding-top: 10px;
  padding-bottom: 2px;
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.middlesM {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.topImg {
  width: 89px;
  height: 89px;
  border-radius: 4px;
  margin-top: -30px;
}

.cha {
  width: 13px;
  margin-top: 8px;
}

.middles .price {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(168, 43, 51, 1);
}

.middles .typen {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  text-decoration: line-through;
  margin-left: 10px;
}

.roues {
  margin: 20px 0 15px 0;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
}

.wrapUl {
  width: 100%;
  height: 201px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  /* ios 自带滚动条不平滑解决方法 */
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.confire {
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  height: 44px;
  background: #D21623;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  margin: 80px 0 15px 0;
}

.wrapUl li {
  padding-top: 10px;
  padding-bottom: 15px;
}

.wrapUl span {
   width 94%
  line-height: 26px;
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  padding: 5px 10px;
  border: 1px solid rgba(102, 102, 102, 1);
  border-radius: 4px;
  display: inline-block;
 
}

.wrapUl .active span {
  border: 1px solid rgba(168, 43, 51, 1);
  color: #A82B33;
}

.hitNum {
  display: flex;
  align-items: center;
  text-align: center;
}

.hitNum input {
  width: 35px;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
  padding: 1.5px 0;
  text-align: center;
}

.hitNum span {
  width: 30px;
  border: 1px solid #666;
  padding: 5px 0;
}

.confiress {
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  height: 44px;
  background: #D21623;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  margin: 80px 0 15px 0;
  opacity: 0.2;
}

[v-cloak] {
  display: none !important;
}
</style>
