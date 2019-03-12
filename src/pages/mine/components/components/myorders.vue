<template>
  <div class="active" v-if="showA">
    <van-tabs v-model="activea" swipeable sticky animated @click="onClick">
      <van-tab title="全部">
        <div class="hitImg" v-show="ispic">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>

        <div v-for="(item,index) in json" :key="item.id" :id="index" class="allW">
          <div class="top">
            <div>
              <img :src="item.headimgurl" class="img">
              
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div class="right_word"></div>
          </div>
          <div
            class="item"
            v-for="(pl,index) in json[index].options"
            :key="index"
            :data-id="index"
            @click="ImgDetial(item.trade_no)"
          >
            <div class="left">
              <img v-lazy="pl.pic" style="height:77.5px">
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
          <div class="contentW">共计{{item.return_nums}}件商品 合计：¥{{item.reality_money}}</div>
        </div>
      </van-tab>
      <van-tab title="进行中">
        <div class="hitImg" v-show="ispics">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>

        <div v-for="(item,index) in jsons" :key="item.id" :id="index" class="allW">
          <div class="top">
            <div>
              <img :src="item.headimgurl" class="img">
              
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div class="right_word">进行中</div>
          </div>
          <div
            class="item"
            v-for="(pl,index) in jsons[index].options"
            :key="index"
            :data-id="index"
            @click="ImgDetial(item.trade_no)"
          >
            <div class="left">
              <img v-lazy="pl.pic">
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
          <div class="contentW">共计{{item.return_nums}}件商品 合计：¥{{item.reality_money}}</div>
        </div>
      </van-tab>

      <van-tab title="待发货">
        <div class="hitImg" v-show="ispicss">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>

        <div v-for="(item,index) in jsonss" :key="item.id" :id="index" class="allW">
          <div class="top">
            <div>
              <img :src="item.headimgurl" class="img">
              
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div class="right_word">待发货</div>
          </div>
          <div
            class="item"
            v-for="(pl,index) in jsonss[index].options"
            :key="index"
            :data-id="index"
            @click="ImgDetial(item.trade_no)"
          >
            <div class="left">
              <img v-lazy="pl.pic">
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
          <div class="contentW">共计{{item.return_nums}}件商品 合计：¥{{item.reality_money}}</div>
        </div>
      </van-tab>

      <van-tab title="已发货">
        <div class="hitImg" v-show="ispicsss">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>
        <div class="bottom">
          <div v-for="(item,index) in jsonsss" :key="item.id" :id="index" class="allW">
            <div class="top">
              <div>
                <img :src="item.headimgurl" class="img">
                
                <span class="topWord">{{item.nickname}}</span>
              </div>
              <div class="right_word">已发货</div>
            </div>
            <div
              class="item"
              v-for="(pl,index) in jsonsss[index].options"
              :key="index"
              :data-id="index"
              @click="ImgDetial(item.trade_no)"
            >
              <div class="left">
                <img v-lazy="pl.pic">
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
            <div class="contentW">共计{{item.return_nums}}件商品 合计：¥{{item.reality_money}}</div>
            <div class="twoWord">
              <span class="one" @click="wuliu(jsonsss[index].trade_no)">查看物流</span>
              <span class="two" @click="corif(jsonsss[index].trade_no)">确认收货</span>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="退换/售后">
        <div class="hitImg" v-show="ispicssss">
          <img src="@/assets/linjuan/5.png">
          <div class="contenr">暂时无订单</div>
        </div>

        <div v-for="(item,index) in jsonssss" :key="item.id" :id="index" class="allW">
          <div class="top">
            <div>
              <img :src="item.headimgurl" class="img">
              
              <span class="topWord">{{item.nickname}}</span>
            </div>
            <div class="right_word">已确认收货</div>
          </div>
          <div
            class="item"
            v-for="(pl,index) in jsonssss[index].options"
            :key="index"
            :data-id="index"
            @click="ImgDetial(item.trade_no)"
          >
            <div class="left">
              <img v-lazy="pl.pic">
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
          <div class="contentW">共计{{item.return_nums}}件商品 合计：¥{{item.reality_money}}</div>
          <div class="contents">
            <div @click="TUIKUANG(jsonssss[index].trade_no)">申请退款</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import { Allorder } from "@/components/axios/api";
