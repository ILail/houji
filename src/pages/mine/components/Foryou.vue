<template>
  <div>
    <div class="title">
      <div style="font-size:14px">为你推荐</div>
    </div>
    <div class="content container">
      <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
      <div class="wrap" v-for="items in list" :key="items.id">
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

      <van-loading type="spinner" v-if="flag"/>
    </div>

    <!-- <div class="noinfo" v-if="noinfo">已加载全部数据</div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import { Loading } from "vant";
Vue.use(Loading);
import { foryou } from "@/components/axios/api";
export default {
  data() {
    return {
      flag: false,
      // noinfo: false,
      list: [],
      num: 1,
      lastpage: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  },
  created() {
    this.refresh();
  },
  methods: {
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(document.body.clientHeight);
      var allHeight = document.body.clientHeight;
      var windowHeight = document.documentElement.clientHeight;
      // var this = this;
      if (scrollTop >= allHeight - windowHeight) {
        this.flag = true;
        if (this.lastpage >= this.num) {
          //totalPage是后端返回来的总页数
          setTimeout(() => {
            this.flag = false;
          }, 800);

          this.refresh();
        } else {
          this.flag = false;
          // this.$toast({
          //   message: "已经加载完全部数据",
          //   duration: "1000"
          // });
          return;
        }
      }
      // console.log(document.documentElement.scrollTop);
      //  console.log(document.documentElement.clientHeight);
    },
    refresh: function() {
      foryou(this.num)
        .then(res => {
          res = res.data;

          if (res.status && res.data) {
            const data = res.data;
            this.list = this.list.concat(data.data);
            this.lastpage = data.last_page;
            setTimeout(() => {
              this.num++;
            }, 1500);
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
.content>>>.van-loading {
  left: 45%;
  bottom: 55px;
}

.title {
  color: #020202;
  text-align: center;
  padding: 17.5px 0 17.5px 0;
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


