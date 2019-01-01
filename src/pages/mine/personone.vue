<template>
  <div class="active">
    <div class="smal">
      <ul>
        <li class="line">
          <span class="word">头像</span>
        </li>
        <li class="line">
          <span class="word">昵称</span>
          <span class="imgsa">大苏打撒旦撒旦</span>
        </li>
        <li class="linea">
          <span class="word">个人简介</span>
          <textarea maxlength="200" @input="descInput" v-model="desc" class="wordAll"/>
          <div class="num">{{remnant}}</div>
        </li>
      </ul>
    </div>
    <div class="warpall">
      <div class="enterH" @click="enenneen">保存</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Fit",
  data() {
    return {
      remnant: 118,
      desc: ""
    };
  },
  methods: {
    descInput() {
      var txtVal = this.desc.length;
      this.remnant = 118 - txtVal;
    },
    enenneen() {}
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wordAll {
  width: 100%;
  height: 50px;
  display: block;
  margin-top: 10px;
}

.num {
  color: #999;
  font-size: 13px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  text-align: right;
}

.linea {
  padding: 10px 2% 10px 2%;
}

.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
}

.imgsa img {
  width: 25%;
}

.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px 2% 10px 2%;
}

.word {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  color: #333333;
}

.enterH {
  width 96%
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: #fff;
  margin-top: 20px;
  font-size: 14px;
  background: #D21623;
  color: #fff;
  border-radius: 5px;
  margin-left 2% 
}

.warpall {
  background: #F4F4F4;
  hieght: 500px;
}

.smal {
  background: #ffffff;
}

.SAME {
  margin-right: 15px;
  height: 30px;
}
</style>
