<template>
  <div ref="wrappers" style="visibility:hidden;">
    <div id="box">
      <div class="hitImg" v-show="shops">
        <img src="@/assets/empty.png">
        <div class="contenr">赶快添加购物吧！</div>
      </div>
      <div class="list">
        <!-- 列表循环 -->
        <r-swiper-out slot="content" @onremove="removeHandler">
          <div
            v-cloak
            v-for="(item,index) in json"
            @click.capture="mp(index,$event)"
            :key="item.id"
            class="boxWrap"
            :id="index"
          >
            <!-- 商家 -->
            <div class="list-dp">
              <div class="listDd">
                <span :class="[yuan1,{bg:item.select}]" @click.stop="dpSelected(index)"></span>
                <!-- <span class="listimg"> -->
                <img :src="item.headimgurl" class="listImg">
                <!-- </span> -->
                <span class="dp">{{item.nickname}}</span>
              </div>
              <div @click="linjuan" style="color:#d21623">领卷</div>
            </div>

            <!-- 图片产品名称价格数量展示 -->
            <r-swiper-out-item
              v-for="(pl,index) in json[index].options"
              :key="index"
              :id="pl.wish_id"
              class="item"
              :data-id="index"
              v-cloak
            >
              <!-- 商品图片 -->
              <div class="outAll">
                <div class="item-select">
                  <span :class="[yuan,{bg:pl.select}]" @click.capture="selected(index,$event)"></span>
                </div>
                <router-link
                  :to="{  
        path: 'Detail',     
        query: {   
            key:pl.crowd_funding_id, 
        }
                }"
                  class="item-img"
                >
                  <img :src="pl.pic">
                </router-link>
                <!-- 商品名称 -->
                <div class="item-text">
                  <p>{{pl.crowd_funding_name}}</p>
                  <p>{{pl.return_content}}</p>
                  <div class="sl">
                    <div>￥{{pl.support_money}}</div>
                    <div class="slAll">
                      <span @click="reduce(index,pl.wish_id)">-</span>
                      <input type="text" v-model="pl.wish_nums">
                      <span @click="add(index,pl.wish_id)">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </r-swiper-out-item>
          </div>
        </r-swiper-out>
      </div>
    </div>
    <div class="footer">
      <span :class="[yuan,{bg:allSelect}]" @click="AllSelect()"></span>
      <span class="all">全选</span>
      <span class="hj">合计: ￥{{allPrice}}</span>
      <span class="up" @click="js()">立即购买</span>
    </div>
    <mine-header :hot="list"></mine-header>
    <!-- 底部栏 -->
    <div class="tabberWarp">
      <div class="warp">
        <Item
          :txt="item.txt"
          :page="item.page"
          v-on:change="getVal"
          v-for="item in tabbarDes"
          :sel="selecteda"
          :key="item.id"
        >
          <img :src="item.normalImg" slot="normalImg">
          <img :src="item.activeImg" slot="activeImg">
        </Item>
      </div>
    </div>
  </div>
