<template>
  <div id="app">
    <router-view></router-view>
    <Guan  v-if="$route.meta.oppendid"></Guan>
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