<template></template>
<script type="text/javascript">
// import * as types from "@/components/vuex/types";
import * as types from "@/components/vuex/types";

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
          const onid = localStorage.getItem("houjiapp");
          if (onid == null || onid == undefined) {
            localStorage.setItem("houjiapp", "123");
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
      this.refrech();
    }
  },
  methods: {
    refrech() {
      // 拿到跳转后的链接
      const url = window.location.href;
      const code = url.split("code=")[1].split("&")[0];
      console.log(code);
       localStorage.setItem("code", code);
      // console.log(url.split("?"));
      // const uilLength = url.split("?");
      // if (uilLength.length == 1 || uilLength.length == 2) {
      //   return false;
      // }
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


