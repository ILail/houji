<template>
  <div class="wrap">
    <van-popup v-model="shows">
      <img src="@/assets/linjuan/6.png" alt class="imgNew" @click="hitNew">
    </van-popup>
    <van-popup v-model="showsa">
      <img src="@/assets/linjuan/7.png" alt class="imgNew">
    </van-popup>
  </div>
</template>
<script>
import { peosLin } from "@/components/axios/api";

export default {
  data() {
    return {
      showsa: false,
      shows: false
    };
  },
  created() {
    var userID = localStorage.getItem("userID");
    // console.log(userID);
    if (userID == "1") {
      this.shows = true;
    }
  },
  methods: {
    hitNew() {
      peosLin()
        .then(res => {
          localStorage.setItem("userID", "0");
          this.shows = false;
          this.showsa = true;
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wrap p {
  position: fixed;
  top: 0;
  left: 45%;
  color: pink;
}

.wrap >>>.van-popup {
  width: 65%;
}

.imgNew {
  width: 100%;
}
</style>


