<template>
  <div class="wrapAll container">
    <div class="hitImg" v-show="ispic">
      <img src="@/assets/woring.png">
      <div class="contenr">敬请期待</div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text @load="onLoad">
      <div
        v-for="(itemCon) in tabContents"
        :key="itemCon.id"
        class="people"
        @click="DEtails(itemCon.crowd_funding_id)"
      >
        <!-- <router-link
          :to="{  
        path: 'Detail',     
        query: {   
            key: itemCon.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
        >-->
        <img v-lazy="itemCon.pic" class="peoImg" style="height:194px">
        <div class="people_p">
          <div class="list">{{itemCon.crowd_funding_name}}</div>
          <div class="crowd-info">
            <div class="crowd-money">
              <span class="word">已售：</span>
              <span class="money">¥{{itemCon.now_money}}</span>
            </div>
            <div class="crowd-right">
              <img :src="itemCon.headimgurl">
              
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
        <!-- </router-link> -->
      </div>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { fsDetail } from "@/components/axios/api";
export default {
  name: "Finish",
  data() {
    return {
      tabContents: [],
      loading: false,
      finished: false,
      num: 0,
      ispic: false
    };
  },
  created() {
    this.refes();
  },
  methods: {
    onLoad() {
      this.num++;
      // 异步更新数据
      setTimeout(() => {
        // i为页数
        // for (let i = 0; i < 2; i++) {
        // this.list.push(this.list.length + 1);

        this.refes();
        // }
        // 加载状态结束
        this.loading = false;
        // console.log(this.num);
        // 数据全部加载完成
        if (this.num >= 6) {
          this.finished = true;
        }
      }, 2500);
    },
    refes() {
      fsDetail(18, this.num)
        .then(res => {
          res = res.data;
          // console.log(res);
          if (res.status && res.data) {
            this.tabContents = this.tabContents.concat(res.data.result);
            // this.tabContentsa = res.data.result;
          }
          if (this.tabContents.length == 0) {
            // console.log(123455);
            this.ispic = true;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
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
    },
    DEtails(id) {
      this.$router.push({
        path: "/Detail",
        query: {
          key: id
        }
      });
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wrapAll >>> .van-list__loading {
  text-align: center;
  padding-bottom: 12px;
}

.wrapAll >>> .van-list__finished-text {
  padding-bottom: 12px;
  margin-top: -20px;
}
.wrapAll >>> .van-list{
  margin-top 15px
}
.wrapAll >>> .van-list .people {
  border-radius: 5px;
  box-shadow: #eee 0px 0px 10px;
  margin-bottom: 20px;
}

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

.crowdTimg {
  width: 12px;
  vertical-align: baseline;
}

.wrapAll {
  padding-bottom: 60px;
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
</style>
