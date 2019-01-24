<template>
  <div class="active">
    <!-- <div class="nonew">暂无收货地址</div> -->
    <van-swipe-cell
      :right-width="100"
      :left-width="0"
      :on-close="onClose"
      v-for="(item , index) in list"
      :key="index"
    >
      <div class="wrap" ref="wrap">
        <div class="wraptitle">
          <span>{{item.realname}}</span>
          <span>{{item.mobile}}</span>
        </div>
        <div class="wrapw">{{item.address_info}} {{item.address}}</div>
        <div class="wrapbott">
          <div class="right">
            <img :src="imgSrc" ref="suan" class="imgC" @click="toggleImg(index)">
            <span class="left">默认地址</span>
          </div>

          <div class="right_" @click="DerailL(index,item.user_address_id)">
            <img src="@/assets/schu.png" class="imgCO">
            <span class="leftc">删除</span>
          </div>
        </div>
      </div>
      <span slot="right" class="btns" @click="DerailL(index,item.user_address_id)">删除</span>
    </van-swipe-cell>
    <!-- <van-swipe-cell :right-width="65" :left-width="0" :on-close="onClose">
      <van-cell-group>
        <van-cell title="单元格" value="内容"/>
      </van-cell-group>
      <span slot="right">删除</span>
    </van-swipe-cell>-->
    <div class="enterH" @click="enenneen">新增收货地址</div>
  </div>
</template>
<script>
import Vue from "vue";
import { getAddress } from "@/components/axios/api";
import { getUser } from "@/components/axios/api";
import { getMove } from "@/components/axios/api";
import { SwipeCell } from "vant";
import { Cell, CellGroup } from "vant";
// import { Dialog } from "vant";

// Vue.use(Dialog);
Vue.use(Cell).use(CellGroup);
Vue.use(SwipeCell);
export default {
  name: "Shouhuo",
  data() {
    return {
      list: [],
      bgImg: [require("@/assets/xuan.png"), require("@/assets/xu.png")],
      imgIndex: 0,
      imgIndexa: 1,
      index: ""
    };
  },
  created: function() {
    getAddress()
      .then(res => {
        this.list = res.data.data;
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     console.log(this.$refs.suan);
  //   });
  // },
  updated: function() {
    this.$refs.suan[0].src = this.bgImg[this.imgIndexa];
  },
  computed: {
    imgSrc() {
      return this.bgImg[this.imgIndex];
    }
  },
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          instance.close();

          break;
      }
    },
    enenneen() {
      this.$router.push("/tianjia");
    },
    toggleImg(index) {
      this.index = index;
      const idNum = this.list[this.index].user_address_id;
      // const id = this.$route.query.dataObj;
      getUser(idNum)
        .then(res => {
          if (res.data.data.length == 0) {
            this.$toast({
              message: "设置成功",
              duration: "1000"
            });
            // console.log('dataObj='+id+'')
            // this.$router.push({
            //   path: '/queren?dataObj='+id+'',
            // });
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });

      this.$refs.suan[this.index].src = this.bgImg[this.imgIndexa];
      for (var i = 0; i < this.$refs.suan.length; i++) {
        if (i == this.index) {
          continue;
        }
        this.$refs.suan[i].src = this.bgImg[this.imgIndex];
      }
    },
    DerailL(iad, res) {
      this.$refs.wrap[iad].style.display = "none";
      getMove(res)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.active >>> .van-swipe-cell__right {
  background-color: #d21623;
  width: 100px;
}

.btns {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #f4f4f4;
}

.nonew {
  position: absolute;
  left: 40%;
  top: 40%;
}

.enterH {
  width: 96%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: #fff;
  margin-top: 20px;
  font-size: 14px;
  background: #D21623;
  color: #fff;
  border-radius: 5px;
  margin-left: 2%;
  position: fixed;
  bottom: 8px;
}

// 内容
.wrap {
  background: #ffffff;
  padding: 10px 4% 10px 4%;
  margin-bottom: 10px;
  border-radius: 5px;
}

.wraptitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.wrapw {
  font-size: 13px;
  margin-top: 10px;
  line-height: 1.5;
}

.wrapbott {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.imgC {
  width: 20%;
}

.imgCO {
  width: 23%;
}

.right {
  display: flex;
  align-items: center;
}

.right_ {
  display: flex;
  align-items: center;
  margin-right: -16px;
}

.left {
  margin-top: 5px;
  margin-left: 5px;
}

.leftc {
  margin-top: 2px;
  margin-left: 5px;
}
</style>
