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
        <!-- <div class="imgsaaa" @click="pauseVideo" v-show="show">
          <img :src="imgs">
        </div>-->
        <img :src="imgs" class="imgsaa" @click="pauseVideo" v-show="show">
        <!-- <img :src="pic" style="width:100%"> -->
      </van-swipe-item>
      <van-swipe-item v-for="item of picList" :key="item.id">
        <img class="swiper-img" :src="item" @click="imghir" style="width:100%">
      </van-swipe-item>
    </van-swipe>
    <!-- 内容 -->
    <div class="container" v-cloak>
      <div class="title top">{{list.crowd_funding_name}}</div>
      <div class="content top">{{list.summary}}</div>
      <div class="price top">
        <span class="mubiao">目标金额</span>
        <span class="Mmoney">¥{{list.goal_money}}</span>
      </div>
      <!-- 人员 -->
      <div class="people top">
        <ul>
          <li>
            <span class="peopleT">{{list.now_money}}</span>
            <span class="peopleC">预售金额/元</span>
          </li>
          <li>
            <span class="peopleT">{{computedResidualTime(list)}}</span>
            <span class="peopleC">剩余时间/天</span>
          </li>
          <li>
            <span class="peopleT">{{list.support_num}}</span>
            <span class="peopleC">支持人数</span>
          </li>
        </ul>
        <div class="progressAll">
          <div class="progress-outer">
            <span class="progress" :style="{width:computedWidth(list)+'%'}"></span>
          </div>
          <span class="progressA">{{list.progress}}%</span>
        </div>
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
export default {
  data() {
    return {
      list: {},
      picList: [],
      pic: "",
      video: "",
      imgs: require("@/assets/bof.png"),
      num: "",
      show: true,
      time: 3000,
      shows: true
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
      console.log(this.num);
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
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
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
  margin-left: 10px;
}

.price {
  display: flex;
  align-items: center;
}

.people {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 24px 0px rgba(224, 224, 224, 0.75);
  border-radius: 5px;
  overflow: hidden;
}

.people ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.6rem 0 0.6rem;
  margin: 20px 0 20px 0;
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
  padding: 0 0.6rem 20px 0.6rem;
}

.progressA {
  font-size: 12px;
  color: rgba(255, 113, 55, 1);
  border: 1px solid rgba(255, 150, 102, 1);
  border-radius: 10px;
  padding: 0.01rem 0.02rem;
}

.progress-outer {
  width: 87%;
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
  background: linear-gradient(90deg, rgba(255, 41, 48, 1), rgba(255, 117, 55, 1));
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
  box-shadow: 0px 1px 24px 0px rgba(224, 224, 224, 0.75);
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

.peoDela >>> p img {
  width: 100%;
}

.peoDela >>> p {
  margin-top: 20px;
  padding-bottom: 50px;
}
</style>


