<template>
  <div id="app">
    <!-- <keep-alive> -->
    <fade-animation>
      <router-view  v-show="show"></router-view>
    </fade-animation>
    <!-- </keep-alive> -->
    <Guan v-if="$route.meta.oppendid"></Guan>
    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
import Guan from "@/components/Authorization";
import FadeAnimation from "@/components/common/Fade";
export default {
  name: "App",
  data() {
    return {
      show: false
    };
  },
  components: {
    Guan,
    FadeAnimation
  },
  mounted() {
    this.$toast({
      message: "加载中...",
      duration: "1200",
      type: "loading"
    });
    this.show = true;
  }
};
</script>

<style>
</style>