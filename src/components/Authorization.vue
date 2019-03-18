<template></template>
<script type="text/javascript">
// import * as types from "@/components/vuex/types";
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
          const codes = localStorage.getItem("housa");
          if (codes == null || codes == undefined) {
            location.href = URL;
            localStorage.setItem("housa", "1");
          }
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {

    if (iswx) {
      this.refrech();
    }
  },
  methods: {
    refrech() {
      // 拿到跳转后的链接
      const url = window.location.href;
      const oances = localStorage.getItem("oances");
      if (oances == null || oances == undefined) {
        const code = url.split("code=")[1].split("&")[0];
        console.log(code);
        // const newurl = url.split("code=")[0];
        Code(code)
          .then(res => {
            console.log(res.data.data);
            const data = res.data.data;

            const accessTokens = data.access_token;
            const openids = data.openid;
            localStorage.setItem("accessTokens",accessTokens)
            localStorage.setItem("openids",openids)
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
            this.$store.commit(types.LOGIN, tokens);
            //如果没绑定手机号 跳到绑定页面
            if (data.is_bind_mobile == 0) {
              setTimeout(() => {
                this.$router.push({
                  path: "/bindm",
                  query: {
                    dataObj: unionid
                  }
                });
              }, 3000);
            }
            // window.location.href = newurl;
            // this.reload();
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
          localStorage.setItem("oances", "2");
      }
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


