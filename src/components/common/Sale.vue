<template>
  <div ref="wrappers" style="visibility:hidden;">
    <img src="@/assets/a.jpg" style="width:100%">
    <div id="btn"></div>
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
    return {};
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
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var btn = document.getElementById("btn");
      var userID = localStorage.getItem("userID");
      console.log(userID);
      var _this = this;
      if (scrollTop > 1000) {
        var _this = this;
        btn.onclick = function() {
          console.log(1213);
          if (userID == "1") {
            _this.$toast({
              message: "未领取会员",
              duration: "500"
            });
            setTimeout(function() {
              _this.$router.push('/');
            }, 1000);
          } else {
            _this.$toast({
              message: "已经领取会员",
              duration: "500"
            });
            setTimeout(function() {
              _this.$router.go(-1);
            }, 1500);
          }

          // Member()
          //   .then(res => {
          //     console.log(res.data.status);
          //     if (res.data.status == 1) {
          //       Toast("领取会员成功");
          //       setTimeout(function() {
          //         _this.$router.go(-1);
          //       }, 3000);
          //     }
          //     if (res.data.status == 0) {
          //       Toast("已经领取会员");
          //       setTimeout(function() {
          //         _this.$router.go(-1);
          //       }, 3000);
          //     }
          //   })
          //   .catch(err => {
          //     console.log(err, "请求失败");
          //   });
        };
      }
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
#btn {
  position: fixed;
  bottom: 80px;
  height: 80px;
  background: #fff;
  opacity: 0;
  width: 100%;
}
</style>
