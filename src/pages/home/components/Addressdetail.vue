<template>
  <div class="wrapps">
    <van-tabs v-model="active" animated sticky v-if="showcon">
      <van-tab v-for="(item,index) in picList" :key="item.id">
        <div slot="title" @click="onClick(item.geographical_id,index)">{{item.geographical_name}}</div>
        <!-- 内容 {{ index }} -->
      </van-tab>
    </van-tabs>

    <!-- 下面内容 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="index in numlength" :key="index">
          <div class="wrapAll container">
            <div class="hitImg" v-show="ispic">
              <img src="@/assets/woring.png">
              <div class="contenr">敬请期待</div>
            </div>
            <div v-for="(itemCon) in listAddress" :key="itemCon.id" class="people">
              <router-link
                :to="{  
        path: 'Detail',     
        query: {   
            key: itemCon.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
              >
                <img :src="itemCon.pic" class="peoImg">
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
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { addresslist } from "@/components/axios/api";
import { address } from "@/components/axios/api";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
export default {
  name: "Addressdetail",
  data() {
    return {
      ispic: false,
      numlength: 9,
      ids: "",
      index: this.$route.query.num,
      active: this.$route.query.num,
      showcon: false,
      // items: [
      //   { label: "北京" },
      //   { label: "上海" },
      //   { label: "广州" },
      //   { label: "浙江" },
      //   { label: "海南" },
      //   { label: "山西" },
      //   { label: "安徽" },
      //   { label: "云南" },
      //   { label: "西藏" }
      // ],
      // options: {
      //   activeColor: "#D21623"
      //   // 可在这里指定labelKey为你数据里文字对应的字段名
      // },

      listAddress: [],
      picList: []
    };
  },
  created() {
    this.active = this.index;
    address()
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          this.showcon = true;
          const data = res.data;
          this.picList = data.geographicalList;
          this.ids = this.picList[this.index].geographical_id;
          this.refecd();
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    // 首页图片 设置定时器加载 不然swiper 会有bug (图片的吭) bind 解决this 指向

    let mySwiperA = new Swiper(".swiper-container");
    this.active = this.index;
    mySwiperA.slideTo(this.index, 0, false);

    mySwiperA.on("slideChange", () => {
      this.active = mySwiperA.activeIndex;
      this.$root.eventHub.$emit("changeTab", mySwiperA.activeIndex);
      this.ids = this.picList[mySwiperA.activeIndex].geographical_id;
      this.$toast({
        message: "加载中...",
        duration: "500"
      });
      this.refecd();
    });
    this.$root.eventHub.$on("changeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiperA.slideTo(index, 0, false);
    });
    // 页面的跳转
    // mySwiperA.on("slideChange", () => {
    //   this.selectedId = mySwiperA.activeIndex;
    //    this.$route.query.key = mySwiperA.activeIndex;
    //   this.$root.eventHub.$emit("changeTab", mySwiperA.activeIndex);
    // });
    // // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    // this.$root.eventHub.$on("changeTab", index => {
    //   mySwiperA.slideTo(index, 0, false);
    //   // mySwiperA.slideTo(num, 0, false);
    // });
  },
  methods: {
    onClick(names, index) {
      this.$root.eventHub.$emit("changeTab", index);
      this.ids = names;
      this.$toast({
        message: "加载中...",
        duration: "500"
      });
      this.refecd();
    },
    refecd() {
      console.log(this.ids);
      addresslist(this.ids, 0)
        .then(res => {
          this.listAddress = res.data.data.crowd_list;
          if (this.listAddress.length == 0) {
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
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wrapps >>> .van-tab {
  color: #333;
}

.wrapps >>> .van-tab--active {
  color: #D21623;
}

.wrapps >>> .van-tabs__line {
  background-color: #D21623;
}
.swiper-slide {
  height: 0px;
  overflow-y: hidden;
}

.swiper-slide-active {
  height: auto;
}

.pJext {
  padding: 18px 0 18px 0;
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
  box-shadow: #666 0px 0px 10px;
  margin-top: 15px;
}

.people .peoImg {
  width: 100%;
  margin-bottom: 18px;
  border-radius: 5px;
  height: 215px;
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
