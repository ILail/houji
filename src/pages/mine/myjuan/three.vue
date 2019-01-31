<template>
  <div class="one">
    <div class="hitImg" v-show="ispic">
      <img src="@/assets/linjuan/5.png">
      <div class="contenr">保持不错，没有错过优惠卷！</div>
    </div>
    <div class="smae">
      <div class="wrap container" v-for="item in list" :key="item.id" :style="noteone">
        <div class="wrapCenter">
          <div class="numsN">
            <span class="nums">¥</span>
            <span class="num">{{item.amount_limit}}</span>
          </div>
          <div class="wrapMiddle">
            <span class="middles">{{item.title}}</span>
            <span class="datas">{{item.start_time | formatDate}}-{{item.end_time | formatDate}}</span>
          </div>
          <div class="nows" @click="prices()">去使用</div>
        </div>
        <div class="content">全场产品可以使用；限时活动通用优惠卷可以叠加使用</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { coupon } from "@/components/axios/api";
export default {
  filters: {
    formatDate: function(value) {
      value *= 1000;
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + MM + "-" + d;
    }
  },
  data() {
    return {
      noteone: {
        backgroundImage: "url(" + require("@/assets/linjuan/3.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: 125 + "px",
        overflow: "hidden"
      },
      ispic: false,
      list: [],
      num: ""
    };
  },
  created() {
    coupon(113)
      .then(res => {
        // console.log(res.data.data.data);
        this.list = res.data.data.data;
        this.num = res.data.data.total;
        if (this.num == 0) {
          this.ispic = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    hitImg() {
      this.$router.push("/wishs");
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.hitImg {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.hitImg img {
  width: 50%;
  margin-top: 20%;
}

.hitImg .contenr {
  margin-top: 15px;
  color: #999;
}

.numsN {
  display: flex;
  align-items: center;
}

.datas {
  font-size: 12px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 10px;
}

.nums {
  font-size: 18px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.num {
  font-size: 36px;
  font-family: SanFranciscoDisplay-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}

.nows {
  padding: 5px 10px;
  border: 2px solid #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  border-radius: 5px;
}

.numl {
  font-size: 18px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.middles {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.content {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 15px;
  left: 7.2%;
}

.wrapCenter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4.4%;
  margin-top: 25px;
}

.wrapMiddle {
  flex-direction: column;
  display: flex;
  align-items: center;
}

.smae {
  padding-bottom: 20px;
}

.wrap {
  margin-top: 20px;
}

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

.peosn {
  margin-top: -2px;
}

.people input::-webkit-input-placeholder {
  color: #999;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.houji {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.zhic {
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 15px 0;
}
</style>
