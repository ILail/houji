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
        <img :src="wx">
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
            <img :src="one">
          </span>
          <span class="word">进行中</span>
        </div>
      </router-link>
      <router-link
        :to="{  
        path: 'myorders',     
        query: {   
            key: '2', // orderNum : this.searchData.orderNo
        }
    }"
      >
        <div class="contentWord">
          <span>
            <img :src="two">
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
            <img :src="three">
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
            <img :src="four">
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
      wx: require("@/assets/right_.png"),
      one: require("@/assets/1.png"),
      two: require("@/assets/2.png"),
      three: require("@/assets/3.png"),
      four: require("@/assets/4.png")
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
  justify-content: space-around;

  .contentWord {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 15px 0 15px 0;

    .word {
      margin-top: 8px;
    }
  }
}
</style>


