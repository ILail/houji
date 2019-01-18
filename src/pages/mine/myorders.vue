<template>
  <div class="active">
    <van-tabs v-model="active" swipeable animated>
      <van-tab title="全部">
        <div class="hitImg" v-show="ispic">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>
        <div class="container bottom">
          <div v-for="(item,index) in json" :key="item.id" :id="index" class="allW">
            <div class="top">
              <span class="img">
                <img :src="item.headimgurl">
              </span>
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div
              class="item"
              v-for="(pl,index) in json[index].options"
              :key="index"
              :data-id="index"
            >
              <div class="left">
                <img :src="pl.pic">
              </div>
              <div class="right">
                <div class="title">
                  <div class="titleWord">{{pl.crowd_funding_name}}</div>
                  <div class="titlew">
                    <div class="pricr">￥{{pl.support_money}}</div>
                    <div class="pNUM">x{{pl.wish_nums}}</div>
                  </div>
                </div>
                <div class="detailsame">{{pl.return_content}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="进行中">
        <div class="hitImg" v-show="ispic">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>
        <div class="container bottom">
          <div v-for="(item,index) in json" :key="item.id" :id="index" class="allW">
            <div class="top">
              <span class="img">
                <img :src="item.headimgurl">
              </span>
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div
              class="item"
              v-for="(pl,index) in json[index].options"
              :key="index"
              :data-id="index"
            >
              <div class="left">
                <img :src="pl.pic">
              </div>
              <div class="right">
                <div class="title">
                  <div class="titleWord">{{pl.crowd_funding_name}}</div>
                  <div class="titlew">
                    <div class="pricr">￥{{pl.support_money}}</div>
                    <div class="pNUM">x{{pl.wish_nums}}</div>
                  </div>
                </div>
                <div class="detailsame">{{pl.return_content}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="待发货">
        <div class="hitImg" v-show="ispic">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>
        <div class="container bottom">
          <div v-for="(item,index) in json" :key="item.id" :id="index" class="allW">
            <div class="top">
              <span class="img">
                <img :src="item.headimgurl">
              </span>
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div
              class="item"
              v-for="(pl,index) in json[index].options"
              :key="index"
              :data-id="index"
            >
              <div class="left">
                <img :src="pl.pic">
              </div>
              <div class="right">
                <div class="title">
                  <div class="titleWord">{{pl.crowd_funding_name}}</div>
                  <div class="titlew">
                    <div class="pricr">￥{{pl.support_money}}</div>
                    <div class="pNUM">x{{pl.wish_nums}}</div>
                  </div>
                </div>
                <div class="detailsame">{{pl.return_content}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="已发货">
        <div class="hitImg" v-show="ispic">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>
        <div class="container bottom">
          <div v-for="(item,index) in json" :key="item.id" :id="index" class="allW">
            <div class="top">
              <span class="img">
                <img :src="item.headimgurl">
              </span>
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div
              class="item"
              v-for="(pl,index) in json[index].options"
              :key="index"
              :data-id="index"
            >
              <div class="left">
                <img :src="pl.pic">
              </div>
              <div class="right">
                <div class="title">
                  <div class="titleWord">{{pl.crowd_funding_name}}</div>
                  <div class="titlew">
                    <div class="pricr">￥{{pl.support_money}}</div>
                    <div class="pNUM">x{{pl.wish_nums}}</div>
                  </div>
                </div>
                <div class="detailsame">{{pl.return_content}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="退换/售后">
        <div class="hitImg" v-show="ispic">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>
        <div class="container bottom">
          <div v-for="(item,index) in json" :key="item.id" :id="index" class="allW">
            <div class="top">
              <span class="img">
                <img :src="item.headimgurl">
              </span>
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div
              class="item"
              v-for="(pl,index) in json[index].options"
              :key="index"
              :data-id="index"
            >
              <div class="left">
                <img :src="pl.pic">
              </div>
              <div class="right">
                <div class="title">
                  <div class="titleWord">{{pl.crowd_funding_name}}</div>
                  <div class="titlew">
                    <div class="pricr">￥{{pl.support_money}}</div>
                    <div class="pNUM">x{{pl.wish_nums}}</div>
                  </div>
                </div>
                <div class="detailsame">{{pl.return_content}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Allorder } from "@/components/axios/api";
export default {
  name: "Myorders",
  data() {
    return {
      ispic: false,
      active: 0,
      num: 1,
      json: []
    };
  },
  created() {
    // 全部
    this.active = this.$route.query.key;
    Allorder(110, this.num)
      .then(res => {
        this.json = res.data.data.data;
        if (res.data.data.data.length == 0) {
          this.ispic = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // 进行中
    Allorder(111, this.num)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // 待发货
    Allorder(112, this.num)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // 已发货
    Allorder(113, this.num)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // 售后
    Allorder(114, this.num)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
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
  margin-top: 15px;
  color: #999;
}

.bottom {
  padding: 20px 0 20px 0;
}

.top {
  display: flex;
  align-items: center;
}

.item {
  display: flex;
  margin-top: 8px;
}

.top .img {
  width: 18px;
  height: 18px;
}

.top .img img {
  width: 100%;
  border-radius: 50%;
}

.topWord {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-left: 8px;
}

.left {
  width: 23%;
  height: 80px;
}

.left img {
  width: 100%;
  border-radius: 5px;
}

.allW {
  margin-top: 8px;
}

.right {
  width: 73%;
  margin-left: 3%;
}

.bottom_all {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.titlew {
  margin-top: 5px;
}

.title {
  display: flex;
}

.titleWord {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 550;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2;
  margin-top: 2px;
}

.detailsame {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  width: 83%;
  margin-top: 8px;
  line-height: 1.2;
}

.pricr {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.pNUM {
  font-size: 14px;
  font-family: Helvetica;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-align: right;
  margin-top: 5px;
}
</style>
