<template></template>
<script type="text/javascript">
import store from "@/components/vuex/store";
import * as types from "@/components/vuex/types";
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
        // console.log(URL)
        // console.log(URL);
        // var value = localStorage.getItem("houjis");
        // console.log(value);
        // 只做一次跳转
        // if (value == null || value == undefined) {
        //   // setTimeout(function() {
        //   localStorage.setItem("houjis", "2019");
        //   window.location.href = URL;
        //   // console.log(URL);
        //   // }, 800);
        // }
        // console.log(URL);
        // if (store.state.token == null) {
        //   window.location.replace(URL);
        //   this.refrech();
        // }
        // }
        // location.href=URL;
        if (iswx) {
          const onid = localStorage.getItem("housss");
          console.log(onid);
          if (onid == null || onid == undefined) {
            localStorage.setItem("housss", "1314");
            window.location.href = URL;
          }
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    if (iswx) {
      const codes = localStorage.getItem("houjisa");
      console.log(codes);
      if (codes == null || codes == undefined) {
        this.refrech();
        localStorage.setItem("houjisa", "520");
      }
    }
  },
  methods: {
    refrech() {
      // 拿到跳转后的链接
      const url = window.location.href;
      console.log(url);

      const code = url.split("code=")[1].split("&")[0];
      // const newurl = url.split("code=")[0];

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
          // console.log(tokens)
          // console.log(this.$store)
          console.log(this.$store);
          console.log(tokens);
          store.commit(types.LOGIN, tokens);
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
        })
        .catch(err => {
          console.log(err, "请求失败");
        });

      // setTimeout(() => {
      //   window.location.href = newurl;
      // }, 100);
    }
  }
  //   destroyed() {
  //   //离开页面清空 sessionStorage 中的 weixin-redirect-code
  //    let iswx = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
  //    if (iswx) {
  //       sessionStorage.removeItem('weixin-redirect-code')
  //     }
  // },
};
</script>
<style lang="stylus" scoped>
</style>


