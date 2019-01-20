<template>
  <div class="wrapas">
    <div class="time">
      <span>服务时间：</span>
      <span class="times">9:00-24:00</span>
    </div>
    <div class="monn">
      <div class="same" onclick="url()">
        <img src="@/assets/linjuan/11.png" class="sameoen">
        <span>在线客服</span>
      </div>
      <div class="same" v-on:click="phoneCall('4000 060401')">
        <img src="@/assets/linjuan/12.png" class="sametwo">
        <span>电话客服</span>
      </div>
    </div>
  </div>
</template>

<script>
// 客服
var isSdkReady = false;
ysf("onready", function() {
  isSdkReady = true;
});
window.url = function() {
  if (isSdkReady) {
    location.href = ysf("url");
  } else {
    alert("sdk尚未加载成功，请稍后再试");
  }
};
export default {
  name: "OrderBottom",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    phoneCall: function(msg) {
      //   点击div弹出打电话
      window.location.href = "tel://" + msg;
    }
  }
};
</script>
<!-- 1rem = html font-size = 50 px 86/100 -->
<style lang="stylus" scoped>
.wrapas {
  background: #fff;
  margin-top: 12px;
  padding: 10px 3.2%;
}

.time {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.times {
  color: rgba(51, 51, 51, 1);
}

.monn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.same {
  width: 45%;
  height: 36px;
  border: 1px solid rgba(51, 51, 51, 1);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sameoen {
  width: 20px;
}

.sametwo {
  width: 22px;
}

.same span {
  margin-left: 10px;
}
</style>
