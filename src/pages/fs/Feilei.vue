<template>
  <div>
    <div class="container">
      <div class="wrap">
        <router-link to="/search">
          <div class="header-input">
            <span class="middle">
              <img
                src="@/assets/search.png"
                style="vertical-align: sub;margin-right:4px;width:.28rem"
              >
            </span>
            <input placeholder="输入关键字" class="input">
          </div>
        </router-link>
      </div>
      <div :class="searchBarFixed == true ? 'isFixed' :''" id="searchBar">
        <!-- <div class="title">
          <div
            v-for="(item,index) in tabs"
            :key="item.id"
            :class="{active:index == num}"
            @click="tab(index)"
          >{{item.class_name}}</div>
        </div>-->
        <van-tabs v-model="active" animated sticky v-if="shoss">
          <van-tab v-for="(item,index) in tabs" :key="item.id">
            <div slot="title" @click="onClick(item.crowd_funding_class_id)">{{item.class_name}}</div>
            <!-- 内容 {{ index }} -->
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <!-- 下面内容 -->
    <!-- <div class="swiper-box">
      <div class="swiper-container wrapA">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <keep-alive>
              <div class="wrapAll container">
                <div class="hitImg" style="border:none" v-show="ispic">
                  <img src="@/assets/woring.png">
                  <div class="contenr">暂时无数据，静请期待！</div>
                </div>

                <div v-for="(itemCon) in tabContentsa" :key="itemCon.id" class="people">
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
                          <span
                            class="progress"
                            :style="{width:computedResidualTimea(itemCon)+'%'}"
                          ></span>
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
            </keep-alive>
          </div>
        </div>
      </div>
    </div>-->
    <div class="swiper-container wrapAll">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <van-list>
            <div v-for="(itemCon) in tabContentsa" :key="itemCon.id" class="people container">
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
          </van-list>
        </div>
        <!-- <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 1</div>-->
      </div>
    </div>
    <div class="tabberWarp">
      <div class="warp">
        <Item
          :txt="item.txt"
          :page="item.page"
          v-on:change="getVal"
          v-for="item in tabbarDes"
          :sel="selected"
          :key="item.id"
        >
          <img :src="item.normalImg" slot="normalImg">
          <img :src="item.activeImg" slot="activeImg">
        </Item>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import { fsDetail } from "@/components/axios/api";
import Item from "@/components/Item.vue";
import Tabbar from "@/components/common/Tan";
import one from "@/pages/fs/components/cp";
import two from "@/pages/fs/components/mshu";
import three from "@/pages/fs/components/jzai";
import four from "@/pages/fs/components/dabiao";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
import { fs } from "@/components/axios/api";
export default {
  name: "Feilei",
  components: {
    Item,
    Tabbar
  },
  data() {
    return {
      shoss:false,
      ids: "34",
      numlength: "",
      tabContentsa: [],
      ispic: false,
      num: 1,
      active: 0,
      selected: "feilei",
      tabbarDes: [
        {
          txt: "首页",
          page: "",
          normalImg: require("@/assets/foot/home.png"),
          activeImg: require("@/assets/foot/homes.png")
        },
        {
          txt: "分类",
          page: "feilei",
          normalImg: require("@/assets/foot/fix.png"),
          activeImg: require("@/assets/foot/fixs.png")
        },
        // {
        //   txt: "花果山",
        //   page: "peos",
        //   normalImg: require("@/assets/foot/peos.png"),
        //   activeImg: require("@/assets/foot/peoss.png")
        // },
        {
          txt: "购物车",
          page: "wishs",
          normalImg: require("@/assets/foot/wish.png"),
          activeImg: require("@/assets/foot/wishs.png")
        },
        {
          txt: "我的",
          page: "mines",
          normalImg: require("@/assets/foot/mine.png"),
          activeImg: require("@/assets/foot/mines.png")
        }
      ],
      list: [
        { component: one },
        { component: two },
        { component: three },
        { component: four }
      ],
      tabs: [],
      searchBarFixed: false,
      num: "",
      loading: false,
      finished: false
    };
  },

  created: function() {
    this.refecd();
    fs()
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          this.tabs = res.data;
          this.shoss = true
          // this.ids = this.tabs[0].crowd_funding_class_id;
          // console.log(this.ids)
          this.numlength = this.tabs.length;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
    let mySwiperA = new Swiper(".swiper-container");
    mySwiperA.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件
      console.log(mySwiperA.activeIndex);
      // this.$root.eventHub.$emit("slideTab", mySwiperA.activeIndex);
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    // this.$root.eventHub.$on("changeTab", index => {
    //   // 点击导航键跳转相应内容区
    //   mySwiperA.slideTo(index, 0, false);
    // });
    // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
    // this.$root.eventHub.$on("slideTab", this.slideTab);
  },
  methods: {
    onClick(names) {
      this.ids = names;
      this.refecd();
      console.log(this.ids);
    },
    refecd() {
      fsDetail(this.ids, this.num)
        .then(res => {
          res = res.data;
          if (res.status && res.data) {
            // console.log(res);
            this.tabContentsa = res.data.result;
            // console.log(this.tabContentsa);
          }
          // console.log(this.tabContentsa.length)
          if (this.tabContentsa.length == 0) {
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
    // slideTab(index) {
    //   this.num = index;
    // },
    getVal: function(res) {
      this.selected = res;
    },
    // tab(index) {
    //   this.num = index;
    //   this.$root.eventHub.$emit("changeTab", index);
    // },

    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var _this = this;
      if (scrollTop > 0) {
        _this.searchBarFixed = true;
      } else {
        _this.searchBarFixed = false;
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.watchScroll);
  }
};
</script>
<style lang="stylus" scoped>
.wrapAll >>> .van-list .people {
  border-radius: 5px;
  box-shadow: #eee 0px 0px 10px;
  margin-bottom: 25px;
}

.wrapAll >>> .van-list__loading {
  text-align: center;
  padding-bottom: 12px;
  margin-top: -20px;
}

.wrapAll >>> .van-list__finished-text {
  padding-bottom: 12px;
  margin-top: -20px;
}

.swiper-slide {
  height: 0px;
  overflow-y: hidden;
}

.swiper-slide-active {
  height: auto;
}

.isFixed {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 94%;
  background: #fff;
}

.wrap {
  .header-input {
    flex: 1;
    font-size: 13px;
    position: relative;
    color: #999;

    .input {
      line-height: 0.6rem;
      margin-top: 0.12rem;
      width: 100%;
      border-radius: 0.1rem;
      background: #EDEDED;
      text-align: center;
    }

    .middle {
      position: absolute;
      left: 35%;
      top: 0.26rem;
    }
  }
}

.title {
  margin-top: 14px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 3% 0 3%;
  border-bottom: 1px solid #EDEDED;
}

.title div {
  font-size: 14px;
  color: #333;
}

.title .active {
  color: #D21623;
  border-bottom: 2px solid #D21623;
  padding-bottom: 0.2rem;
}

// 底部
.warp {
  width: 100%;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0;
}

.warp img {
  width: 20px;
  height: 20px;
}

.tabberWarp img {
  margin-top: 10px;
  margin-bottom: 5px;
}

.tabberWarp {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 5px;
  background: #fff;
  z-index: 9999;
}

.active span {
  color: #d21623;
}

.crowd-right span {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.people {
  border-radius: 5px;
  box-shadow: #eee 0px 0px 10px;
  margin-bottom: 20px;
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

.crowdTimg {
  width: 12px;
  vertical-align: baseline;
}

.wrapAll {
  padding: 18px 0 35px 0;
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


