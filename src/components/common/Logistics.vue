<template>
  <div class="wrap">
    <!-- 物流 -->
    <div class="word" v-show="show">没有物流信息</div>
    <order-you></order-you>
  </div>
</template>

<script>
import OrderYou from "./components/You";
import { MessageWu } from "@/components/axios/api";

export default {
  name: "Wuliudetails",
  components: {
    OrderYou
  },
  data() {
    return {
      orderdetails: this.$route.query.dataObjo,
      show: false
    };
  },
  created() {
    MessageWu(this.orderdetails)
      .then(res => {
        if (res.data.status == "0") {
          this.show = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;
  background-color: #f4f4f4;
}

.word {
  background: #fff;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
