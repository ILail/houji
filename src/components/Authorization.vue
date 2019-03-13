<template></template>
<script type="text/javascript">
// import * as types from "@/components/vuex/types";
import { Code } from "@/components/axios/api";
import { huoqu } from "@/components/axios/api";
import { SignPackage } from "@/components/axios/api";

export default {
  created() {
    // 获取当前页面的链接给后台
    huoqu(window.location.href)
      .then(res => {
        let URL = res.data.data;
        // console.log(URL);
        var value = localStorage.getItem("ngbas");
        // console.log(value);
        // 只做一次跳转
        if (value == null || value == undefined) {
          // setTimeout(function() {
          localStorage.setItem("ngbas", "2019");
          window.location.href = URL;
          // console.log(URL);
          // }, 800);
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    // 拿到跳转后的链接
    const url = window.location.href;
    const urlLength = url.split("?").length;
    if (urlLength == 1) {
      console.log(123);
    } else {
      const localarr = url.split("?")[1].split("&");
      let code = localarr[0].split("=")[1];
      console.log(1111);
      Code(code)
        .then(res => {
          console.log(res.data.data);
          const access = res.data.data.access_token;
          localStorage.setItem("keys", access); //将变量imgs存储到name字段

          const imgs = res.data.data.openid; //声明个变量存储下数据
          localStorage.setItem("key", imgs); //将变量imgs存储到name字段
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
</style>


