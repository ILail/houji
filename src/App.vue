<template>
  <div id="app">
    <router-view></router-view>
    <Guan></Guan>
    <div v-wechat-title="$route.name"></div>
  </div>
</template>

<script>
import Guan from "@/components/Authorization";
export default {
  name: "App",
  components: {
    Guan
  }
};
</script>

<style>
</style>