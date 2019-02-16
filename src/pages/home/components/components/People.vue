<template>
  <div class="container pJext">
    <div class="title">
      <div class="project">人气项目</div>
      <div class="more">
        <router-link :to="{  
        path: 'feilei',     
        
    }">
          <span style="margin-right:4px">更多</span>
        </router-link>
        <img :src="imgAS" style="width:7px">
      </div>
    </div>
    <div class="people" v-for="item of larity" :key="item.id">
      <router-link
        :to="{  
        path: 'Detail',     
        query: {   
            key: item.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
      >
        <img v-lazy="item.pic" class="peoImg" style="height:187px">
        <div class="people_p">
          <div class="list">{{item.crowd_funding_name}}</div>
          <div class="crowd-info">
            <div class="crowd-money">
              <span class="word">已售：</span>
              <span class="money">¥{{item.now_money}}</span>
            </div>
            <div class="crowd-right">
              <img :src="item.headimgurl">
              
              <span class="peoMuch">{{item.nickname}}</span>
            </div>
          </div>
          <div class="progressAll">
            <div class="progress-outer">
              <span class="progress" :style="{width:computedResidualTimea(item)+'%'}"></span>
            </div>
            <span class="progressA">{{item.progress}}%</span>
          </div>
          <div class="crowd-info_a">
            <div class="crowd-money">
              <span class="peoHow">{{item.support_num}}人支持</span>
            </div>
            <div class="crowd-day">
              <span style="margin-right: 3px;">
                <img src="@/assets/time.png" class="crowdTimg">
              </span>
              <span class="money">{{computedResidualTime(item)}}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
// import Utils from '@/utils/utils.js'
// var a = Utils.encrypt('欢迎登陆','ffffffffffffssss')
// var b = Utils.decrypt(a,'ffffffffffffssss')
// console.log('加密后: '+a)
// console.log('解密后: '+b)
export default {
  name: "HomePeople",
  props: {
    larity: Array
  },
  data() {
    return {
      imgAS: require("@/assets/rr.png")
    };
  },
  methods: {
    computedResidualTime: function(item) {
      let residualTime = item.left_time;
      let day = parseInt(residualTime / (24 * 3600)); //剩余天数
      if (day <= 0) {
        day = 0;
      }
      return `${day}天`;
    },
    computedResidualTimea: function(item) {
      let progress = item.progress;
      if (progress >= 100) {
        progress = 100;
      }
      return `${progress}`;
    }
  }
};
</script>
<style lang="stylus" scoped>
.pJext {
  padding: 18px 0 18px 0;
  height 794px
}

.title {
  overflow: hidden;
  margin-bottom: 18px;
}

.project {
  float: left;
  font-size: 16px;
  color: #020202;
  font-family: PingFangSC-Medium;
  font-weight: bold;
}

.more {
  float: right;
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 12px;
  line-height: 16px;
}

.people {
  border-radius: 5px;
  box-shadow: #eee 0px 0px 10px;
  margin-bottom: 20px;
  height 358px
}

.people .peoImg {
  width: 100%;
  margin-bottom: 18px;
  border-radius: 5px;
}

.people_p {
  padding: 0 0.21rem 15px 0.21rem;
}

.list {
  font-size: 18px;
  color: #333333;
  font-weight: bold;
  line-height: 1.4;
}

.crowd-info {
  display: flex;
  justify-content: space-between;
  margin: 15px 0 16px 0;
}

.crowd-money .word {
  font-size: 12px;
  color: #666666;
}

.crowd-money .money {
  font-size: 16px;
  color: #D21623;
}

.crowd-money .peoMuch {
  color: #999999;
  font-size: 12px;
}

.crowd-info_a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0 0;
}

.progressAll {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progressA {
  font-size: 12px;
  color: #D21623;
}

.progress-outer {
  width: 93%;
  height: 0.08rem;
  position: relative;
  background-color: #EEEEEE;
  border-radius: 5px;
}

.progress-outer .progress {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  background: #D21623;
}

.peoHow {
  font-size: 10px;
}

.crowd-day {
  display: flex;
  align-items: center;
  color: #666;
}

.crowd-money {
  display: flex;
  align-items: center;
}

.crowd-right {
  display: flex;
  align-items: center;
  color: #999;
}

.crowd-right img {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  margin: -1px 3px 0 0;
}

.crowd-right span {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.crowdTimg {
  width: 12px;
  vertical-align: baseline;
}
</style>



