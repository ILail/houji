<template>
  <div>
    <div class="num">16:00-18:00</div>
    <div class="wrap">
      <div class="line"></div>
      <div class="word">限时限量 先到先得</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.num {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(242, 143, 24, 1);
  text-align: center;
  margin 20px 0
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.line {
  width: 85px;
  height: 1px;
  background: rgba(204, 204, 204, 1);
}

.word {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin 0 5%
}
</style>
