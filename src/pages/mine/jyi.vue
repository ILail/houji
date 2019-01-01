<template>
  <div class="active">
    <div>暂时无交易记录</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
}

.active div {
  font-size: 14px;
  position: absolute;
  top: 40%;
  left: 40%;
}
</style>


