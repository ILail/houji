<template>
  <div>
    <div class="heard" :style="note" @click="fit">
      <!-- 微信头像 -->
      <img :src="letter.headimgurl" alt class="weix">

      <div class="middle">
        <div style="font-size:18px">{{letter.username}}</div>
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
import secret from "@/utils/utils";
import { people } from "@/components/axios/api";
export default {
  name: "MineHeader",
  //   props: {
  //     letter: ""
  //   },
  data() {
    return {
      wx: require("@/assets/right.png"),
      banner: require("@/assets/liwu.png"),
      note: {
        backgroundImage: "url(" + require("@/assets/banner.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      letter: ""
    };
  },
  created() {
    people()
      .then(res => {
        
        const num = secret.Decrypt(res.data.data);

        this.letter = JSON.parse(num);
        console.log(this.letter);
      })
      .catch(err => {
        console.log(err, "请求失败");     
      });
  },
  methods: {
    fit() {
      this.$router.push("/personone");
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
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


