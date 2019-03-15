<template></template>
<script type="text/javascript">
import * as types from "@/components/vuex/types";
import store from "@/components/vuex/store";
import { Code } from "@/components/axios/api";
import { huoqu } from "@/components/axios/api";
// import { SignPackage } from "@/components/axios/api";

export default {
  created() {
    // 获取当前页面的链接给后台
    huoqu(window.location.href)
      .then(res => {
        let URL = res.data.data;
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
        let iswx =navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
        if (iswx) {
          const code = localStorage.getItem("weixin-redirect-code");
          if (code == null || code  == undefined) {
            window.location.replace(URL);
            localStorage.setItem("weixin-redirect-code", "2019");
          } 
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() { this.refrech()},
  methods: {
    refrech() {
      // 拿到跳转后的链接
      const url = window.location.href;
      console.log(url);
      // const urlLength = url.split("?").length;
      // console.log(urlLength);
      // if (urlLength == 1) {
      //   return;
      // }
      const code = url.split("code=")[1].split("&")[0];
      console.log(code);
    
      Code(code)
        .then(res => {
          console.log(res.data.data);
          const data = res.data.data;
          const access = data.access_token;
          localStorage.setItem("keys", access); //将变量imgs存储到name字段

          const imgs = data.openid; //声明个变量存储下数据
          localStorage.setItem("key", imgs); //将变量imgs存储到name字段

          const tokenmine = data.token;
          this.$store.commit(types.LOGIN, tokenmine);
          // if()
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  },
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


