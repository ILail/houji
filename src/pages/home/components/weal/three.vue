<template>
  <div style="padding-bottom:60px">
    <div v-for="(item , key) of list" :key="key">
      <router-link
        class="wrap"
        :to="{  
        path: 'hdetial',     
        query: {   
            key: item.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
      >
        <div class="left">
          <img v-lazy="item.pic" style="height:100px">
        </div>
        <div class="right">
          <div class="name">{{item.crowd_funding_name}}</div>
          <div class="detail">{{item.summary}}</div>
          <div class="all">
            <span class="xians">限时价：</span>
            <span class="Lmoney">¥{{item.reality_money}}</span>
            <span class="Smoney">¥{{item.support_money}}</span>
          </div>
          <div class="sall">
            <span class="mass">仅剩{{item.left_nums}}件</span>
            <span class="mas">马上抢</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ForList } from "@/components/axios/api";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    ForList()
      .then(res => {
        res = res.data;
        this.list = res.data;
        // console.log(this.list);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {}
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 12px solid #eee;
  margin-top: 12px;
  padding: 15px 3.2%;
}

.left img {
  width: 100px;
  border-radius: 5px;
}

.right {
  margin-left: 0.2rem;
  width: 82%;
}

.name {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.detail {
  max-width: 150px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 8px;
}

.xians {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.Lmoney {
  font-size: 18px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(210, 22, 35, 1);
}

.Smoney {
  font-size: 12px;
  font-family: SanFranciscoDisplay-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-decoration: line-through;
  margin-left: 0.6rem;
}

.all {
  display: flex;
  align-items: center;
  padding-top: 8px;
}

.sall {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
}

.mass {
  color: #f28f18;
}

.mas {
  width: 75px;
  height: 25px;
  background: #D21623;
  border-radius: 5px;
  margin-right: 0.3rem;
  line-height: 25px;
  text-align: center;
  color: #fff;
}
</style>
