<template>
  <div class="hitImg">
    <img src="@/assets/woring.png">
    <div class="contenr">暂时无数据，静请期待！</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.hitImg {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.hitImg img {
  width: 50%;
  margin-top: 40%;
}

.hitImg .contenr {
  margin-top: 5px;
  color: #999;
}
</style>
