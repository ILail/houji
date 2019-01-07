<template>
  <div>
    <div class="bottom">
      <div class="money">
        合计金额:
        <span style="margin-left:8px;font-size:18px">¥{{moneyAll}}</span>
      </div>
      <div class="monn">立即下单</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirBottom",
  props: {
    moneyAll: Number
  },
  data() {
    return {
      wx: require("@/assets/right_.png"),
      wxone: require("@/assets/mine/xu.png")
    };
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.bottom {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 3.2%;
  height: 50px;
  background: #fff;
  border-top: 8px solid #eee;
  overflow: hidden;
}

.money {
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(210, 22, 35, 1);
}

.monn {
  background: rgba(210, 22, 35, 1);
  height: 50px;
  width: 115px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 15px;
}
</style>
