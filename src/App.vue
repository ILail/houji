<template>
  <div id="app">
    <router-view></router-view>
    <div v-wechat-title="$route.name"></div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
</style>
