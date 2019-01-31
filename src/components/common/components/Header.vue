<template>
  <div class="wraap">
    <div class="flex">
      <div class="left">订单编号</div>

      <!-- <span class="right" style="margin-right:5px">{{list[0]}}</span>

      <span class="copys" @click="copyUrl">复制</span>-->
      <input type="text" id="success_form_input" readonly="readonly" v-model="copys" class="inputl">
      
      <button
        ref="copy"
        data-clipboard-action="copy"
        data-clipboard-target="#success_form_input"
        @click="copyLink"
        class="copys"
      >复制</button>
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
      message: "",
      copys: ""
    };
  },
  created() {
    let num = this.lists[3];
    this.copys = this.lists[0];
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
  mounted() {
    this.copyBtn = new this.clipboard(this.$refs.copy);
  },
  methods: {
    copyLink() {
      /*这是点击按钮触发的点击事件，关于clipboard的使用就不再赘述了，上面介绍时已经讲述过，并且使用方法在官方文档上有*/
      let _this = this;
      let clipboard = _this.copyBtn;
      clipboard.on("success", function() {
        _this.$toast({
          message: "复制成功！",
          duration: "1500"
        });
      });
      // clipboard.on('error', function() {
      //     _this.$message({
      //         message: '复制失败，请手动选择复制！',
      //         type: 'error'
      //     });
      // });
    }
    // 移动端不是input或者button，则复制不成功，下列方法作废
    // copyUrl() {
    //   const input = document.createElement("input");
    //   const number = this.lists[0];
    //   document.body.appendChild(input);
    //   input.setAttribute("value", number);
    //   input.select();
    //   if (document.execCommand("copy")) {
    //     this.$toast("长按复制单号");
    //     document.execCommand("copy");
    //   }
    //   document.body.removeChild(input);
    // }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.inputl {
  width: 70%;
  text-align center
}

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
