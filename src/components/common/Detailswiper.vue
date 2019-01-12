<template>
  <div class="detailWrap" ref="wrappers" style="visibility:hidden;">
    <!-- 推荐 -->
    <!-- <div :class="searchBarFixed == true ? 'isFixed' :''" id="searchBar"> -->
    <!-- <home-nav></home-nav> -->
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
      v-show="isshow"
      class="isFixed"
    ></ly-tab>

    <!-- </div> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="swiper-box">
        <div class="swiper-container wrapA">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item of list" :key="item.id">
              <keep-alive>
                <component :is="item.component"></component>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div class="bottom" v-if="isshowa">
      <ul>
        <li class="shu">
          <span style="margin-bottom:3px">
            <img src="@/assets/kefu.png" alt>
          </span>
          <span class="shuW" onclick="url()">客服</span>
        </li>
        <li class="shu bordershu" @click="wishesHit">
          <!-- <router-link to="/wishs"> -->
          <span style="margin-bottom:5px">
            <img src="@/assets/sku.png">
          </span>
          
          <span class="shuW" style="margin-top:-1px">心愿单</span>
          <!-- </router-link> -->
        </li>
        <li class="xiadan" @click="selectSort()">加入心愿单</li>
        <li class="joinw" @click="selectSorta()">下单支持</li>
      </ul>
    </div>

    <!-- 弹窗 -->
    <div class="tanBottom" v-show="istanchuan">
      <div class="topt"></div>
      <div class="topone container" @click="chaClik()">
        <img :src="img_path" class="topImg">
        <div class="middle">
          <span class="price">价格: ¥{{clickList.support_money}}</span>
          <span class="typen">{{clickList.return_name}}</span>
        </div>
        <div>
          <img src="@/assets/cha.png" class="cha">
        </div>
      </div>
      <div class="container">
        <div class="guige">规格</div>
        <div class="layerNode">
          <div
            class="content"
            v-for=" (item,index) in listP "
            :key="item.id"
            @click="tab(index)"
            :class="{active:index == num}"
          >
            <div class="contentF">{{item.return_name}}：</div>
            <div class="contentC">{{item.return_content}}</div>
          </div>
        </div>
        <div class="numB" id="tan">
          <div class="numBa">数量</div>
          <ul class="listnum">
            <li class="jia" v-on:click="jia">-</li>
            <li class="numW">{{ count}}</li>
            <li class="jian" v-on:click="jian">+</li>
          </ul>
          <div class="queren" @click="confirm()">确认</div>
        </div>
      </div>
    </div>

    <!-- 弹窗2-->
    <div class="tanBottom" v-show="istanchuana">
      <div class="topt"></div>
      <div class="topone container" @click="chaClik()">
        <img :src="img_path" class="topImg">
        <div class="middle">
          <span class="price">价格: ¥{{clickList.support_money}}</span>
          <span class="typen">{{clickList.return_name}}</span>
        </div>
        <div>
          <img src="@/assets/cha.png" class="cha">
        </div>
      </div>
      <div class="container">
        <div class="guige">规格</div>
        <div class="layerNode">
          <div
            class="content"
            v-for=" (item,index) in listP "
            :key="item.id"
            @click="tab(index)"
            :class="{active:index == num}"
          >
            <div class="contentF">{{item.return_name}}：</div>
            <div class="contentC">{{item.return_content}}</div>
          </div>
        </div>
        <div class="numB" id="tan">
          <div class="numBa">数量</div>
          <ul class="listnum">
            <li class="jia" v-on:click="jia">-</li>
            <li class="numW">{{ count}}</li>
            <li class="jian" v-on:click="jian">+</li>
          </ul>
          <div class="queren" @click="ljxd">立即下单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// 客服
