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
export default {
  name: "App",
  // provide() {
  //   return {
  //     reload: this.reload
  //   };
  // },
  // data() {
  //   return {
  //     isRouterAlive: true
  //   };
  // },
  components: {
    Grant,
    FadeAnimation
  },
  mounted() {},
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