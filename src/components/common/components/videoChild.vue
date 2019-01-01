<template>
  <div :class="[{an:isAndroid,ios:isiOS}] " class="container">
    <video
      id="first-video"
      width="100%"
      height="250px"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-playsinline
      playsinline
      webkit-playsinline
      preload="auto"
      :src="url"
      :poster="poster"
      :playOrPause="playOrPause"
      x-webkit-airplay="allow"
      @click="pauseVideo"
      @ended="onPlayerEnded($event)"
    ></video>
    <img v-show="isVideoShow" class="play" @click="playvideo" v-if="isiOS" :src="poster">
    <img v-show="isShow" class="platStart" @click="androidPlay" v-if="isAndroid" :src="poster">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "videoChild",
  props: {
    url: String,
    poster: String
  },
  data() {
    var u = navigator.userAgent;
    return {
      //	      poster: this.appConfig('app.img_url'),
      //	      videoUrl: this.appConfig('app.video_url'),
      isVideoShow: true,
      isShow: true,
      playOrPause: true,
      video: null,
      isAndroid: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, // android终端
      isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    };
  },
  methods: {
    playvideo(event) {
      if (this.isiOS) {
        let video = document.querySelector("video");

        this.isVideoShow = false;
        video.play();
        //          进入全屏
        window.onresize = function() {
          video.style.width = window.innerWidth + "px";
          video.style.height = window.innerHeight + "px";
        };
      }
    },
    pauseVideo() {
      //暂停\播放
      let video = document.querySelector("video");
      if (this.playOrPause) {
        video.pause();
      } else {
        video.play();
      }
      this.playOrPause = !this.playOrPause;
    },
    onPlayerEnded(player) {
      //视频结束
      this.isVideoShow = true;
      this.isShow = true;
    },
    androidPlay() {
      let video = document.querySelector("video");
      this.isShow = false;
      video.play();
    }
  }
};

// export default {
//   data() {
//     return {
//       _dom: "",
//       videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
//       videoImg:
//         "http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg",
//       playStatus: "",
//       muteStatus: "",
//       isMute: true,
//       isPlay: false
//     };
//   },
//   methods: {
//     playClick() {
//         this._dom = document.getElementById('myvideo');
//         this.isPlay = !this.isPlay;
//         this._dom.play();
//     },
//     closeSoundClick() {
//       this.isMute = !this.isMute;
//       if (this.isMute) {
//         this.muteStatus = "";
//       } else {
//         this.muteStatus = "muted";
//       }
//     }
//   }
// };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
#first-video {
  object-fit: fill;
}

.play, .platStart {
  width: 100%;
}
</style>
