<template>
  <div>
    <img :src="wxone" style="width:100%">
    <div class="header container" @click="address" v-if="show">
      <div>
        <div class="word">
          <span>{{letter.realname}}</span>
          <span style="margin-left:12px">{{letter.mobile}}</span>
        </div>
        <div class="wordea">{{letter.address_info}}{{letter.address}}</div>
      </div>
      <div>
        <img :src="wx">
      </div>
    </div>
    <div class="middle" v-if="shoiw" @click="addresssw">
      <div class="middlea">+</div>
      <div class="middleW">添加收货地址</div>
    </div>
    <div style="background:#eee;height:8px"></div>
  </div>
</template>

<script>
import { getDIZ } from "@/components/axios/api";
export default {
  name: "ConfirHeader",
  // props: {
  //   letter: Object
  // },
  data() {
    return {
      wx: require("@/assets/right_.png"),
      wxone: require("@/assets/mine/xu.png"),
      shoiw: false,
      show: true,
      letter: {}
    };
  },
  created() {
    getDIZ()
      .then(res => {
        this.letter = res.data.data;
        // console.log(this.letter);
        if (this.letter.length == 0) {
          this.show = false;
          this.shoiw = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    address() {
      this.$router.push({
        path: "/shouhuo",
        query: {
          dataObj: this.wishid
        }
      });
    },
    addresssw() {
      this.$router.push({
        path: "/tianjia"
      });
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.middle {
  text-align: center;
  padding: 8px 0 8px 0;
}

.middlea {
  color: #fff;
  background: #eeeeee;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  margin-left: 47%;
  margin-bottom: 8px;
}

.middleW {
  font-size: 14px;
  font-weight: 550;
  font-family: PingFangSC-Regular;
  color: rgba(2, 2, 2, 1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 20px 0;
}

.word span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wordea {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-top: 8px;
  line-height: 1.5;
}
</style>
