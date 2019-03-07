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
        <img class="swiper-img" v-lazy="item.pic" @click="changes(item.link)">
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
    changes(id) {
      crowd_funding(id)
        .then(res => {
          res = res.data;
          // console.log(res)
          if (res.data.class_name == "活动专区") {
            this.$router.push({
              path: "/hdetial",
              query: {
                key: id
              }
            });
          } else {
            this.$router.push({
              path: "/Detail",
              query: {
                key: id
              }
            });
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
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


