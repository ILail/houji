<template>
  <div>
    <div class="middle container">
      <div class="same">
        <div>
          优惠卷：
          <span class="same_">暂无可用</span>
        </div>
        <div>
          <span style="margin-right:10px" class="same_">0张</span>
          <img :src="wx" style="vertical-align: bottom;">
        </div>
      </div>
      <div class="same houji">
        <div>
          猴集卡：
          <span class="same_">享受95折优惠</span>
        </div>
        <div>
          <img :src="wx" style="vertical-align: bottom;">
        </div>
      </div>
      <div class="same zhic">
        <span>支持金额</span>
        <span>¥{{moneyAll}}</span>
      </div>
      <div class="same">
        <span>活动优惠</span>
        <span>-¥0.00</span>
      </div>
      <div class="same zhic" style="border-bottom:1px solid #eee">
        <span>配送费用</span>
        <span>¥0.00</span>
      </div>
      <div class="people zhic">
        <span>买家留言：</span>
        <input type="text" placeholder="您可以在此给卖家留言">
      </div>
    </div>
    <div style="background:#eee;height:8px"></div>
  </div>
</template>

<script>
export default {
  name: "ConfirMiddle",
  props: {
    moneyAll: Number
  },
  data() {
    return {
      wx: require("@/assets/right_.png")
    };
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.middle {
  padding: 20px 0 0 0;
}

.same {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.same_ {
  color: #999;
}

.people {
  font-size: 14px;
}

.people input::-webkit-input-placeholder {
  color: #999;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.houji {
  padding: 10px 0 10px 0;
  border-bottom: 1px solid #eee;
}

.zhic {
  padding: 10px 0 10px 0;
}
</style>
