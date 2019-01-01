<template>
  <div class="active">
    <div style="background:#fff">
      <div class="wrap">
        <router-link to="yhkbd">
          <div class="wrapa">
            <div style="font-size:14px">银行卡</div>
            <input type="text" placeholder="绑定银行卡">
          </div>
        </router-link>
        <img :src="img" class="wrapImg">
      </div>
    </div>

    <div style="background:#fff;margin-top:10px">
      <div class="fnagshi">提现金额</div>
      <span class="sthf" style="  padding-left:2%">¥</span>
      <input type="text" class="sthf">
    </div>

    <div class="action">立即提现</div>
  </div>
</template>

<script>
export default {
  data() {
    return { img: require("@/assets/rr.png") };
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

.heard {
  text-align: center;
  overflow: hidden;
}

.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 2% 15px 2%;
}

.wrapa {
  width: 85%;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wrapa input {
  width: 90%;
  margin-top: 10px;
}

.wrapa input::-webkit-input-placeholder {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
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
  width: 96%;
  margin-left: 2%;
}

.wrapImg {
  width: 8px;
}

.wxIMG {
  width: 40px;
}

.zfbIMG {
  width: 18px;
}

.wx, .zfb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 2% 8px 2%;
}

.fnagshi {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-left: 2%;
  padding-top: 8px;
  padding-bottom: 13px;
}

.sthf {
  font-size: 24px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
}

.righta {
  margin-left: 10px;
}
</style>

