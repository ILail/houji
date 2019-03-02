<template>
  <div>
    <!-- <home-swiper :list="sowingMap"></home-swiper> -->
    <div class="contentNav">
      <ul>
        <li v-for=" (item,index) in picList" :key="item.id">
          <router-link
            :to="{  
        path: 'addressdetail',     
        query: {   
            num:index,// orderNum : this.searchData.orderNo
        }
    }"
          >
            <img :src="item.pic">
            <span>{{item.geographical_name}}</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{  
        path: 'addressdetail',     
        query: {   
            num: 0, // orderNum : this.searchData.orderNo
        }
    }"
          >
            <img :src="require('@/assets/more.png')">
            
            <span>更多</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div style="background:#eee;height:10px"></div>
    <div class="container pJext">
      <div class="title">
        <div>人气推荐</div>
      </div>
      <div class="content">
        <div class="wrap" v-for="items in intro" :key="items.id">
          <router-link
            :to="{  
        path: 'Detail',     
        query: {   
            key: items.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
          >
            <img v-lazy="items.pic" class="wrapImg" style="height:164.11px">
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
  </div>
</template>

<script type="text/ecmascript-6">
import { address } from "@/components/axios/api";
export default {
  name: "Mshu",
  // components: {
  //   HomeSwiper
  // },
  data() {
    return {
      // picList: [
      //   {
      //     name: "北京",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "上海",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "广州",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "厦门",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "钟祥",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "武汉",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "杭州",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "安徽",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "江苏",
      //     pic: require("@/assets/dizhi.png")
      //   },
      //   {
      //     name: "更多",
      //     pic: require("@/assets/dizhi.png")
      //   }
      // ],
      // show: true,
      // toggleShow: false,
      // isLoad: false,
      searchBarFixed: false,
      // sowingMap: [],
      picList: [],
      intro: []
    };
  },
  created() {
    address(1)
      .then(res => {
        // console.log(res.data);
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          // this.sowingMap = data.sowingMap;
          this.picList = data.geographicalList;
          this.intro = data.geographicalCrowdList;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
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
  // mounted() {
  //   this.initFunc();
  // },
  // methods: {
  //   initFunc() {
  //     if (!this.isLoad) {
  //       setTimeout(() => {
  //         this.show = false;
  //         this.toggleShow = true;
  //         this.isLoad = true;
  //       }, 1500);
  //     } else {
  //       this.show = false;
  //       this.toggleShow = true;
  //     }
  //   }
  // }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.contentNav {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  position: relative;
}

.contentNav img {
  width: 50%;
}

.contentNav li {
  float: left;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}

.contentNav li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}

.contentNav li span {
  margin-top: 6px;
  font-size: 12px;
  color: #020202;
}

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
