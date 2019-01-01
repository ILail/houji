<template>
  <div class="active">
    <div style="background:#fff">
      <div class="wrap">
        <div class="wrapc">
          <span>银行名称</span>
          <input type="text" placeholder="选择银行">
        </div>
        <img :src="img" alt>
      </div>

      <div class="next">
        <span>开户行名称</span>
        <input type="text" placeholder="请输入开户行名称">
      </div>

      <div class="next">
        <span>银行卡卡号</span>
        <input type="text" placeholder="请输入卡号">
      </div>

      <div class="next">
        <span>持卡人姓名</span>
        <input type="text" placeholder="请输入姓名">
      </div>
    </div>

    <div class="action">确认</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: require("@/assets/rr.png")
    };
  }
};
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

.wrapc {
  display: flex;
  align-items: center;
}

.wrapc span {
  margin-right: 5px;
  margin-top: 2px;
}

.heard {
  text-align: center;
  overflow: hidden;
}

.heardone {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 50px;
}

.heardtwo {
  font-size: 24px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 10px;
}

.next {
  padding: 12px 3% 12px 3%;
  border-bottom: 1px solid #eee;
}

.next span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 3% 12px 3%;
  border-bottom: 1px solid #eee;
}

.wrap span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wrap img {
  width: 10px;
}

.action {
  text-align: center;
  line-height: 50px;
  height: 50px;
  background: rgba(210, 22, 35, 1);
  border-radius: 5px;
  font-size: 15px;
  color: #fff;
  margin-top: 30px;
  width: 94%;
  margin-left: 3%;
}
</style>

