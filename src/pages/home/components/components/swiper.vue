<template>
  <div class="wrap">
    <mt-swipe :auto="3500" style="height:187.5px">
      <mt-swipe-item v-for="item of sowingMap" :key="item.id">
        <!-- <router-link
          :to="{  
        path: 'hdetial',     
        query: {   
            key: item.link, // orderNum : this.searchData.orderNo
        }
    }"
        >-->
        <img class="swiper-img" v-lazy="item.pic" :key="item.pic" @click="changes(item.link,item.jump_type)">
        <!-- </router-link> -->
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui";
import { crowd_funding } from "@/components/axios/api";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: "HomeSwiper",
  props: {
    sowingMap: Array
  },
  methods: {
    changes(id, jump_type) {
      switch (jump_type) {
        case 1:
          this.$router.push({
            path: "/Detail",
            query: {
              key: id
            }
          });
          break;
        case 2:
          this.$router.push({
            path: "/hdetial",
            query: {
              key: id
            }
          });
          break;
        case 3:
          //  h5页面
          break;
        case 4:
          //  每日新品页面
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.wrap >>> .mint-swipe-indicator {
  opacity: 1;
  background: #fff;
}

.wrap >>> .mint-swipe-indicator.is-active {
  background: #b21822;
}

.swiper-img {
  width: 100%;
  height: 100%;
}
</style>


