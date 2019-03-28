<template>
  <div class="active">
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
          <span>领取人：清风不识字</span>
        <span>2019-03-22</span>
      </div>
    </div>
  </div>
</template>
<script>
import { myCollection } from "@/components/axios/api";
export default {
  name: "myColl",
  data() {
    return {
      list: []
    };
  },
  created() {
    myCollection()
      .then(res => {
        res = res.data;
        console.log(res.data);
        this.list = res.data.data;
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
    margin-left: 15px;
    padding-top: 8px;

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
      padding-top: 8px;
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
    display flex
    align-items center
    justify-content space-between
    padding: 15px 3%;
  }

  .canles span {
    font-size: 12px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: #333;
  }
}
</style>


