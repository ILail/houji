<template></template>
<script type="text/javascript">
// import * as types from "@/components/vuex/types";
import store from "@/components/store/index";
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
          const code = localStorage.getItem("wehob");
          if (code == null || code == undefined) {
            location.href = URL;
            localStorage.setItem("wehob", "2");
          }
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    // console.log(store.state.accessToken);
    // console.log(store.state.openid);
    // console.log(store.state.token);
    if (iswx) {
      this.refrech();
    }
  },
  methods: {
    refrech() {
      // 拿到跳转后的链接
      const url = window.location.href;

      // console.log(store.state.accessToken);
      // console.log(store.state.openid);
      // console.log(store.state.token);
      if (localStorage.getItem("wehob") == 2) {
        const code = url.split("code=")[1].split("&")[0];
        console.log(code);
        const newurl = url.split("code=")[0];
        Code(code)
          .then(res => {
            console.log(res.data.data);
            const data = res.data.data;
            const accessToken = data.access_token;
            const openid = data.openid;
            const tokenmine = data.token;
            const unionid = data.unionid;
            // const subscribe = data.subscribe;
            this.$store.commit({
              type: "addIncrement",
              accessToken: accessToken,
              openid: openid,
              getCode: tokenmine
              // subscribe: subscribe
            });

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
            window.location.href = newurl;
            // this.reload();
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
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


