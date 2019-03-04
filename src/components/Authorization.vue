<template></template>
<script type="text/javascript">
import * as types from "@/components/vuex/types";
import { Code } from "@/components/axios/api";
import { huoqu } from "@/components/axios/api";
import { Jssdk } from "@/components/axios/api";
export default {
  created() {
    // 获取当前页面的链接给后台
    huoqu(window.location.href)
      .then(res => {
        let URL = res.data.data;
        // console.log(URL);
        var value = localStorage.getItem("ngba");
        // console.log(value);
        // 只做一次跳转
        if (value == null || value == undefined) {
          // setTimeout(function() {
          localStorage.setItem("ngba", "18");
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
      // this.$router.push("/");
      console.log(123);
    } else {
      const localarr = url.split("?")[1].split("&");
      let code = localarr[0].split("=")[1];
      // console.log(1111);
      Code(code)
        .then(res => {
          // console.log(url);
          var access = res.data.data.access_token;
          // console.log(res.data.data.access_token);
          localStorage.setItem("keys", access); //将变量imgs存储到name字段
          // console.log(res.data.data.openid);
          var imgs = res.data.data.openid; //声明个变量存储下数据
          // console.log(imgs);
          // this.$store.commit(types.OPPENDID, imgs);
          localStorage.setItem("key", imgs); //将变量imgs存储到name字段
          // this.$router.go(-2);
          Jssdk()
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
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


