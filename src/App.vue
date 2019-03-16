<template>
  <div id="app">
    <!-- <keep-alive> -->
    <fade-animation>
      <router-view></router-view>
    </fade-animation>
    <!-- </keep-alive> -->
    <Guan></Guan>
    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
import Guan from "@/components/Authorization";
import FadeAnimation from "@/components/common/Fade";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    // return {
    //   isRouterAlive: true
    // };
  },
  components: {
    Guan,
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