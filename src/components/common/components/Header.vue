<template>
  <div class="wraap">
    <div class="flex">
      <div class="left">订单编号</div>
      <div>
        <span class="right" style="margin-right:5px">{{list[0]}}</span>
        <span class="copys" @click="copyUrl">复制</span>
      </div>
    </div>

    <div class="flex">
      <div class="left">下单时间</div>
      <div class="right">{{list[1]}}</div>
    </div>
    <div class="line"></div>
    <div class="flex">
      <div class="left">支付方式</div>
      <div class="right">{{message}}</div>
    </div>

    <div class="flex">
      <div class="left">支付金额</div>
      <div class="right">¥{{list[2]}}</div>
    </div>

    <div class="flex">
      <div class="left">优惠金额</div>
      <div class="right">-¥{{list[4]}}</div>
    </div>

    <div class="flex">
      <div class="left">运费</div>
      <div class="right">¥0.00</div>
    </div>
    <div class="line"></div>
    <div class="flex">
      <div class="middle">实付金额</div>
      <div class="middle">¥{{list[5]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderHeader",
  props: {
    list: Array
  },
  data() {
    return {
      lists: this.list,
      message: ""
    };
  },
  created() {
    let num = this.lists[3];

    switch (num) {
      case 1:
        this.message = "余额";
        break;
      case 2:
        this.message = "微信";
        break;
      case 3:
        this.message = "支付宝";
        break;
    }
  },
  methods: {
    copyUrl() {
      const input = document.createElement("input");
      const number = this.lists[0];
      document.body.appendChild(input);
      input.setAttribute("value", number);
      input.select();
      if (document.execCommand("copy")) {
         this.$toast("复制成功");
        document.execCommand("copy");
      }
      document.body.removeChild(input);
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 3.2%;
}

.wraap {
  margin-top: 12px;
  background: #fff;
  padding: 4px 0;
}

.line {
  width: 100%;
  height: 1px;
  background: rgba(238, 238, 238, 1);
  margin: 4px 0;
}

.left {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.right {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.middle {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(210, 22, 35, 1);
}

.copys {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  border: 1px solid rgba(102, 102, 102, 1);
  padding: 2px 5px;
}
</style>
