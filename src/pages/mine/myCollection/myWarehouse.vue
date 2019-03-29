<template>
  <div class="active">
      <div class="house" v-show="show">暂时无数据</div>
    <div class="conten" v-for="item in list" :key="item.id">
      <div class="wrap">
        <img :src="item.pic" class="wrapImg">
        <div class="wrapF">
          <span class="nameEW">{{item.crowd_funding_name}}</span>
          <span class="nameP">¥{{item.exchange_guide_price}}</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="canles">
        <span>交易详情</span>
        <span>收货</span>
      </div>
    </div>

  </div>
</template>
<script>
import { myWarehouse } from "@/components/axios/api";
export default {
  name: "myColl",
  data() {
    return {
      list: [],
      show:false
    };
  },
  created() {
    myWarehouse()
      .then(res => {
        res = res.data;
        this.list = res.data.data;
        if(this.list.length == 0){
              this.show = true
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  }
};
</script>
<style  lang="stylus" scoped>
.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #f4f4f4;
  -webkit-overflow-scrolling: touch;

  .conten {
    background: #fff;
  }
.house{
    text-align center
    font-size 15px
    margin-top 40%
}
  .wrap {
    display: flex;
    width: 100%;
    padding: 15px 3% 10px 3%;
    margin: 10px 0 0 0;
    // border-bottom 1px solid #CCC
  }

  .wrapF {
    display: flex;
    flex-direction: column;
    margin-left 15px
    padding-top 8px 
    .nameEW {
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }

    .nameP {
      font-size: 16px;
      font-family: SanFranciscoDisplay-Medium;
      font-weight: 500;
      color: rgba(210, 22, 35, 1);
      padding-top 8px
    }
  }

  .wrapImg {
    width: 85px;
    height: 85px;
  }

  .line {
    width: 94%;
    height: 1px;
    background: #ccc;
    margin-left: 3%;
  }

  .canles {
 
    text-align: right;
    padding 15px 3%
  }

  .canles span {
    font-size: 13px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    border 1px solid #999
    padding 2px 8px
  }
}
</style>


