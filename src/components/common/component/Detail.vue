<template>
  <div class="wrapAll" v-show="show" v-cloak>
    <!-- 轮播 -->
    <!-- <van-swipe :autoplay="time" indicator-color="#D21623" @change="onChange" style="height:380px">
      <van-swipe-item v-if="shows">
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
      
        ></video>
        
        <img :src="imgs" class="imgsaa" @click="pauseVideo" v-show="show">
      </van-swipe-item>
      <van-swipe-item v-for="item of piclistAll" :key="item.id">
        <img class="swiper-img needsclick" :src="item" @click="imghir">
      </van-swipe-item>
    </van-swipe>-->
    <!-- 内容 -->
    <div class="container" style=" box-shadow: 0px 1px 24px 0px rgba(255, 255, 255, 0.75);">
      <div class="title top" ref="fundingName">{{listAll.crowd_funding_name}}</div>
      <div class="content top" ref="summary">{{listAll.summary}}</div>
      <div class="price top">
        <span class="mubiao">已售金额：</span>
        <span class="Mmoney">{{computedmoey(listAll)}}</span>
      </div>
    </div>
    <!-- 人员 -->
    <div class="people top">
      <div class="progressAll">
        <div class="progress-outer">
          <span class="progress" :style="{width:computedWidth(listAll)+'%'}"></span>
        </div>
        <span class="progressA" :style="{left:computedR(listAll)+'%'}">{{listAll.progress}}%</span>
      </div>
      <ul>
        <li>
          <span class="peopleT">{{computedmoeys(listAll)}}</span>
          <span class="peopleC">目标金额</span>
        </li>
        <li class="linesss"></li>
        <li>
          <span class="peopleT">{{listAll.support_num}}</span>
          <span class="peopleC">支持人数</span>
        </li>
        <li class="linesss"></li>
        <li>
          <span class="peopleT">{{computedResidualTime(listAll)}}</span>
          <span class="peopleC">剩余时间</span>
        </li>
      </ul>
      <div class="lines"></div>
      <!-- 价格 -->
      <div class="middCon container">
        <div class="flexa">
          <span class="flexl">¥{{listAll.support_money}}</span>
          <!-- <span class="wordess">125</span> -->
        </div>
        <div class="flexa">
          <span class="flexr" @click="flexr">立即支持</span>
          <img :src="img" style="width:8px">
        </div>
      </div>
      <div class="line container"></div>
      <!-- 查看全部档位 -->
      <!-- <div class="allName" @click="flexr">查看全部档位</div> -->
      <div class="allName container">预计发货时间：预售项目结束7天后</div>
      <div class="lines"></div>
    </div>
    <!-- 人员信息 -->
    <div class="Originator">
      <img :src="listAll.headimgurl">
      <div class="middle">
        <div class="middleName">{{listAll.nickname}}</div>
        <div class="middleB">
          <span class="middleC">发起项目：{{listAll.statistics}}项</span>
          <span class="middleC" style="margin-left:.5rem">支持人数：{{listAll.total_number}}人</span>
        </div>
      </div>
    </div>
    <div class="lines" style="margin: 0;"></div>
    <!-- 详情页 -->
    <div class="peoDela" v-html="listAll.content"></div>
  </div>
  <!-- 底部 -->
</template>
<script>
// import { crowd_funding } from "@/components/axios/api";
import { SignPackage } from "@/components/axios/api";
// import this.$bus from "@/bus/Bus.vue";
export default {
  props: {
    listAll: {}
  },
  data() {
    return {
      show: false,
      img: require("@/assets/rr.png"),
      busing: false,
    };
  },
  created() {
    setTimeout(() => {
      this.show = true;
    }, 1500);
  },
  watch: {
    listAll() {
      this.$nextTick(function() {
        // console.log(this.listAll);
        const title = this.listAll.crowd_funding_name;
        const desc = this.listAll.summary;
        const imgUrl = this.listAll.imgs.split(",")[0];
        const value = localStorage.getItem("accessTokens");
        const url = window.location.href;
        // console.log(url);
        if (value == null) return;
        SignPackage(url, value)
          .then(res => {
            // console.log(res.data.data.signPackage);
            let signPackage = res.data.data.signPackage;

            wx.config({
              debug: false,
              appId: signPackage.appId,
              timestamp: signPackage.timestamp,
              nonceStr: signPackage.nonceStr,
              signature: signPackage.signature,
              jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
            });

            wx.onMenuShareTimeline({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl // 分享图标
            });
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl // 分享图标
            });
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
      });
    }
  },

  mounted() {},
  methods: {
    flexr() {
      this.$bus.$emit("msg", this.busing);
    },
    computedR: function(listAll) {
      let width = listAll.progress + 1.6;
      if (width >= 13) {
        width = listAll.progress - 1.6;
      }
      if (width >= 98.4) {
        width = 86;
      }
      return `${width}`;
    },
    computedResidualTime: function(listAll) {
      let residualTime = listAll.left_time;
      let day = parseInt(residualTime / (24 * 3600));
      if (day <= 0) {
        day = 0;
      }
      return `${day}天`;
    },
    computedWidth: function(listAll) {
      let width = listAll.progress;
      if (width >= 100) {
        width = 100;
      }
      return `${width}`;
    },
    computedmoey: function(listAll) {
      let money = listAll.now_money;
      let moneys = parseInt(money);

      return `${moneys}元`;
    },
    computedmoeys: function(listAll) {
      let money = listAll.goal_money;
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

[v-cloak] {
  display: none !important;
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

[v-cloak] {
  display: none;
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
  width: 60px;
  height: 60px;
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
  padding-bottom: 10px;
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
</style>


