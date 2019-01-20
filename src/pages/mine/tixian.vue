<template>
  <div class="active">
    <div style="background:#fff">
      <router-link to="yhkbd">
        <div class="wrap">
          <div class="wrapa">
            <div style="font-size:14px">银行卡</div>
            <input type="text" v-model="masg">
          </div>

          <img :src="img" class="wrapImg">
        </div>
      </router-link>
    </div>

    <div style="background:#fff;margin-top:10px">
      <div class="fnagshi">提现金额</div>
      <div class="midddds">
        <span class="sthf" style="  padding-left:2%">¥</span>
        <input type="tel" class="sthf" v-model="money">
      </div>
    </div>

    <div class="action" @click="enter">立即提现</div>
  </div>
</template>

<script>
import { moreBank } from "@/components/axios/api";
export default {
  data() {
    return { img: require("@/assets/rr.png"), masg: "", money: "" };
  },
  created() {
    const arr = this.$route.query.dataObjo;
    const arrs = this.$route.query.dataObjb;
    // arr+'(arrs)'
    if (arr == undefined && arrs == undefined) {
      this.masg = "绑定银行卡";
    } else {
      this.masg = arr + "(" + arrs + ")";
    }
  },
  methods: {
    enter() {
      // console.log(this.masg);
      if (this.masg == "绑定银行卡" || this.money == "") {
        this.$toast({
          message: "请正确输入",
          duration: "2000"
        });
        return false;
      }
      moreBank(this.masg, this.money)
        .then(res => {
          console.log(res.data.status);
          if ((res.data.status = "-1008")) {
            this.$toast({
              message: "提现失败",
              duration: "1500"
            });
          } else {
            this.$toast({
              message: "提现成功",
              duration: "1500"
            });
          }
          // this.$toast({
          //   message: "提现",
          //   duration: "2000"
          // });
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
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

.midddds {
  display: flex;
  align-items: center;
  padding-bottom: 5px;
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

