<template>
  <div>
    <ly-tab v-model="selectedId" :items="items" :options="options" @change="handleChange"></ly-tab>

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

<script type="text/ecmascript-6">
import { addresslist } from "@/components/axios/api";
// import VueRouter from "vue-router";
import one from "@/pages/home/address/one";
import two from "@/pages/home/address/two";
import three from "@/pages/home/address/three";
import four from "@/pages/home/address/four";
import five from "@/pages/home/address/five";
import six from "@/pages/home/address/six";
import seven from "@/pages/home/address/seven";
import eight from "@/pages/home/address/eight";
import nine from "@/pages/home/address/nine";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
export default {
  name: "Addressdetail",
  components: {
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine
  },
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "四川" },
        { label: "江苏" },
        { label: "天津" },
        { label: "海南" },
        { label: "浙江" },
        { label: "云南" },
        { label: "广州" },
        { label: "上海" },
        { label: "北京" }
      ],
      options: {
        activeColor: "#D21623"
        // 可在这里指定labelKey为你数据里文字对应的字段名
      },
      list: [
        { component: one },
        { component: two },
        { component: three },
        { component: four },
        { component: five },
        { component: six },
        { component: seven },
        { component: eight },
        { component: nine }
      ],
      nowIndex: 0
    };
  },
  created() {
    this.id = this.$route.query.key;
    addresslist(this.id)
      .then(res => {
        res = res.data;
        let lenghth = res.data.geographical_list.length;
        console.log(res.data.geographical_list);
        this.selectedId = lenghth - this.id;

        if (this.selectedId >= lenghth) {
          this.selectedId = 0;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    // 首页图片 设置定时器加载 不然swiper 会有bug (图片的吭) bind 解决this 指向
    setTimeout(
      function() {
        var mySwiperA = new Swiper(".wrapA", {
          // 页面高度自适应
          autoHeight: true
          // initialSlide: this.$route.path === "/addressdetail" ? 0 : 0
        });
        this.id = this.$route.query.key;
        let num = this.items.length - this.id;

        if (num >= this.items.length) {
          num = 0;
        }
        mySwiperA.slideTo(num, 0, false);
        // 页面的跳转
        mySwiperA.on("slideChange", () => {
          this.selectedId = mySwiperA.activeIndex;
          //  this.$route.query.key = mySwiperA.activeIndex;
          this.$root.eventHub.$emit("changeTab", mySwiperA.activeIndex);
        });
        // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
        this.$root.eventHub.$on("changeTab", index => {
          mySwiperA.slideTo(index, 0, false);
          // mySwiperA.slideTo(num, 0, false);
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

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
</style>
