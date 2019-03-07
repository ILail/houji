<template>
  <div id="app">
    <!-- <keep-alive include="Small"> -->
    <router-view v-if="show"></router-view>
    <!-- </keep-alive> -->
    <Guan v-if="$route.meta.oppendid"></Guan>
    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
import Guan from "@/components/Authorization";
export default {
  name: "App",
  data() {
    return {
      show: false
    };
  },
  components: {
    Guan
  },
  mounted() {
    this.$toast({
      message: "加载中...",
      duration: "1200",
      type: "loading"
    });
    this.show = true
  }
};
</script>

<style>
</style>