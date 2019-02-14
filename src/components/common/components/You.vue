<template>
  <div class="WRAYOU">
    <div class="title">
      <div class="youword">为你推荐</div>
    </div>
    <div class="content container">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="wrap" v-for="items in list" :key="items.id">
          <router-link
            :to="{  
        path: 'Detail',     
        query: {   
            key: items.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
          >
            <img v-lazy="items.pic" class="wrapImg">
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
      </van-list>
    </div>
    <!-- <img src="@/assets/linjuan/up.png" alt class="upImg" v-show="shows"> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import { Loading } from "vant";
Vue.use(Loading);
import { ForWu } from "@/components/axios/api";
export default {
  name: "Orderyou",
  data() {
    return {
      flag: false,
      list: [],
      loading: false,
      finished: false,
      num: 0,
      lastpage: "",
      // shows: false
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.watchScroll);
  },
  created() {
    this.refresh();
  },
  methods: {
    onLoad() {
      this.num++;
      // 异步更新数据
      setTimeout(() => {
        this.refresh();
        // 加载状态结束
        this.loading = false;
        console.log(this.num);
        console.log(this.lastpage);
        // 数据全部加载完成
        if (this.num >= this.lastpage) {
          this.finished = true;
          // this.shows = true;
        }
      }, 2500);
    },
    refresh: function() {
      ForWu(this.num)
        .then(res => {
          res = res.data;
          // console.log(res.data.total);
          if (res.status && res.data) {
            const data = res.data;
            this.list = this.list.concat(data.data);
            this.lastpage = data.last_page;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    computedResidualTime: function(items) {
      let residualTime = items.left_time;
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
.upImg {
  width: 30px;
  position: fixed;
  right: 30px;
  bottom: 24px;
  overflow: visible;
  opacity: 1;
  z-index: 9990;
}

.content >>> .van-list__loading {
  width: 100%;
}

.content >>> .van-list__finished-text, .van-list__loading-text {
  display: none;
}

.WRAYOU {
  background: #fff;
  margin-top: 12px;
}

.youword {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(2, 2, 2, 1);
}

.title {
  color: #020202;
  text-align: center;
  padding: 17.5px 0 17.5px 0;
}

.content >>>.van-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 5px;
}

.content >>>.van-list .wrap {
  width: 48.5%;
  margin-bottom: 10px;
  box-shadow: #eee 0px 0px 10px;
  border-radius: 5px;
  padding-bottom: 10px;
  position: relative;
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

.moreinfo {
  position: absolute;
}
</style>


