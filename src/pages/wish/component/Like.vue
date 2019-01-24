<template>
  <div style="padding-bottom: 60px;">
    <div class="title">
      <div style="font-size:14px">猜你喜欢</div>
    </div>
    <div class="content container">
      <div class="wrap" v-for="items in hot" :key="items.id">
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
              <span class="progress" :style="{width:computedResidualTimea(items)+'%'}"></span>
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

<script type="text/ecmascript-6">
export default {
  name:"MineHeader",
  props: {
    hot: Array
  },
  data() {
    return {};
  },

  methods: {
    computedResidualTime: function(items) {
      let residualTime = items.left_time;
      let day = parseInt(residualTime / (24 * 3600)); //剩余天数
      if (day <= 0) {
        day = 0;
      }
      return `${day}天`;
    },
    computedResidualTimea: function(items) {
      let progress = items.progress;
      if (progress >= 100) {
        progress = 100;
      }
      return `${progress}`;
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.title {
  color: #020202;
  text-align: center;
  padding: 12px 0 17.5px 0;
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
  box-shadow: #eee 0px 0px 10px;
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
    width: 70%;
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


