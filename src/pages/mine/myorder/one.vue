<template>
  <div class="one">
    <!-- <div class="container bottom">
      <div v-for="(item,index) in json" :key="item.id" :id="index" class="allW">
        <div class="top">
          <span class="img">
            <img :src="item.headimgurl">
          </span>
          <span class="topWord">{{item.nickname}}</span>
        </div>
        <div class="item" v-for="(pl,index) in json[index].options" :key="index" :data-id="index">
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
    </div> -->
    <p v-if="shows">暂无订单</p>
  </div>
</template>

<script type="text/ecmascript-6">
import { MyOrder } from "@/components/axios/api";
export default {
  data() {
    return {
      shows: false
    };
  },
  created() {
    MyOrder(110, 1)
      .then(res => {
        if (res.data.data.data.length == 0) {
          this.shows = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.one {
  p {
    text-align: center;
    height: 30px;
    margin-top: 80px;
  }
}
</style>
