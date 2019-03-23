<template></template>
<script type="text/javascript">

// import store from "@/components/vuex/store";
// import * as types from "@/components/vuex/types";
import { Code } from "@/components/axios/api";
import { huoqu } from "@/components/axios/api";
// import { SignPackage } from "@/components/axios/api";
let iswx =
  navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
  "micromessenger";
export default {
  // inject: ["reload"],

  created() {
       
    // 获取当前页面的链接给后台
    huoqu(window.location.href)
      .then(res => {
        let URL = res.data.data;
        if (iswx  && this.$store.state.token == "") {
          const onid = localStorage.getItem("houas");
          console.log(onid);
          if (onid == null || onid == undefined) {
            localStorage.setItem("houas", "1314");
            window.location.href = URL;
          }
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
     console.log(3)
    if (iswx  && this.$store.state.token == "") {
      const codes = localStorage.getItem("houjss");
      console.log(codes);
      if (codes == null || codes == undefined) {
        this.refrech();
        localStorage.setItem("houjss", "520");
      }
    }
  },
  methods: {
    refrech() {
      // 拿到跳转后的链接
      const url = window.location.href;
      console.log(url);
      const code = url.split("code=")[1].split("&")[0];
      const newurl = url.split("code=")[0];
      Code(code)
        .then(res => {
          console.log(res.data.data);
          const data = res.data.data;
          const accessTokens = data.access_token;
          const openids = data.openid;
          localStorage.setItem("accessTokens", accessTokens);
          localStorage.setItem("openids", openids);
          const tokens = data.token;
          const unionid = data.unionid;
          // const subscribe = data.subscribe;
          // this.$store.commit({
          //   type: "addIncrement",
          //   accessTokens: accessTokens,
          //   openids: openids,
          //   tokens: tokens
          //   // subscribe: subscribe
          // });
          this.$store.commit("changeToken", tokens);
          //如果没绑定手机号 跳到绑定页面
          if (data.is_bind_mobile == 0) {
            setTimeout(() => {
              this.$router.push({
                path: "/bindm",
                query: {
                  dataObj: unionid
                }
              });
            }, 1800);
          }
          window.location.href = newurl;
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  },

};
</script>
<style lang="stylus" scoped>
</style>


