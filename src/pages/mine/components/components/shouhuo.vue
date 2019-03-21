<template>
  <div class="active">
    <!-- <div class="nonew">暂无收货地址</div> -->
    <div class="wrap" v-for="(item , index) in list" :key="index" ref="wrap">
      <div class="wraptitle">
        <span>{{item.realname}}</span>
        <span>{{item.mobile}}</span>
      </div>
      <div class="wrapw">{{item.address_info}} {{item.address}}</div>
      <div class="wrapbott">
        <div class="right">
          <img
            :src="imgSrc(item.status)"
            ref="suan"
            class="imgC"
            @click="toggleImg(index,item.user_address_id)"
          >
          <span class="left">默认地址</span>
        </div>

        <div class="right_" @click="DerailL(index,item.user_address_id)">
          <img src="@/assets/schu.png" class="imgCO">
          <span class="leftc">删除</span>
        </div>
      </div>
    </div>
    <div class="enterH" @click="enenneen">新增收货地址</div>
  </div>
</template>
<script>
import { getAddress } from "@/components/axios/api";
import { getUser } from "@/components/axios/api";
import { getMove } from "@/components/axios/api";

export default {
  name: "Shouhuo",
  data() {
    return {
      list: [],
      bgImg: [require("@/assets/xuan.png"), require("@/assets/xu.png")],
      imgIndex: 0,
      imgIndexa: 1,
      status: 2
    };
  },
  created: function() {
    getAddress()
      .then(res => {
        this.list = res.data.data;
        // console.log(this.list);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
// 方法二
  // computed: {
  //     imgSrc(val) {
  //     return val == this.status ? this.bgImg[0] : this.bgImg[1];
  //   },
  // },
  methods: {
    // 方法一
    imgSrc(val) {
      return val == this.status ? this.bgImg[0] : this.bgImg[1];
    },
    enenneen() {
      this.$router.push("/tianjia");
    },
    toggleImg(index, idNum) {
      
      // const idNum = this.list[this.index].user_address_id;
      // console.log(status)
      getUser(idNum)
        .then(res => {
          if (res.data.data.length == 0) {
            this.$toast({
              message: "设置成功",
              duration: "1200"
            });
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
      const address = this.$refs.suan;
      address[index].src = this.bgImg[this.imgIndexa];
      for (var i = 0; i < address.length; i++) {
        if (i == index) {
          continue;
        }
        address[i].src = this.bgImg[this.imgIndex];
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
