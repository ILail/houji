<template>
  <div>
    <div class="nav">
      <ul class="nav-list">
        <li
          class="item"
          v-for="(item,index) in navList"
          :key="item.id"
          :class="{'active': nowIndex===index}"
          @click="tabClick(index)"
        >
          <span class="word">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import VueRouter from "vue-router";
export default {
  data() {
    return {
      navList: [
        { name: "详情" },
        { name: "游记" },
        { name: "评论" },
        { name: "溯源" }
      ],
      nowIndex: 0
    };
  },
  created() {
    this.id = this.$route.query.key; //获取上个页面传递的id,在下面获取数据的时候先提交id
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化，保证刷新页面后内容区和导航键一致
      this.initPage();
    });
    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
    this.$root.eventHub.$on("slideTab", this.slideTab);
  },
  methods: {
    initPage() {
      this.id = this.$route.query.key;

      let a = "/detail?key=" + this.id;

      this.nowIndex =
        this.$route.path === a
          ? 0
          : this.$route.path === a
          ? 1
          : this.$route.path === a
          ? 2
          : this.$route.path === a
          ? 3
          : 0;
    },
    tabClick(index) {
      this.nowIndex = index;
      // 点击导航按钮时向swiper组件发射index
      this.$root.eventHub.$emit("changeTab", index);
      // 点击跳转到bar 跳转
    },

    slideTab(index) {
      this.nowIndex = index;
      let router = new VueRouter();
      let a = "/detail?key=" + this.id;
      let href =
        index === 0
          ? a
          : index === 1
          ? a
          : index === 2
          ? a
          : index === 3
          ? a
          : a;
      // 利用路由的push方法更新路径地址
      router.push(href);
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.nav {
  padding-bottom: 12px;
  padding-top: 10px;
  border-bottom: 1px solid #eeeeee;
}

.nav-list {
  width: 100%;
  display: flex;
  padding: 0;
  justify-content: space-around;
}

.word {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.active .word {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1.5px solid #d21623;
  padding-bottom: 9px;
}
</style>
