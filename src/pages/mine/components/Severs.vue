<template>
  <div>
    <div class="title" border-topbottom>
      <div style="font-size:14px">我的服务</div>
    </div>
    <div class="content" style="border-bottom: 1px solid #eee">
      <router-link to="/moneyall">
        <div class="contentWord">
          <span>
            <img :src="five" style="width:24px">
          </span>
          <span class="word">我的钱包</span>
        </div>
      </router-link>
      <router-link to="/juan">
        <div class="contentWord">
          <span>
            <img :src="six" style="width:20px">
          </span>
          <span class="word">优惠卷</span>
        </div>
      </router-link>
      <router-link to="/liping">
        <div class="contentWord">
          <span>
            <img :src="seven" style="width:29px">
          </span>
          <span class="word">礼品卡</span>
        </div>
      </router-link>
      <router-link to="/shouhuo">
        <div class="contentWord">
          <span>
            <img :src="eight" style="width:21px">
          </span>
          <span class="word">收货地址</span>
        </div>
      </router-link>
    </div>

    <div class="contents">
      <!-- <router-link to="/smoke"> -->
      <div
        class="contentWord"
        @click="See('https://api.ngba.cn/api/v2p2/article/details?article_type=quan_yi&uid=' + value + '')"
      >
        <span>
          <img :src="nine" style="width:29px">
        </span>
        <span class="word">猴集卡</span>
      </div>
      <!-- </router-link> -->
      <router-link to="/myjob">
        <div class="contentWord">
          <span>
            <img :src="ten" style="width:20px">
          </span>
          <span class="word">我的项目</span>
        </div>
      </router-link>
      <div class="contentWord" v-on:click="phoneCall('4000 060401')" style="margin-right: 5%;">
        <span>
          <img :src="tweve" style="width:20px">
        </span>
        <span class="word">客服</span>
      </div>
      <router-link to="/fit">
        <div class="contentWord">
          <span>
            <img :src="third" style="width:21px">
          </span>
          <span class="word">设置</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import secret from "@/utils/utils";
import { people } from "@/components/axios/api";
export default {
  data() {
    return {
      value: "",
      five: require("@/assets/list/5.png"),
      six: require("@/assets/list/6.png"),
      seven: require("@/assets/list/7.png"),
      eight: require("@/assets/list/8.png"),
      nine: require("@/assets/list/9.png"),
      ten: require("@/assets/list/10.png"),
      tweve: require("@/assets/list/11.png"),
      third: require("@/assets/list/12.png")
    };
  },
  created() {
    people()
      .then(res => {
        const num = secret.Decrypt(res.data.data);
        const letter = JSON.parse(num);
        this.value = letter.user_id;
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    phoneCall: function(msg) {
      //   点击div弹出打电话
      window.location.href = "tel://" + msg;
    },
    See(e) {
      console.log(e);
      window.location.href = e;
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3.6% 0 3.6%;
  height: 50px;
  border-bottom: 1px solid #eee;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7% 0 5.2%;

  .contentWord {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 15px 0 15px 0;

    .word {
      margin-top: 8px;
      font-size: 12px;
    }
  }
}

.contents {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10% 0 6.5%;

  .contentWord {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 15px 0 15px 0;

    .word {
      margin-top: 8px;
      font-size: 12px;
    }
  }
}
</style>


