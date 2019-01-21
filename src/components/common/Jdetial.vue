<template>
  <div class="wrap">
    <div class="flex">
      <div>交易单号：</div>
      <div>{{list[0]}}</div>
    </div>

    <div class="flex">
      <div>类型：</div>
      <div>支付</div>
    </div>

    <div class="flex">
      <div>支付方式：</div>
      <div>{{list[3]}}</div>
    </div>

    <div class="flex">
      <div>时间:</div>
      <div>{{list[1]}}</div>
    </div>

    <div class="flex">
      <div>余额:</div>
      <div>{{list[2]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: this.$route.query.dataObjo
    };
  },
  mounted() {},
  methods: {}
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
  overflow-y: auto;
  background-color: #f4f4f4;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 3.2%;
  background: #fff;
  margin-bottom 1px
}

.flex div {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>
