<template>
  <div>
    <div class="heard" :style="note" @click="fit">
      <!-- 微信头像 -->
      <img :src="letter.headimgurl" id="weix" v-if="shows">
      <!-- 微信头像 -->
      <img src="@/assets/abs.png" class="weix" v-if="show">
      <div class="middle">
        <div class="Mress">
          <div style="font-size:18px">{{letter.username}}</div>
          <img src="@/assets/linjuan/8.png" alt class="headimg" v-if="showimg">
        </div>
        <div style="font-size:12px;margin-top:12px">{{letter.self_introduction}}</div>
      </div>
      <!-- <div class="card">
      <img :src="banner" style="width:32px">
      <div style="margin:5px;">
        <div style="font-size:13px">农归卡</div>
        <div style="margin-top:5px;">
          立即使用
          <span style="margin-left:2px">
            <img :src="wx" style="width:10px;">
          </span>
        </div>
      </div>
      </div>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import * as types from "@/components/vuex/types";
// import store from "@/components/vuex/store";
import secret from "@/utils/utils";
import { people } from "@/components/axios/api";
export default {
  name: "MineHeader",
  //   props: {
  //     letter: ""
  //   },
  data() {
    return {
      // isActive: false,
      shows: true,
      show: false,
      // wx: require("@/assets/rr.png"),
      // banner: require("@/assets/liwu.png"),
      note: {
        backgroundImage: "url(" + require("@/assets/banner.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      letter: "",
      showimg: true
    };
  },
  //   beforeCreate(){
  //   if (this.$store.state.token == "") {
  //     window.localStorage.clear();
  //   }
  // },
  created() {
    people()
      .then(res => {
        const num = secret.Decrypt(res.data.data);

        this.letter = JSON.parse(num);
        if (this.letter.headimgurl == "") {
          this.shows = false;
          this.show = true;
        }
      })
      .catch(err => {
        // 清楚token 重新授权
        this.$router.push("/phone");
        console.log(err, "请求失败");
      });
  },
  // updated() {
  //   console.log(1234);
  // },
  methods: {
    fit() {
      this.$router.push("/personone");
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.headimg {
  width: 16px;
  margin-left: 4px;
}

.active {
  -ms-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
}

.Mress {
  display: flex;
  align-items: flex-start;
}

.heard {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 3.8%;

  .middle {
    flex: 1;
    color: #fff;
    margin-left: 3.6%;
  }

  .weix {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  #weix {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .card {
    width: 115px;
    height: 42px;
    background: rgba(175, 12, 24, 1);
    border-radius: 1.5rem 0 0 1.5rem;
    display: flex;
    align-items: center;
    padding-left: 2%;
    color: #EECC91;
    text-align: center;
  }
}

.msg {
  color: #333;
  text-align: center;
  font-size: 24px;
  min-width: 40px;
  line-height: 40px;
}

.encrypt-btn {
  display: block;
  margin: 15px auto;
  font-size: 14px;
  padding: 10px 15px;
  text-align: center;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  background-color: #409eff;
  -webkit-appearance: none;
  border-radius: 4px;
  -webkit-user-select: none;
  min-width: 100px;
}

.example-box {
  margin: 100px auto 0;
}

.example-box .title {
  font-size: 24px;
  color: #333;
  text-align: center;
  font-weight: bold;
}
</style>