import { moreBank } from "@/components/axios/api";
import { CorfirWu } from "@/components/axios/api";
import { MessageWu } from "@/components/axios/api";

export default {
  name: "Myorders",
  data() {
    return {
      showA: false,
      activea: 1,
      num: 1,
      json: [],
      ispic: false,
      jsons: [],
      ispics: false,
      jsonss: [],
      ispicss: false,
      jsonsss: [],
      ispicsss: false,
      jsonssss: [],
      ispicssss: false
    };
  },
  created() {
    // 全部
    this.activea = this.$route.query.key;
    Allorder(110, this.num)
      .then(res => {
        this.json = res.data.data.data;
        console.log(res);
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
        this.jsons = res.data.data.data;
        if (res.data.data.data.length == 0) {
          this.ispics = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // 待发货
    Allorder(112, this.num)
      .then(res => {
        this.jsonss = res.data.data.data;
        if (res.data.data.data.length == 0) {
          this.ispicss = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // 已发货
    Allorder(113, this.num)
      .then(res => {
        this.jsonsss = res.data.data.data;
        if (res.data.data.data.length == 0) {
          this.ispicsss = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    // 售后
    Allorder(114, this.num)
      .then(res => {
        this.jsonssss = res.data.data.data;
        if (res.data.data.data.length == 0) {
          this.ispicssss = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    this.$toast({
      type: "loading",
      message: "加载中...",
      duration: "1200"
    });
    setTimeout(() => {
      this.showA = true;
    }, 1450);
  },
  methods: {
    onClick(index) {
      console.log(index);
    },
    ImgDetial(trade_no) {
      let tradeNO = trade_no;
      this.$router.push({
        path: "/orderdetails",
        query: {
          dataObjo: tradeNO
        }
      });
      console.log(trade_no);
    },
    TUIKUANG(index) {
      moreBank(index)
        .then(res => {
          if (res.data.status != "-1008") {
            this.$toast({
              message: "您已经提交申请",
              duration: "1000"
            });
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    corif(indexs) {
      CorfirWu(indexs)
        .then(res => {
          console.log(res);
          if (res.data.status == "1") {
            this.$toast({
              message: "操作成功",
              duration: "1000"
            });
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    wuliu(indexss) {
      MessageWu(indexss)
        .then(res => {
          console.log(res);
          if (res.data.status == "1") {
            this.$toast({
              message: "操作成功",
              duration: "1000"
            });
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.contents {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.active >>> .van-tabs__content, .van-tabs__content--animated {
  height: 100%;
}

.active >>> .van-tabs .van-tab__pane {
  height: 100%;
  background-color: #f4f4f4;
}

.contents div {
  border: 1px solid rgba(210, 22, 35, 1);
  border-radius: 5px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(210, 22, 35, 1);
  width: 85px;
  height: 28px;
  text-align: center;
  line-height: 28px;
}

.twoWord {
  text-align: right;
  padding: 15px 0 10px 0;
}

.twoWord .one {
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 5px;
  color: #000000;
  margin-right: 0.3rem;
}

.twoWord .two {
  border: 1px solid rgba(210, 22, 35, 1);
  border-radius: 5px;
  color: #D21623;
}

.twoWord span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  padding: 4px 8px;
  border: 1px solid red;
}

.contentW {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: right;
  padding: 5px 0;
}

.right_word {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(210, 22, 35, 1);
  text-align: right;
}

.hitImg {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  background: #fff;
}

.hitImg img {
  width: 50%;
  margin-top: 8%;
}

.hitImg .contenr {
  margin-top: 15px;
  color: #999;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item {
  display: flex;
  margin-top: 8px;
}

.top img {
  width: 18px;
  height: 18px;
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
  height: 77.5px;
  border-radius: 5px;
}

.allW {
  margin-top: 8px;
  background: #fff;
  padding: 10px 3.2%;
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
  justify-content: space-between;
}

.titleWord {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 550;
  color: rgba(51, 51, 51, 1);
  max-width: 70%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.4;
  margin-top: 2px;
}

.detailsame {
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-top: 8px;
  line-height: 1.4;
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

.active >>> .van-tab {
  color: #333;
}

.active >>> .van-tab--active {
  color: #D21623;
}

.active >>> .van-tabs__line {
  background-color: #D21623;
}
</style>
