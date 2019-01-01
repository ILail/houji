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
        <div class="title">
          <div
            v-for="(item,index) in tabs"
            :key="item.id"
            :class="{active:index == num}"
            @click="tab(index,item.crowd_funding_class_id)"
          >{{item.class_name}}</div>
        </div>
      </div>
      <div class="wrapAll">
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
  </div>
</template>
<script>
import Item from "@/components/Item.vue";
import { fs } from "@/components/axios/api";
import { fsDetail } from "@/components/axios/api";
export default {
  name: "Fs",
  components: {
    Item
  },
  data() {
    return {
      selected: "fs",
      tabbarDes: [
        {
          txt: "首页",
          page: "",
          normalImg: require("@/assets/foot/home.png"),
          activeImg: require("@/assets/foot/homes.png")
        },
        {
          txt: "分类",
          page: "fs",
          normalImg: require("@/assets/foot/fix.png"),
          activeImg: require("@/assets/foot/fixs.png")
        },
        {
          txt: "花果山",
          page: "peos",
          normalImg: require("@/assets/foot/peos.png"),
          activeImg: require("@/assets/foot/peoss.png")
        },
        {
          txt: "心愿单",
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
      tabs: [],
      id: "",
      tabContents: [],
      num: 0,
      numN: "",
      searchBarFixed: false
      // 接收的id值
      // selecteda: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
    getVal: function(res) {
      this.selected = res;
    },
    tab(index, id) {
      this.id = id;
      this.num = index;
      this.created();
    },
    created() {
      fsDetail(this.id)
        .then(res => {
          res = res.data;
          if (res.status && res.data) {
            console.log(res.data.result);
            this.tabContents = res.data.result;
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
    },
    destroyed() {
      window.removeEventListener("scroll", this.watchScroll);
    }
  },
  created: function() {
    // this.selecteda = this.$route.query.key; //获取上个页面传递的id,在下面获取数据的时候先提交id
    fs()
      .then(res => {
        // console.log(res.data);
        res = res.data;
        if (res.status && res.data) {
          this.tabs = res.data;
          const numN = this.tabs[0].crowd_funding_class_id; // 获取第一个的id  24
          this.numN = numN;
          // this.tabs.forEach((item,index) => {
          //   console.log(item.crowd_funding_class_id[0])
          // })
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });

    fsDetail(this.numN)
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          this.tabContents = res.data.result;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  }
};
</script>
<style lang="stylus" scoped>
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

// 下面的部分样式
.people {
  border-radius: 5px;
  box-shadow: #666 0px 0px 10px;
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

.crowd-right {
  display: flex;
  align-self: center;
  color: #999;
}

.crowd-right img {
  border-radius: 50%;
  vertical-align: baseline;
  margin-right: 3px;
  width: 12px;
  height: 12px;
}

.crowdTimg {
  width: 12px;
  vertical-align: baseline;
}

.wrapAll {
  padding: 18px 0 35px 0;
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
</style>