</template>
<script defer=true>
import { rSwiperOut, rSwiperOutItem } from "@/bus/components/swiperOut";
import MineHeader from "./component/Like";
import { wishPush } from "@/components/axios/api";
import { forDetil } from "@/components/axios/api";
import { Addjia } from "@/components/axios/api";
import * as types from "@/components/vuex/types";
import store from "@/components/vuex/store";
import Item from "@/components/Item.vue";
export default {
  name: "Wish",
  components: {
    MineHeader,
    Item,
    rSwiperOut,
    rSwiperOutItem
  },
  data() {
    return {
      shops: false,
      arry: [],
      selecteda: "wishs",
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
      yuan: "yuan1",
      yuan1: "yuan",
      Index: "",
      cpIndex: "",
      allPrice: "0.00",
      allSelect: false,
      allNum: 0,
      json: [],
      list: []
    };
  },

  created: function() {
    wishPush()
      .then(res => {
        this.json = res.data.data.wish_list.list;
        this.list = res.data.data.recommend;
        if (this.json == undefined) {
          this.shops = true;
        }
      })
      .catch(err => {
        store.commit(types.LOGOUT);
        this.$router.push('/phone')
        console.log(err, "请求失败");
      });
  },
  mounted() {
    setTimeout(() => {
      this.$refs.wrappers.style.visibility = "visible";
    }, 1500);
  },
  methods: {
    linjuan() {
      this.$router.push("/linjuan");
    },
    removeHandler(el) {
      const delilID = el.id;
      const numL = el.getAttribute("data-id");

      forDetil(delilID)
        .then(res => {
          wishPush()
            .then(res => {
              this.json = res.data.data.wish_list.list;
              if ((this.allSelect = true)) {
                this.allSelect = false;
                this.allPrice = 0;
              }

              if (res.data.data.wish_list.list == undefined) {
                this.allSelect = false;
                this.shops = true;
              }
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
          if (this.json[this.Index].options[numL].select == true) {
            const a = this.json[this.Index].options[numL].support_money;
            const b = this.json[this.Index].options[numL].wish_nums;
            this.allPrice -= a * b;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    getVal: function(res) {
      this.selecteda = res;
    },
    //获取店铺id冒泡事件捕获阶段触发
    mp(dpIndex) {
      this.Index = dpIndex;
      // console.log("1---选择的是店铺------"+this.Index);
      // console.log(e.currentTarget);
    },
    //获取商品id
    selected(cpIndex) {
      var select = this.json[this.Index].options[cpIndex].select;
      this.json[this.Index].options[cpIndex].select = !select;
      this.cpIndex = cpIndex;
      var length = this.json[this.Index].options.length;

      // console.log(length);
      //商品全部选中，店铺才选中
      var select = true;
      for (var i = 0; i < length; i++) {
        //叠加积累有false就为false
        select *= this.json[this.Index].options[i].select;
      }
      if (select == true) {
        this.json[this.Index].select = true;
      } else this.json[this.Index].select = false;
      //判断商品是否全部选中，是的话，全选也选中
      var json = this.json.length;
      var all = true;
      for (var i = 0; i < json; i++) {
        all *= this.json[i].select;
      }
      if (all == true) {
        this.allSelect = true;
      }
      // console.log("2---店铺----"+this.Index+"商品序列---"+cpIndex);
      // console.log(e.currentTarget);
      this.allSl(); //商品数量
      this.cancel(); //商品没有全部选中就取消全选
      this.price(); //总价
    },
    //结算商品数量
    allSl() {
      var json = this.json.length;
      var js = 0;
      for (var i = 0; i < json; i++) {
        var arr = this.json[i].options;
        for (var j = 0; j < arr.length; j++) {
          js += this.json[i].options[j].select;
        }
      }
      this.allNum = js;
    },
    //计算价格
    price() {
      var all = 0;
      const resule = [];
      for (var j = 0; j < this.json.length; j++) {
        //点击循环有多少个商家
        var arr = this.json[j].options; //获取商家下面的列表产品

        for (var i = 0; i < arr.length; i++) {
          //循环产品列表

          if (arr[i].select === true) {
            //列表里面那些为true
            resule.push(arr[i].wish_id);

            all += arr[i].support_money * arr[i].wish_nums; //为true的价格加起来，为总价
          }
        }
      }
      this.arry = resule;
      this.allPrice = all.toFixed(2); //返回数据
    },
    //选择属于某个商家地所有产品
    dpSelected(index) {
      //商家选中
      var select = this.json[index].select;
      this.json[index].select = !select;

      var arr = this.json[index].options; //获取店铺下面的产品数量
      for (var i = 0; i < arr.length; i++) {
        //循环产品数量
        if (arr[i].select == false) {
          //判断有那些产品未选中
          arr[i].select = true; //选中咯
        }
        if (this.json[index].select === false) {
          //当店铺取消全选的时候
          arr[i].select = false; //产品全部没选中
        }
      }
      var select = true; //创建一个为真的变量
      for (var i = 0; i < this.json.length; i++) {
        if (this.json[i].select == false) {
          //如果有商家没选中全选则为false
          this.allSelect = false;
        }
        select *= this.json[i].select;
      }
      if (select == true) {
        this.allSelect = true;
      }

      this.allSl(); //商品数量
      this.price();
      // console.log(arr.length);
    },
    //有钱人就全选咯
    AllSelect() {
      var selected = this.allSelect;
      this.allSelect = !selected;
      if (this.json == undefined) {
        this.allSelect = false;
      }
      var dp = this.json.length; //获取店铺数量

      for (var i = 0; i < dp; i++) {
        //循环店铺
        var arr = this.json[i].options; //获取每个店铺的商品
        for (var j = 0; j < arr.length; j++) {
          //循环每个店铺里面的商品为选中
          if (this.allSelect == true) {
            var select = this.json[i].options[j].select;
            this.json[i].options[j].select = true;
          }
          if (this.allSelect == false) {
            this.json[i].options[j].select = false;
          }
        }
        if (this.allSelect == true) {
          this.json[i].select = true;
        } else {
          this.json[i].select = false;
        }
      }
      this.allSl(); //商品数量
      this.price();
    },
    //商品没有全部选中就取消全选
    cancel() {
      if (this.json[this.Index].options[this.cpIndex].select == false) {
        this.allSelect = false;
      }
    },
    //商品--
    reduce(index, id) {
      if (this.json[this.Index].options[index].wish_nums <= 1) {
        return;
      }
      const numjia = this.json[this.Index].options[index].wish_nums--;
      this.price();
      Addjia(id, numjia - 1)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    //商品++
    add(index, id) {
      if (this.json[this.Index].options[index].wish_nums > 999999) {
        return;
      }
      const numji = this.json[this.Index].options[index].wish_nums++;
      this.price();
      Addjia(id, numji + 1)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    //结算支付
    js() {
      if (this.allPrice == 0) {
        this.$toast({
          message: "请选择商品",
          duration: "1000"
        });
        return;
      }
      // 获取当前选中的商品的id
      console.log(this.arry);
      this.$router.push({
        path: "/queren",
        query: {
          dataObj: this.arry
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.hitImg {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  background: #eee;
  padding-bottom: 15px;
}

.hitImg img {
  width: 20%;
  margin-top: 7%;
}

.hitImg .contenr {
  margin-top: 15px;
  color: #999;
}

.boxWrap {
  border-bottom: 6px solid #eee;
}

.outAll {
  display: flex;
  align-items: center;
  padding-left: 3.2%;
  padding-right: 3.2%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.4rem 0 0.4rem;
  height: 44px;
  border-bottom: 1px solid #ededed;
}

.titleALL {
  color: #333333;
  font-size: 0.36rem;
}

.content {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 8px 0 15px 0;
}

.listDd {
  align-items: center;
  display: flex;
}

.listImg {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-left: 0.2rem;
}

.left {
  width: 24%;
  margin-left: 0.2rem;
}

.itemImg {
  width: 100%;
  border-radius: 0.1rem;
}

.right {
  width: 74%;
  position: relative;
  margin-left: 10px;
}

.leftImg img {
  width: 0.36rem;
  margin-top: 25px;
}

#list {
  padding-bottom: 10px;
}

.linjuan {
  color: #D21623;
  font-size: 0.28rem;
}

.title {
  font-size: 0.28rem;
  margin-left: 0.2rem;
}

.rigthTitle {
  font-size: 0.3rem;
  color: #333333;
  font-weight: bold;
}

.rightPrice {
  position: absolute;
  bottom: 0;
  font-size: 0.3rem;
}

.rightNum {
  margin-top: 10px;
  font-size: 0.24rem;
  color: #666666;
}

.listC {
  display: flex;
  margin: 10px 0 10px 0;
  align-items: center;
}

.listCA {
  display: flex;
  align-items: center;
}

.listCA img {
  width: 0.36rem;
}

.listC img {
  width: 0.36rem;
}

.bianji {
  color: #333333;
  font-size: 0.28rem;
}

.sum_cont {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 130px;
  height: 30px;
  line-height: 30px;
}

.minute {
  position: absolute;
  width: 35px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  left: 10px;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0.7);
}

/* 加号 */
.add {
  width: 35px;
  border: 1px solid rgba(0, 0, 0, 0.7);
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  right: 10px;
  font-size: 18px;
}

/* 文本框 */
.inputS {
  width: 40px;
  height: 30px;
  display: inline-block;
  line-height: 30px;
  text-align: center;
  position: absolute;
  right: 45px;
  border-top: 1px solid rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
}

.seleBto {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 50px;
  border-bottom: 1px solid #ededed;
  border-top: 1px solid #ededed;
  width: 100%;
  padding: 0 0 0 0.3rem;
  z-index: 999;
  background: #fff;
}

.titleS {
  color: #ffffff;
  font-size: 0.28rem;
  padding: 15px;
  background: #ccc;
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


// 文档
.header {
  width: 100%;
  height: 50px;
  background: #fff;
}

.header-div {
  width: 92%;
  height: 50px;
  margin: 0 auto;
}

.header-div:nth-child(1) {
  font-size: 20px;
  color: #666;
  text-align: center;
  line-height: 50px;
}

.footer {
  width: 100%;
  height: 50px;
  background: #fff;
  position: fixed;
  bottom: 53px;
  z-index: 999;
  padding-left: 3.2%;
  border-top: 1px solid #eee;
}

.list {
  list-style-type: none;
}

.yuan {
  border: 1px solid #ccc;
  width: 16.5px;
  height: 16.5px;
  display: inline-block;
  border-radius: 50%;
}

.list-dp {
  display: flex;
  align-items: center;
  padding: 0 3.2%;
  justify-content: space-between;
}

.listimg {
  margin: 0 2% 0 3%;
}

.dp {
  line-height: 0.8rem;
  font-size: 14px;
  margin-left: 0.1rem;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item {
  margin-bottom: 25px;
}

.item-img {
  width: 40%;
  margin-left: 2%;
}

.item-img img {
  width: 100%;
  border-radius: 5px;
}

.item-text {
  width: 95%;
  margin-left: 3%;
  overflow: hidden;
}

.item-text p:nth-child(1) {
  font-size: 15px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 1.2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item-text p:nth-child(2) {
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  padding: 5px 0 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-jg {
  color: #f40;
  padding-right: 10px;
}

.item-sl {
  color: #999;
  line-height: 1.5rem;
  font-size: 12px;
}

.yuan1 {
  border: 1px solid #ccc;
  width: 16.5px;
  height: 16.5px;
  display: inline-block;
  border-radius: 50%;
}

.footer {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.up {
  width: 2rem;
  height: 50px;
  color: #fff;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  background: #D21623;
}

.all {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(158, 158, 158, 1);
}

.bg {
  background: #D21623;
}

.hj {
  color: #D21623;
  font-size: 14px;
  width: 50%;
  text-align: right;
}

.bj {
  color: #999;
  font-size: 12px;
  float: right;
  margin-right: 5%;
}

.sl {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
}

.slAll {
  display: flex;
  width: 45%;
  align-items: center;
}

.slAll input {
  width: 55%;
  border-top: 1px solid rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  text-align: center;
  height: 27px;
  -webkit-appearance: none;
  border-radius: 0;
}

.slAll span {
  border: 1px solid rgba(0, 0, 0, 0.6);
  text-align: center;
  height: 27px;
  width: 50px;
  line-height: 24px;
}

.Hide {
  width: 30%;
  height: 1.3rem;
  background: #f40;
  display: inline-block;
  float: right;
  font-size: 16px;
  line-height: 1.3rem;
  text-align: center;
  color: #fff;
}

[v-cloak] {
  display: none;
}
</style>