var isSdkReady = false;
ysf("onready", function() {
  isSdkReady = true;
});
window.url = function() {
  if (isSdkReady) {
    location.href = ysf("url");
  } else {
    alert("sdk尚未加载成功，请稍后再试");
  }
};
import Vue from "vue";
import Detail from "@/components/common/Detail";
import Travel from "@/components/common/Travel";
import Plun from "@/components/common/Plun";
import Suyuan from "@/components/common/Suyuan";
import Swiper from "moon/swiper.min";
import "moon/swiper.min.css";
import { wishList } from "@/components/axios/api";
import { specifications } from "@/components/axios/api";
import { crowd_funding } from "@/components/axios/api";
import store from "@/components/vuex/store";
import { PullRefresh } from "vant";
import { Toast } from "vant";
Vue.use(PullRefresh);
Vue.use(Toast);
export default {
  name: "Detail",
  components: {
    Detail,
    Travel,
    Plun,
    Suyuan
  },
  data() {
    return {
      isLoading: false,
      selectedId: 0,
      items: [
        { label: "详情" },
        { label: "游记" },
        { label: "评论" },
        { label: "溯源" }
      ],
      options: {
        activeColor: "#D21623"
        // 可在这里指定labelKey为你数据里文字对应的字段名
      },
      handler: function(e) {
        e.preventDefault();
      },
      // searchBarFixed: false,
      list: [
        { component: Detail },
        { component: Travel },
        { component: Plun },
        { component: Suyuan }
      ],
      isshow: false,
      isshowa: true,
      scrollTop: "",
      istanchuan: false,
      istanchuana: false,
      count: 1,
      listP: [],
      img_path: "",
      clickList: "",
      num: 0
    };
  },
  created() {
    this.id = this.$route.query.key; //获取上个页面传递的id,在下面获取数据的时候先提交id
    specifications(this.id)
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          this.listP = data;
          this.clickList = data[0];
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });

    crowd_funding(this.id)
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          this.img_path = data.imgs.split(",")[0];
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted: function() {
    window.addEventListener("scroll", this.watchScroll);
    setTimeout(() => {
      this.$refs.wrappers.style.visibility = "visible";
    }, 1300);
    // 首页图片 设置定时器加载 不然swiper 会有bug (图片的吭) bind 解决this 指向

    let mySwiperA = new Swiper(".wrapA", {});
    mySwiperA.on("slideChange", () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到nav组件
      this.selectedId = mySwiperA.activeIndex;
      // this.$root.eventHub.$emit("slideTab", mySwiperA.activeIndex);
      if (mySwiperA.activeIndex == 0) {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
    });
    // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
    this.$root.eventHub.$on("changeTab", index => {
      // 点击导航键跳转相应内容区
      mySwiperA.slideTo(index, 0, false);
    });
  },
  methods: {
    wishesHit() {
      this.$router.push({
        path: "/wishs"
      });
    },
    onRefresh() {
      setTimeout(
        function() {
          this.$toast("刷新成功");
          this.isLoading = false;
        }.bind(this),
        500
      );
    },
    handleChange(item, index) {
      this.nowIndex = index;
      this.$root.eventHub.$emit("changeTab", index);
    },
    jia: function() {
      if (this.count == 1) {
        return;
      }
      this.count--;
    },
    jian: function() {
      if (this.count >= 99) {
        return;
      }
      this.count++;
    },
    closeTouch: function() {
      document
        .getElementById("tan")
        .addEventListener("touchmove", this.handler, { passive: false }); //阻止默认事件
    },
    // openTouch: function() {
    //   document
    //     .getElementsByTagName("body")[0]
    //     .removeEventListener("touchmove", this.handler, { passive: false }); //打开默认事件
    // },

    // 点击弹窗
    selectSort() {
      this.closeTouch(); //关闭默认事件
      this.istanchuan = true;
      this.isshowa = false;
    },
    selectSorta() {
      this.closeTouch(); //关闭默认事件
      this.istanchuana = true;
      this.isshowa = false;
    },
    // 点击关闭
    chaClik() {
      // this.openTouch(); //打开默认事件
      this.istanchuan = false;
      this.istanchuana = false;
      this.isshowa = true;
    },
    // 点击规格变化
    tab(index) {
      // 颜色
      this.num = index;
      this.clickList = this.listP[index];
    },
    // 点击确定
    confirm() {
      wishList(
        this.count,
        this.clickList.crowd_funding_return_id,
        this.$route.query.key
      )
        .then(res => {
          if (res.data.status == "-2012") {
            this.$router.push({ path: "/phone" });
          } else {
            alert("添加心愿单成功");
            this.istanchuan = false;
            this.isshowa = true;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    // 点击下单
    ljxd() {
      if (store.state.token == null) {
        this.$router.push({ path: "/phone" });
      } else {
        const arry = [
          this.$route.query.key,
          this.clickList.crowd_funding_return_id,
          this.count
        ];
        this.$router.push({
          path: "/querenone",
          query: {
            dataObjo: arry[0],
            dataObjb: arry[1],
            dataObjc: arry[2]
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
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
  width: 100%;
  background: #fff;
}

.detailWrap {
  position: relative;
  padding-bottom: 50px;
}

.topt {
  position: fixed;
  width: 100%;
  height: 20%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
}

.tanBottom {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80%;
  z-index: 999;
}

.bottom ul {
  display: flex;
  align-items: center;
}

.shu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
}

.bottom ul li {
  padding-top: 8px;
  padding-bottom: 8px;
}

.bottom img {
  width: 20px;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 9999;
  border-top: 1px solid rgba(204, 204, 204, 1);
}

.shuW {
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  margin-top: 2px;
}

.bordershu {
  border-left: 1px solid rgba(204, 204, 204, 1);
  border-right: 1px solid rgba(204, 204, 204, 1);
}

.xiadan {
  width: 30%;
  text-align: center;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: #333;
}

.joinw {
  width: 30%;
  text-align: center;
  font-size: 15px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  background: #D21623;
  height: 42px;
  line-height: 38px;
}

// 弹窗
.topImg {
  width: 89px;
  height: 89px;
  border-radius: 2px;
}

.topone {
  margin-top: -30px;
}

.topone {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.topone .middle {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cha {
  margin-top: -70px;
  width: 72%;
  margin-right: -10px;
}

.middle {
  margin-left: 10px;
}

.middle .price {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(168, 43, 51, 1);
  margin-bottom: 10px;
}

.typen {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
}

.guige {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 20px;
  margin-bottom: 20px;
}

.contentF {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  margin-bottom: 5px;
}

.contentC {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  border: 1px solid #666666;
  padding: 5px 10px;
  line-height: 1.5;
}

.numB {
  position: fixed;
  bottom: 0;
  overflow: hidden;
  width: 94%;
}

.numBa {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 10px;
}

.listnum li {
  float: left;
  margin-bottom: 28px;
}

.queren {
  width: 100%;
  background: rgba(210, 22, 35, 1);
  border-radius: 2px;
  overflow: hidden;
  height: 44px;
  margin-bottom: 14px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  line-height: 44px;
}

.jia, .jian {
  border: 1px solid #eeeeee;
  padding: 7px 12px;
  color: #999999;
}

.numW {
  padding: 6.3px 15px;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  color: #666666;
  font-size: 15px;
}

.layerNode {
  width: 100%;
  height: 194px;
  background-color: #fff;
  position: absolute;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* ios 自带滚动条不平滑解决方法 */
}

.content {
  margin-bottom: 18px;
  padding-top: 1px;
}

.layerNode .active {
  color: #D21623;
}
</style>
