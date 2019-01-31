<template>
  <div>
    <!-- 轮播 -->
    <van-swipe :autoplay="time" :touchable="false" indicator-color="#D21623" @change="onChange">
      <van-swipe-item v-if="shows">
        <video
          width="100%"
          height="375px"
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
        ></video>
        
        <img :src="imgs" class="imgsaa" @click="pauseVideo" v-show="show">
      </van-swipe-item>
      <van-swipe-item v-for="item of picList" :key="item.id">
        <img class="swiper-img" :src="item" @click="imghir" style="width:100%">
      </van-swipe-item>
    </van-swipe>
    <!-- 内容 -->
    <div v-cloak>
      <div class="container" style=" box-shadow: 0px 1px 24px 0px rgba(255, 255, 255, 0.75);">
        <div class="title top">{{list.crowd_funding_name}}</div>
        <div class="content top">{{list.summary}}</div>
        <div class="price top">
          <span class="mubiao">已售金额：</span>
          <span class="Mmoney">{{computedmoey(list)}}</span>
        </div>
      </div>
      <!-- 人员 -->
      <div class="people top">
        <div class="progressAll">
          <div class="progress-outer">
            <span class="progress" :style="{width:computedWidth(list)+'%'}"></span>
          </div>
          <span class="progressA" :style="{left:computedR(list)+'%'}">{{list.progress}}%</span>
        </div>
        <ul>
          <li>
            <span class="peopleT">{{computedmoeys(list)}}</span>
            <span class="peopleC">目标金额</span>
          </li>
          <li class="linesss"></li>
          <li>
            <span class="peopleT">{{list.support_num}}</span>
            <span class="peopleC">支持人数</span>
          </li>
          <li class="linesss"></li>
          <li>
            <span class="peopleT">{{computedResidualTime(list)}}</span>
            <span class="peopleC">剩余时间</span>
          </li>
        </ul>
        <div class="lines"></div>
        <!-- 价格 -->
        <div class="middCon container">
          <div class="flexa">
            <span class="flexl">¥{{list.support_money}}</span>
            <!-- <span class="wordess">125</span> -->
          </div>
          <div class="flexa">
            <span class="flexr" @click="flexr">立即支持</span>
            <img :src="img" style="width:8px">
          </div>
        </div>
        <div class="line container"></div>
        <!-- 查看全部档位 -->
        <div class="allName" @click="flexr">查看全部档位</div>
        <div class="lines"></div>
      </div>
      <!-- 人员信息 -->
      <div class="Originator">
        <img :src="list.headimgurl">
        <div class="middle">
          <div class="middleName">{{list.nickname}}</div>
          <div class="middleB">
            <span class="middleC">发起项目：{{list.statistics}}项</span>
            <span class="middleC" style="margin-left:.5rem">支持人数：{{list.total_number}}人</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 详情页 -->
    <div class="peoDela" v-html="list.content"></div>

    <!-- 底部 -->
  </div>
</template>
<script>
import { crowd_funding } from "@/components/axios/api";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { ImagePreview } from "vant";
Vue.use(Swipe).use(SwipeItem);
// import this.$bus from "@/bus/Bus.vue";
export default {
  data() {
    return {
      list: {},
      picList: [],
      pic: "",
      video: "",
      imgs: require("@/assets/bof.png"),
      img: require("@/assets/rr.png"),
      num: "",
      show: true,
      time: 3000,
      shows: true,
      istanchuana: true,
    };
  },
  created() {
    this.id = this.$route.query.key; //获取上个页面传递的id,在下面获取数据的时候先提交id
    crowd_funding(this.id)
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          this.list = data;
          console.log(this.list);
          this.picList = data.imgs.split(",");
          this.pic = res.data.video_pic;
          this.video = res.data.video_data;
          if (this.pic == "" && this.video == "") {
            this.shows = false;
          }
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    flexr() {
      this.$bus.$emit("msg", this.istanchuana);
    },
    onChange(index) {
      this.num = index;
    },
    imghir() {
      ImagePreview(this.picList);
    },
    pauseVideo() {
      //暂停\播放
      this.time = 0;
      let video = document.querySelector("video");
      // console.log(this.num);
      if (this.num != 0) {
        video.pause();
      }
      video.play();

      this.show = false;
    },
    onPlayerEnded(player) {
      this.time = 3000;
      //视频结束
      this.show = true;
    },
    computedR: function(list) {
      let width = list.progress;
      if(width>=100){
        width = 85
      }
      return `${width}`;
    },
    computedResidualTime: function(list) {
      let residualTime = list.left_time;
      let day = parseInt(residualTime / (24 * 3600));
      if (day <= 0) {
        day = 0;
      }
      return `${day}天`;
    },
    computedWidth: function(list) {
      let width = list.progress;
      if (width >= 100) {
        width = 100;
      }
      return `${width}`;
    },
    computedmoey: function(list) {
      let money = list.now_money;
      let moneys = parseInt(money);

      return `${moneys}元`;
    },
    computedmoeys: function(list) {
      let money = list.goal_money;
      let moneys = parseInt(money);

      return `${moneys}元`;
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.line {
  margin-top: 10px;
  height: 1px;
  background: rgba(229, 229, 229, 1);
}

.flexl {
  font-size: 19px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(210, 22, 35, 1);
}

.middCon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.middCon .flexa {
  display: flex;
  align-items: center;
}

.allName {
  font-size: 14px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  text-align: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 10px;
}

.linesss {
  width: 1px;
  height: 42px;
  background: rgba(212, 212, 212, 1);
}

.flexr {
  font-size: 14px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
  margin-right: 0.2rem;
}

.imgsaa {
  position: absolute;
  left: 45%;
  width: 50px;
  top: 170px;
}

[v-cloak] {
  display: none;
}

.swiper-img {
  height: 375px;
}

.wordess {
  text-decoration: line-through;
}

.top {
  margin-top: 10px;
}

.title {
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 1.3;
}

.content {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 1.3;
}

.mubiao {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.Mmoney {
  font-size: 19px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(210, 22, 35, 1);
}

.price {
  display: flex;
  align-items: center;
}

.people {
  box-shadow: 0px 1px 24px 0px rgba(255, 255, 255, 0.75);
}

.people ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  padding-bottom: 10px;
}

.people ul li {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.progressAll {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0.2rem 20px 0.2rem;
}

.progressA {
  font-size: 12px;
  color: #fff;
  background: #FBA23E;
  border-radius: 10px;
  width: 50px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  position: absolute;
}

.progress-outer {
  width: 100%;
  height: 0.1rem;
  position: relative;
  background-color: #EEEEEE;
  border-radius: 5px;
}

.progress-outer .progress {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #FBA23E;
  border-radius: 5px;
}

.peopleT {
  font-size: 16px;
  font-family: SanFranciscoDisplay-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}

.peopleC {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-top: 10px;
}

.Originator {
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 24px 0px rgba(255, 255, 255, 0.75);
  border-radius: 5px;
  padding: 15px 0.6rem;
  overflow: hidden;
  margin-top: 10px;
}

.Originator img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.Originator .middle {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.middleName {
  font-size: 15px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}

.middleC {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
}

.middleB {
  margin-top: 5px;
}

.lines {
  width: 100%;
  height: 10px;
  background: rgba(244, 244, 244, 1);
  margin: 10px 0;
}

.peoDela >>> p img {
  width: 100%;
}

.peoDela >>> p {
  margin-top: 20px;
  padding-bottom: 50px;
}
</style>


