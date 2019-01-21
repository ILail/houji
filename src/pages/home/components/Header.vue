<template>
  <div class="header">
    <div class="header-left" @click="shaoshao">
      <img src="@/assets/shousuo.png">
    </div>
    <router-link to="/search" style="width:75%">
      <div class="header-input">
        <span>
          <img src="@/assets/search.png" style="vertical-align: sub;margin-right:4px;width:.28rem">
        </span>请输入您想支持的项目
      </div>
    </router-link>
    <div class="header-right" @click="xiaoxiao">
      <img src="@/assets/new.png">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth
    };
  },
  mounted() {
    var _this = this;
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
    };
  },
  methods: {
    shaoshao() {
      // this.$router.push("/shao");
    },
    xiaoxiao() {
      this.$router.push("/xiao");
    }
  },
  //   mounted() {
  //     const that = this;
  //     window.onresize = () => {
  //       return (() => {
  //         window.screenWidth = document.body.clientWidth;
  //         that.screenWidth = window.screenWidth;
  //       })();
  //     };
  //   },
  //   watch: {
  //     screenWidth(val) {
  //          var oIframe = document.getElementById(divId);
  //       if (!this.timer) {
  //         this.screenWidth = val;
  //         this.timer = true;
  //         let that = this;
  //         setTimeout(function() {
  //          if(val<=330){

  //              oIframe.style.left = 30 + '%'
  //          }
  //           that.timer = false;
  //         }, 400);
  //       }
  //     }
  //   }
  watch: {
    screenWidth: function(val) {
      //监听屏幕宽度变化
      // var oIframe = document.getElementById('divId');
      //     if(val <= 330){
      //         console.log(oIframe)
      //         oIframe.style.left=0+"%"
      //     }
    }
  }
};
</script>
<style lang="stylus" scoped>
.header {
  display: flex;
  line-height: 0.64rem;
  align-items: center;
  justify-content: space-between;
  width: 93%;
  margin: 0 auto;
  padding: 0;
  position: relative;

  .header-left img {
    width: 0.64rem;
  }

  .header-input {
    height: 0.64rem;
    line-height: 0.64rem;
    background: #EDEDED;
    border-radius: 0.1rem;
    color: #999;
    text-align: center;
  }

  .header-right img {
    width: 0.64rem;
  }
}
</style>


