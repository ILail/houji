<template>
  <div id="app">
    <!-- <keep-alive> -->
    <fade-animation>
      <router-view></router-view>
    </fade-animation>
    <!-- </keep-alive> -->
    <Grant></Grant>
    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
import Grant from "@/components/Authorization";
import FadeAnimation from "@/components/common/Fade";
import assign from "@/components/axios/assign.js";
import { Code } from "@/components/axios/api";
export default {
  name: "App",
  mixins: [assign],
  components: {
    Grant,
    FadeAnimation
  },
  created() {},
  mounted() {
    this.$toast({
      type: "loading",
      message: "加载中...",
      duration: "1200"
    });
    var code = localStorage.getItem("code")
    console.log(code)
    if(code == null) return
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
        // this.$store.commit(types.LOGIN, tokens);
        //如果没绑定手机号 跳到绑定页面
        if (data.is_bind_mobile == 0) {
          setTimeout(() => {
            this.$router.push({
              path: "/phone"
              // query: {
              //   dataObj: unionid
              // }
            });
          }, 3000);
        }
        // window.location.href = newurl;
        // this.reload();
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  }
  // methods: {
  //   reload() {
  //     this.isRouterAlive = false
  //     this.$nextTick(function(){
  //        this.isRouterAlive = true
  //     })
  //   }
  // }
};
</script>

<style>
</style>