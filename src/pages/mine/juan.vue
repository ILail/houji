<template>
  <div>
    <ly-tab v-model="selectedId" :items="items" :options="options"  @change="handleChange"></ly-tab>

    <!-- 下面内容 -->
    <div class="swiper-box">
      <div class="swiper-container wrapA">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item of list" :key="item.id">
            <keep-alive>
              <component :is="item.component"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import one from "@/pages/mine/myjuan/one";
import two from "@/pages/mine/myjuan/two";
import three from "@/pages/mine/myjuan/three";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
export default {
  name: "Myjob",
  components: {
    one,
    two,
    three
  },
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "未使用" },
        { label: "已使用" },
        { label: "已失效" },
        
      ],
      options: {
        activeColor: "#D21623"
        // 可在这里指定labelKey为你数据里文字对应的字段名
      },
       list: [
        { component: one },
        { component: two },
        { component: three }
      ],
      nowIndex: 0
    };
  },
    mounted() {
    setTimeout(
      function() {
        var mySwiperA = new Swiper(".wrapA", {
          autoHeight: true
        });
        mySwiperA.on("slideChange", () => {
          this.selectedId = mySwiperA.activeIndex;
          this.$root.eventHub.$emit("changeTab", mySwiperA.activeIndex);
        });
        this.$root.eventHub.$on("changeTab", index => {
          mySwiperA.slideTo(index, 0, false);
        });
      }.bind(this),
      1000
    );
  },
  methods: {
    handleChange(item, index) {
      this.nowIndex = index;
      this.$root.eventHub.$emit("changeTab", index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
