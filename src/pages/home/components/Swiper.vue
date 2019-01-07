<template>
  <yd-slider autoplay="3000" class="wrapper">
    <yd-slider-item v-for="item of list" :key="item.id">
      <router-link
        :to="{  
        path: 'Detail',     
        query: {   
            key: item.link, // orderNum : this.searchData.orderNo
        }
    }"
      >
        <img class="swiper-img" :src="item.pic" style="height:190px">
      </router-link>
    </yd-slider-item>
  </yd-slider>
  <!-- <div></div> -->
</template>

<script>
import Vue from "vue";
import { Slider, SliderItem } from "vue-ydui/dist/lib.rem/slider";
/* 使用px：import {Slider, SliderItem} from 'vue-ydui/dist/lib.px/slider'; */

Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
export default {
  name: "HomeSwiper",
  props: {
    list: Array
  }
};
</script>

<style lang="stylus" scoped>
.wrapper >>> .pagination-activecolor {
  background: pink;
}
</style>
