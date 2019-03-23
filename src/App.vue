<template>
  <div id="app">
    <!-- <keep-alive> -->
    <Grant></Grant>
    <fade-animation>
      <router-view ></router-view>
    </fade-animation>
    <!-- </keep-alive>  v-if="$route.meta.uio" v-if="isRouterAlive"-->

    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
import Grant from "@/components/Authorization";
import FadeAnimation from "@/components/common/Fade";

export default {
  name: "App",
  // provide () {
  //   return {
  //     reload: this.reload
  //   }
  // },
// data () {
//     return {
//       isRouterAlive: true
//     }
//   },
  components: {
    Grant,
    FadeAnimation
  },
  // methods: {
  //   reload() {
  //     this.isRouterAlive = false
  //     this.$nextTick(function(){
  //        this.isRouterAlive = true
  //     })
  //   }
  // },
    mounted() {
    this.$toast({
      type: "loading",
      message: "加载中...",
      duration: "1200"
    });
  },
};
</script>

<style>
</style>