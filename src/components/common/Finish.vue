<template>
  <div class="wrap">
    <img src="@/assets/xu.png" alt>
    <div class="one">您的订单已交易完成</div>
    <div class="two">我们会在预售成功后15个工作日内为您发货</div>
    <div class="two">客服联系电话：4000-060401</div>
    <div class="four">
      <span @click="returnf">返回首页</span>
      <span @click="returnOrder">查看订单</span>
    </div>
  </div>
</template>

<script>
import { Member } from "@/components/axios/api";
export default {
  name: "Finish",

  data() {
    return {};
  },
  mounted() {},
  methods: {
    returnf() {
      this.$router.push("/");
    },
    returnOrder() {
      this.$router.push("/myorders?key=0");
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.wrap {
  text-align: center;
  margin-top: 20%;
}

.one {
  font-size: 18px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  margin-top: 30px;
}

.two {
  font-size: 14px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  margin-top: 10px;
}

.four {
  margin-top: 30px;
}

.four span {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(210, 22, 35, 1);
  border-radius: 2px;
  padding: 2px 8px;
}
</style>
