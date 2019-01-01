<template>
  <div>
    <div class="title" border-topbottom>
      <div style="font-size:14px">我的服务</div>
    </div>
    <div class="content" style="border-bottom: 1px solid #eee">
      <router-link to="/moneyall">
        <div class="contentWord">
          <span>
            <img :src="five">
          </span>
          <span class="word">我的钱包</span>
        </div>
      </router-link>
      <router-link to="/juan">
        <div class="contentWord">
          <span>
            <img :src="six">
          </span>
          <span class="word">优惠卷</span>
        </div>
      </router-link>
      <router-link to="/liping">
        <div class="contentWord">
          <span>
            <img :src="seven">
          </span>
          <span class="word">礼品卡</span>
        </div>
      </router-link>
      <router-link to="/shouhuo">
        <div class="contentWord">
          <span>
            <img :src="eight">
          </span>
          <span class="word">收货地址</span>
        </div>
      </router-link>
    </div>

    <div class="content">
      <router-link to="/smoke">
        <div class="contentWord" style="margin-left: .1rem;">
          <span>
            <img :src="nine">
          </span>
          <span class="word">猴集卡</span>
        </div>
      </router-link>
      <router-link to="/myjob">
        <div class="contentWord" style="margin-left: 0rem;">
          <span>
            <img :src="ten">
          </span>
          <span class="word">我的项目</span>
        </div>
      </router-link>
      <div
        class="contentWord"
        style="margin-right: .3rem;"
        v-on:click="phoneCall('(0571)5671 8627')"
      >
        <span>
          <img :src="tweve">
        </span>
        <span class="word">客服</span>
      </div>
      <router-link to="/fit">
        <div class="contentWord" style="margin-right: .2rem;">
          <span>
            <img :src="third">
          </span>
          <span class="word">设置</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      five: require("@/assets/5.png"),
      six: require("@/assets/6.png"),
      seven: require("@/assets/7.png"),
      eight: require("@/assets/8.png"),
      nine: require("@/assets/9.png"),
      ten: require("@/assets/10.png"),
      tweve: require("@/assets/11.png"),
      third: require("@/assets/12.png")
    };
  },
  methods: {
    phoneCall: function(msg) {
      //   点击div弹出打电话
      window.location.href = "tel://" + msg;
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
  justify-content: space-between;
  padding: 0 7% 0 7%;

  .contentWord {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 15px 0 15px 0;

    .word {
      margin-top: 8px;
    }
  }
}
</style>


