<template>
  <div style="display:none">
    <div>正在更新ing</div>
    <div class="monopoly">
      <span
        v-for="(item,index) in titele"
        :key="item.id"
        :class="{active:index == num}"
        @click="wordActive(index)"
      >{{item.label}}</span>
      <!-- <div class="line"></div> -->
    </div>
    <div class="lines"></div>
    <div class="titles">
      <span>用户</span>
      <span>数量</span>
      <span>单价</span>
      <span style="background:#fff"></span>
    </div>
    <div class="overs">
      <div class="titles" v-for="(item) in list" :key="item.id">
        <span>{{item.username}}</span>
        <span>{{item.nums}}</span>
        <span>¥{{item.price}}</span>
        <!-- <span>城南华阿姨</span>
      <span>18</span>
        <span>¥368</span>-->
        <span v-if="sale" @click="saleM(item.trade_id,item.nums,item.price)">卖出</span>
        <span v-else @click="saleMs(item.trade_id,item.nums,item.price)">买入</span>
      </div>
    </div>
  </div>
</template>
<script >
import { tradeList } from "@/components/axios/api";
export default {
  data() {
    return {
      list: [],
      show: false,
      sale: true,
      titele: [{ label: "转让" }, { label: "求购" }],
      id: this.$route.query.key,
      // 转让
      type: 1,
      num: 0,
      img_path: ""
    };
  },
  methods: {
    wordActive(index) {
      this.num = index;
      switch (index) {
        case 0:
          this.type = 1;
          this.types();
          this.sale = true;
          this.$bus.$emit("type", this.type);
          break;
        case 1:
          this.type = 2;
          this.types();
          this.sale = false;
          this.$bus.$emit("type", this.type);
          break;
      }
    },
    types() {
      tradeList(this.id, this.type)
        .then(res => {
          res = res.data;
          if (res.status && res.data) {
            this.list = res.data.list.data;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    saleM(trade_id, nums, price) {
      this.$bus.$emit("msgaa", this.show, trade_id, nums, price);
    },
    saleMs(trade_id, nums, price) {
      this.$bus.$emit("msgas", this.show, trade_id, nums, price);
    }
  },
  created() {
    this.types();
  }
};
</script>
<style lang="stylus" scoped>
.top {
  margin-top: 43px;
}

.monopoly {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}

.titles {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  height: 45px;
  border-bottom: 1px solid #CCC;
}

.overs {
  width: 100%;
  height: 230px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  /* ios 自带滚动条不平滑解决方法 */
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.titles span {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 25%;
}

.line {
  width: 1px;
  height: 50px;
  background: #CCC;
}

.lines {
  width: 100%;
  height: 1px;
  background: #CCC;
}

.monopoly span {
  font-size: 18px;
  font-family: PingFangSC-Regular;
  color: #333;
  width: 50%;
  padding: 15px 0;
}

.monopoly span:nth-child(1) {
  border-right: 1px solid #ccc;
}

.titles span:nth-child(4) {
  font-size: 13px;
  background: #D21623;
  height: 45px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #fff;
  line-height: 45px;
}

.monopoly .active {
  color: #D21623;
}
</style>


