<template>
  <!-- <div class="container pJext">
    <div class="title">
      <div class="project">每日新品</div>
      <div class="more">
        <router-link
          :to="{  
        path: 'feilei',     
          query: {   
            key: 'fs', // orderNum : this.searchData.orderNo
        }
    }"
        >
          <span style="margin-right:4px">更多</span>
        </router-link>
        <img :src="imgAS" style="width:7px">
      </div>
    </div>
    <div class="people" v-for="item of product" :key="item.id">
      <router-link
        :to="{  
        path: 'Detail',     
        query: {   
            key: item.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
      >
        <img v-lazy="item.pic" class="peoImg" style="height:187px">
        <div class="people_p">
          <div class="list">{{item.crowd_funding_name}}</div>
          <div class="crowd-info">
            <div class="crowd-money">
              <span class="word">已售：</span>
              <span class="money">¥{{item.now_money}}</span>
            </div>
            <div class="crowd-right">
              <img :src="item.headimgurl">
              <span class="peoMuch">{{item.nickname}}</span>
            </div>
          </div>
          <div class="progressAll">
            <div class="progress-outer">
              <span class="progress" :style="{width:computedResidualTimea(item)+'%'}"></span>
            </div>
            <span class="progressA">{{item.progress}}%</span>
          </div>
          <div class="crowd-info_a">
            <div class="crowd-money">
              <span class="peoHow">{{item.support_num}}人支持</span>
            </div>
            <div class="crowd-day">
              <span style="margin-right: 3px;">
                <img src="@/assets/time.png" class="crowdTimg">
              </span>
              <span class="money">{{computedResidualTime(item)}}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>-->
  <div>
    <div class="title">限量折扣</div>
    <div class="icons container">
      <div class="icon" v-for="item of product" :key="item.id">
        <router-link
          :to="{  
        path: 'hdetial',     
        query: {   
            key: item.crowd_funding_id, // orderNum : this.searchData.orderNo
        }
    }"
        >
          <div class="icon-img" >
            <img class="icon-img-content" v-lazy="item.pic">
            
          </div>

          <div class="descA">{{item.crowd_funding_name}}</div>
          <div class="icon-desc">
            <span class="saleI">¥{{item.reality_money}}</span>
            <span class="saleH">¥{{item.support_money}}</span>
          </div>
        </router-link>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "HomeNew",
  props: {
    product: Array
  },
  data() {
    return {};
  },
  methods: {

  }
};
</script>
<style lang="stylus" scoped>
.title {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  padding: 18px 0;
}

.icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height 177.5px
}

.icon {
  width: 32%;
}

.icon-desc {
  margin-top: 5px;
  padding-bottom: 10px;
}

.icon-img-content {
  width: 100%;
  height 100%
}

.descA {
  font-size: 13px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10px;
}

.saleI {
  font-size: 13px;
  font-family: SanFranciscoDisplay-Light;
  font-weight: 300;
  color: rgba(210, 22, 35, 1);
}

.saleH {
  text-decoration: line-through;
  font-size: 10px;
  -webkit-text-size-adjust: none;
  font-family: SanFranciscoDisplay-Light;
  font-weight: 300;
  color: rgba(129, 129, 129, 1);
}
</style>



