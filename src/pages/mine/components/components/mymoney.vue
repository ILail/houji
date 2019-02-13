<template>
  <div class="active">
    <div :style="note" class="heard">
      <div class="heardone">账户余额</div>
      <div class="heardtwo">
        <ICountUp
          :startVal="startVal"
          :endVal="endVal"
          :decimals="decimals"
          :duration="duration"
          :options="options"
        />
      </div>
    </div>

    <div style="background:#fff">
      <router-link to="chongzhi">
        <div class="wrap">
          <span>充值</span>
          <img :src="img" alt>
        </div>
      </router-link>
      <router-link to="tixian">
        <div class="wrap">
          <span>提现</span>
          <img :src="img" alt>
        </div>
      </router-link>
      <router-link to="jiaoyi">
        <div class="wrap">
          <span>交易记录</span>
          <img :src="img" alt>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import ICountUp from "vue-countup-v2";
import secret from "@/utils/utils";
import { people } from "@/components/axios/api";
export default {
  components: {
    ICountUp
  },
  data() {
    return {
      startVal: 0,
      endVal: "",
      decimals: 2,
      duration: 2.5,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "¥",
        suffix: ""
      },
      note: {
        backgroundImage: "url(" + require("@/assets/banner.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: "150px"
      },
      img: require("@/assets/rr.png"),
      money: ""
    };
  },
  created() {
    people()
      .then(res => {
        let num = secret.Decrypt(res.data.data);
        let letter = JSON.parse(num);
        this.endVal = letter.left_money;
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
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

.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 3% 15px 3%;
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
</style>

