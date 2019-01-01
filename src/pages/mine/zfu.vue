<template>
  <div class="active">
    <div class="smal">
      <div class="cont">
        <span class="word">交易密码</span>
        <input type="text" placeholder="输入支付密码" style="width:60%;margin-left:20px">
      </div>
      <div class="cont">
        <span class="word">再次输入</span>
        <input type="text" placeholder="再次输入密码" style="width:60%;margin-left:20px">
      </div>
    </div>
    <div class="baocun">保存</div>
  </div>
</template>
<script>
export default {
  name: "Desgreo",
  data() {
    return {
      img: require("@/assets/rr.png")
    };
  },
  methods: {}
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

.word {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  color: #333333;
  margin-top 2px
}

.smal {
  background: #ffffff;
}

.cont {
  display flex
  align-items center
  padding: 10px 2% 10px 2%;
  heigth 50px;
  line-height 50px
  border-bottom 1px solid #eee
}

.baocun {
  height: 50px;
  background: rgba(210, 22, 35, 1);
  border-radius: 5px;
  font-size 16px
  color #ffffff
  line-height 50px
  text-align center
  width 96%
  margin-left 2%
  margin-top 20px
}
</style>
