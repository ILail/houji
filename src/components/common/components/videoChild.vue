<template>
  <div class="container">
    <video
      id="first-video"
      width="100%"
      height="250px"
      controls="controls"
      :src="list"
      :playOrPause="playOrPause"
      @click="pauseVideo"
      @ended="onPlayerEnded($event)"
    ></video>
    <div class="imgsaaa" v-show="show">
      <img :src="imgs" @click="pauseVideo">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "videoChild",
  props: {
    list: String
  },
  data() {
    return {
      playOrPause: true,
      video: null,
      imgs: require("@/assets/bof.png"),
      show: true
    };
  },
  methods: {
    // playvideo(event) {
    //   if (this.isiOS) {
    //     let video = document.querySelector("video");
    //     this.isVideoShow = false;
    //     video.play();
    //     //          进入全屏
    //     window.onresize = function() {
    //       video.style.width = window.innerWidth + "px";
    //       video.style.height = window.innerHeight + "px";
    //     };
    //   }
    // },
    // pauseVideos() {
    //   //暂停\播放
    //   let videoa = document.getElementById("first-video");
    //   console.log(videoa);
    //   if (this.playOrPause) {
    //     videoa.play();
    //   }
    //   this.show = false;
    // },
    // onPlayerEnded(player) {
    //   //视频结束
    //   this.show = true;
    // }
    // androidPlay() {
    //   let video = document.querySelector("video");
    //   this.isShow = false;
    //   video.play();
    // }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
#first-video {
  object-fit: fill;
}

.imgsaaa {
  position: absolute;
  width: 100%;
  height: 250px;
  background: rgba(0, 0, 0, 0.6);
  left: 0;
  top: 0;
  overflow: hidden;
}

.imgsaaa img {
  margin-left: 42%;
  width: 50px;
  margin-top: 120px;
}
</style>
