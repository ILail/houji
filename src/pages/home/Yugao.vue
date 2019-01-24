<template>
  <div class="wrapAll container">
    <div class="hitImg" v-show="ispic">
      <img src="@/assets/woring.png">
      <div class="contenr">敬请期待</div>
    </div>
    <div v-for="(itemCon) in tabContents" :key="itemCon.id" class="people">
      <img :src="itemCon.pic" class="peoImg">
      <div class="people_p">
        <div class="list">{{itemCon.crowd_funding_name}}</div>
        <div class="crowd-info">
          <div class="crowd-money">
            <span class="word">已售：</span>
            <span class="money">¥{{itemCon.now_money}}</span>
          </div>
          <div class="crowd-right">
            <span>
              <img :src="itemCon.headimgurl">
            </span>
            <span class="peoMuch">{{itemCon.nickname}}</span>
          </div>
        </div>
        <div class="progressAll">
          <div class="progress-outer">
            <span class="progress" :style="{width:computedResidualTimea(itemCon)+'%'}"></span>
          </div>
          <span class="progressA">{{itemCon.progress}}%</span>
        </div>
        <div class="crowd-info_a">
          <div class="crowd-money">
            <span class="peoHow">{{itemCon.support_num}}人支持</span>
          </div>
          <div class="crowd-day">
            <span style="margin-right: 3px;">
              <img src="@/assets/time.png" class="crowdTimg">
            </span>
            <span class="money">{{computedResidualTime(itemCon)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { fsDetail } from "@/components/axios/api";
export default {
  name: "Youji",
  data() {
    return {
      tabContents: [],
      ispic: false
    };
  },
  created() {
    fsDetail(1001,1)
      .then(res => {
        // console.log(res.data);
        res = res.data;
        if (res.status && res.data) {
          this.tabContents = res.data.result;
        }
        if (this.tabContents.length == 0) {
          this.ispic = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    computedResidualTime: function(itemCon) {
      let residualTime = itemCon.left_time;
      let day = parseInt(residualTime / (24 * 3600)); //剩余天数
      if (day <= 0) {
        day = 0;
      }
      return `${day}天`;
    },
    computedResidualTimea: function(itemCon) {
      let progress = itemCon.progress;
      if (progress >= 100) {
        progress = 100;
      }
      return `${progress}`;
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.pJext {
  padding: 18px 0 18px 0;
}
.crowd-right span {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  margin-top: 15px;
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
}

.crowd-info {
  display: flex;
  align-items: center;
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
  width: 85%;
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

.crowd-right {
  display: flex;
  align-self: center;
  color: #999;
}

.crowd-right img {
  width: 12px;
  vertical-align: baseline;
  margin-right: 3px;
}

.crowdTimg {
  width: 12px;
  vertical-align: baseline;
}

.hitImg {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.hitImg img {
  width: 50%;
  margin-top: 20%;
}

.hitImg .contenr {
  margin-top: 5px;
  color: #999;
}

.wrapAll {
  padding-bottom: 60px;
}
</style>
