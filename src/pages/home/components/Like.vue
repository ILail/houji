<template>
  <div>
    <div class="title">
      <div>猜你喜欢</div>
    </div>
    <div class="content container">
      <div class="wrap" v-for="items in gass" :key="items.id">
        <router-link
          :to="{  
        path: 'Detail',     
        query: {   
            key: items.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
        >
          <img :src="items.pic" class="wrapImg">
          <div class="list">{{items.crowd_funding_name}}</div>
          <div class="progressAll">
            <div class="progress-outer">
              <span class="progress" :style="{width:items.progress+'%'}"></span>
            </div>
            <span class="progressA">{{items.progress}}%</span>
          </div>
          <div class="crowd-mon">
            <span class="word">已售：</span>
            <span class="money">¥{{items.now_money}}</span>
          </div>
          <div class="crowd-info">
            <div class="crowd-money">
              <span style="color:#666">{{items.support_num}}人支持</span>
            </div>
            <div class="crowdT">
              <span style="margin-right: 3px;">
                <img src="@/assets/time.png" class="crowdTimg">
              </span>
              <span class="peoMuch">{{computedResidualTime(items)}}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeLike",
  props: {
    gass: Array
  },
  // mounted() {
  //   console.log(this.gass);
  // },
  methods: {
    computedResidualTime: function(items) {
      let residualTime = items.left_time;
      let day = parseInt(residualTime / (24 * 3600)); //剩余天数
      if (day <= 0) {
        day = 0;
      }
      return `${day}天`;
    }
  }
};
</script>
<style lang="stylus" scoped>
.title {
  color: #020202;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  padding: 18px 0 18px 0;
}

.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 5px;
  padding-bottom: 50px;
}

.wrap {
  width: 48.5%;
  margin-bottom: 10px;
  box-shadow: #666 0px 0px 10px;
  border-radius: 5px;
  padding-bottom: 10px;
}

.wrapImg {
  width: 100%;
  border-radius: 5px;
}

.list {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
  margin-top: 13px;
  margin-bottom: 13px;
  padding: 0 0.12rem 0 0.12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progressAll {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.12rem 0 0.12rem;

  .progress-outer {
    width: 93%;
    height: 0.08rem;
    position: relative;
    background-color: #EEEEEE;
    border-radius: 5px;

    .progress {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 5px;
      background: #D21623;
    }
  }

  .progressA {
    font-size: 12px;
    color: #D21623;
  }
}

.crowd-mon {
  margin-top: 13px;
  padding: 0 0.12rem 0 0.12rem;

  .word {
    color: #666;
    font-size: 14px;
  }

  .money {
    color: #FF2930;
    font-size: 16px;
  }
}

.crowd-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 13px 0 0 0;
  padding: 0 0.12rem 0 0.12rem;

  .crowdT {
    display: flex;
    align-items: center;

    .crowdTimg {
      width: 12px;
      vertical-align: baseline;
    }

    .peoMuch {
      color: #666;
    }
  }
}
</style>


