<template>
  <div ref="wrappers" style="visibility:hidden;">
    <img src="@/assets/a.jpg" style="width:100%">
    <div class="btn" @click="btn"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Member } from "@/components/axios/api";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "ConfirHeader",
  // props: {
  //   letter: Object
  // },
  data() {
    return {
      scrollTop: ""
    };
  },
  created() {
    setTimeout(() => {
      this.$refs.wrappers.style.visibility = "visible";
    }, 500);
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
    watchScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    btn() {
      var userID = localStorage.getItem("userID");

      if (this.scrollTop > 1000) {
        var _this = this;
        _this.$toast({
          message: "领取会员成功",
          duration: "1000"
        });
        setTimeout(() => {
          _this.$router.go(-1);
        }, 1200);
        // if (userID == "1") {
        //   this.$toast({
        //     message: "已经领取过会员",
        //     duration: "1000"
        //   });
        //   _this.$router.go(-1);
        // }
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.watchScroll);
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.btn {
  position: fixed;
  bottom: 80px;
  height: 80px;
  background: #fff;
  opacity: 0;
  width: 100%;
}
</style>
