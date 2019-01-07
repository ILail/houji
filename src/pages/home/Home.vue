<template>
  <div>
    <!-- <home-swiper :list="sowingMap"></home-swiper> -->
    <!-- <div style="background:#eee;height:10px"></div> -->
    <img :src="adInfo.ad_img" class="tImg" @click="imgJ"/>
    <home-people :larity="popuLarity"></home-people>
    <div style="background:#eee;height:10px"></div>
    <home-new :product="dayProduct"></home-new>
    <div style="background:#eee;height:10px"></div>
    <home-like></home-like>
  </div>
</template>

<script>
import Vue from "vue";
import HomePeople from "./components/People";
import HomeNew from "./components/New";
import HomeLike from "./components/Like";
import HomeSwiper from "./components/Swiper";
import { lookOption } from "@/components/axios/api";
export default {
  name: "Home",
  components: {
    HomePeople,
    HomeNew,
    HomeLike,
    // HomeSwiper
  },
  data() {
    return {
      selected: "",
      // sowingMap: [],
      popuLarity: [],
      dayProduct: [],
      adInfo:""
    };
  },
  created:function() {
    lookOption()
      .then(res => {
        // console.log(res.data);
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;
          this.adInfo = data.adInfo
          this.popuLarity = data.popularity;
          this.dayProduct = data.dayProduct;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods:{
    imgJ(){
      this.$router.push({ path:'/linjuan'})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.tImg{
  width 100%
  margin-top 10px
}
</style>
