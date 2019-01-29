<template>
  <div class="word">
    <div class="wrap" onclick="url()">
      <div class="wraps">
        <img src="@/assets/linjuan/4.png" alt class="leftImg">
        <div class="words">
          <div class="wordsa">猴集客服</div>
          <div class="wordsb">查看与客服的沟通记录</div>
        </div>
      </div>
      <img :src="img" style="width: 10px;">
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
  data() {
    return {
      img: require("@/assets/rr.png")
    };
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.word {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
}

.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 3.2%;
  background: #fff;
}

.leftImg {
  width: 36px;
}

.wraps {
  display: flex;
  align-items: center;
}

.words {
  margin-left: 0.2rem;
  flex-direction: column;
}

.wordsa {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wordsb {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin-top: 8px;
}
</style>
