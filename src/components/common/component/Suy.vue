<template>
  <div>
    <div v-show="imga" class="content">暂无数据</div>
    <div class="container wrap" v-if="show">
      <video id="first-video" width="100%" height="250px" :src="list" controls="controls"></video>
      <video id="first-video" width="100%" height="250px" :src="lists" controls="controls"></video>
      
      <video id="first-video" width="100%" height="250px" :src="lista" controls="controls"></video>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { crowd_funding } from "@/components/axios/api";
export default {
  data() {
    return {
      show: true,
      list: "",
      lists: "",
      lista: "",
      imga: false
    };
  },
  created() {
    this.id = this.$route.query.key; //获取上个页面传递的id,在下面获取数据的时候先提交id
    crowd_funding(this.id)
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          if (data.video_url == "") {
            this.show = false;
            this.imga = true;
          }
          this.list = data.video_url.split(",")[0];
          this.lists = data.video_url.split(",")[1];
          this.lista = data.video_url.split(",")[2];
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    //   pauseVideo() {
    //   //暂停\播放
    //   let video = document.getElementById("first-video");
    //   console.log(videoa);
    //   if (this.playOrPause) {
    //     video.play();
    //   }
    //   this.show = false;
    // },
    // onPlayerEnded(player) {
    //   //视频结束
    //   this.show = true;
    // }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wrap {
  margin-top: 50px;
  padding-bottom: 60px;
}

#first-video {
  width: 100%;
  height: 250px;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.content {
  font-size: 14px;
  color: #666;
  margin-top: 250px;
  margin-left: 43%;
}
</style>
