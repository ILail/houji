<template>
  <div>
    <router-link
      :to="{  
        path: 'myorders',     
        query: {   
            key: '0', // orderNum : this.searchData.orderNo
        }
    }"
    >
      <div class="title">
        <div style="font-size:14px">我的订单</div>
        <img :src="wx" style="width:7px">
      </div>
    </router-link>
    <div class="content">
      <router-link
        :to="{  
        path: 'myorders',     
        query: {   
            key: '1', // orderNum : this.searchData.orderNo
        }
    }"
      >
        <div class="contentWord">
          <span>
            <img :src="one" style="width:16.5px">
          </span>
          <span class="word">进行中</span>
        </div>
      </router-link>
      <router-link
        style="margin-left: 2%;"
        :to="{  
        path: 'myorders',     
        query: {   
            key: '2', // orderNum : this.searchData.orderNo
        }
    }"
      >
        <div class="contentWord">
          <span>
            <img :src="two" style="width:20px">
          </span>
          <span class="word">待发货</span>
        </div>
      </router-link>
      <router-link
        :to="{  
        path: 'myorders',     
        query: {   
            key: '3', // orderNum : this.searchData.orderNo
        }
    }"
      >
        <div class="contentWord">
          <span>
            <img :src="three" style="width:21px">
          </span>
          <span class="word">已发货</span>
        </div>
      </router-link>
      <router-link
        :to="{  
        path: 'myorders',     
        query: {   
            key: '4', // orderNum : this.searchData.orderNo
        }
    }"
      >
        <div class="contentWord">
          <span>
            <img :src="four" style="width:22px">
          </span>
          <span class="word">退换/售后</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      wx: require("@/assets/rr.png"),
      one: require("@/assets/list/1.png"),
      two: require("@/assets/list/2.png"),
      three: require("@/assets/list/3.png"),
      four: require("@/assets/list/4.png")
    };
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
  padding: 0 6.4%;

  .contentWord {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 15px 0 15px 0;

    .word {
      margin-top: 8px;
      font-size: 12px;
    }
  }
}
</style>


