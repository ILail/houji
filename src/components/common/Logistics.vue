<template>
  <div class="wrap" ref="wrappers">
    <!-- 物流 -->
    <div class="word" v-show="show">没有物流信息</div>
    <div v-show="!show">
      <div style="background:#fff">
        <div class="hospital container">
          <span class="left">物流公司：</span>
          <span class="inputl" style="margin-left:10px">{{ShipperCode}}</span>
        </div>
        <div class="flex">
          <div class="left">物流单号：</div>
          <input
            type="text"
            id="success_form_input"
            readonly="readonly"
            v-model="LogisticCode"
            class="inputl"
          >
          <button
            ref="copy"
            data-clipboard-action="copy"
            data-clipboard-target="#success_form_input"
            @click="copyLink"
            class="copys"
          >复制</button>
        </div>
      </div>
      <div class="line"></div>
      <van-steps direction="vertical" :active="0" active-color="#D21623">
        <van-step v-for="(item,index) in list" :key="item.id" :id="index">
          <h3>{{item.AcceptStation}}</h3>
          <p>{{item.AcceptTime}}</p>
        </van-step>
        <!-- <van-step>
        <h3>【城市】物流状态2</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>快件已发货</h3>
        <p>2016-07-10 09:30</p>
        </van-step>-->
      </van-steps>
    </div>
    <order-you></order-you>
  </div>
</template>

<script>
import Vue from "vue";
import { Step, Steps } from "vant";
Vue.use(Step).use(Steps);
import OrderYou from "./components/You";
import { MessageWu } from "@/components/axios/api";

export default {
  name: "Wuliudetails",
  components: {
    OrderYou
  },
  data() {
    return {
      orderdetails: this.$route.query.dataObjo,
      show: true,
      ShipperCode: "",
      LogisticCode: ""
    };
  },
  created() {
    MessageWu(this.orderdetails)
      .then(res => {
        this.LogisticCode = res.data.data.LogisticCode;
        this.ShipperCode = res.data.data.ShipperCode;
        this.list = res.data.data.Traces;
        if (res.data.status == "0") {
          this.show = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    setTimeout(() => {
      this.$refs.wrappers.style.visibility = "visible";
    }, 800);
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
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;
  background-color: #f4f4f4;
}

.word {
  background: #fff;
  text-align: center;
  height: 50px;
  line-height: 50px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 3.2%;
}

.left {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.inputl {
  width: 68%;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.copys {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  border: 1px solid rgba(102, 102, 102, 1);
  padding: 2px 5px;
}

.line {
  height: 1px;
  background: rgba(204, 204, 204, 1);
}

.hospital {
  padding-top: 10px;
}
</style>
