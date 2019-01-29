<template>
  <div class="wrapT">
    <van-tabs v-model="active" animated>
      <van-tab>
        <div slot="title">
          <div class="flex">
            <div class="con">{{title[0]}}:00</div>
            <div>开始抢购</div>
          </div>
        </div>
        <div>
          <div class="wrap">
            <div class="line"></div>
            <div class="word">限时限量 先到先得</div>
            <div class="line"></div>
          </div>
          <div v-for="(item , key) of list" :key="key" class="wrapCon">
            <div class="left">
              <img :src="item.pic" alt>
            </div>
            <div class="right">
              <div class="name">{{item.crowd_funding_name}}</div>
              <div class="detail">{{item.summary}}</div>
              <div class="all">
                <span class="xians">限时价：</span>
                <span class="Lmoney">¥{{item.reality_money}}0</span>
                <span class="Smoney">¥{{item.support_money}}</span>
              </div>
              <div class="sall">
                <span class="mass">仅剩{{item.left_nums}}件</span>
                <span class="mas">马上抢</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          <div class="flex">
            <div class="con">{{title[1]}}:00</div>
            <div>开始抢购</div>
          </div>
        </div>
        <div class="wrap">
          <div class="line"></div>
          <div class="word">限时限量 先到先得</div>
          <div class="line"></div>
        </div>内容 2
      </van-tab>
      <van-tab>
        <div slot="title">
          <div class="flex">
            <div class="con">{{titles[0]}}:00</div>
            <div>开始抢购</div>
          </div>
        </div>
        <div class="wrap">
          <div class="line"></div>
          <div class="word">限时限量 先到先得</div>
          <div class="line"></div>
        </div>内容 3
      </van-tab>
      <van-tab>
        <div slot="title">
          <div class="flex">
            <div class="con">{{titles[1]}}:00</div>
            <div>开始抢购</div>
          </div>
        </div>
        <div class="wrap">
          <div class="line"></div>
          <div class="word">限时限量 先到先得</div>
          <div class="line"></div>
        </div>内容 4
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { weal } from "@/components/axios/api";
import { ForList } from "@/components/axios/api";
export default {
  data() {
    return {
      active: 0,
      title: [],
      titles: [],
      list: []
    };
  },
  created() {
    ForList()
      .then(res => {
        res = res.data;
        this.list = res.data;
        console.log(this.list);
        // console.log(this.list);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
    weal()
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          this.title = data.timelist[0];
          this.titles = data.timelist[1];
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wrapT >>> .van-tabs__line {
  display: none;
}

.wrapT >>> .van-tabs--line .van-tabs__wrap {
  height: 50px;
}

.wrapT >>> .van-tab {
  padding: 0;
  background: rgba(210, 22, 35, 0.1);
  color: #333;
  line-height: normal;
}

.wrapT >>> .van-tab--active {
  font-weight: 500;
  color: #fff;
  background: rgba(210, 22, 35, 1);
}

.wrapT >>> .van-tabs .van-tab__pane {
  background: #F4F4F4;
  height: 100%;
}

.wrapT .flex {
  display: flex;
  flex-direction: column;
}

.wrapT .con {
  margin-top: 5px;
}

.wrapT >>>.van-tabs__content--animated {
  margin-top: 6px;
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 15px 0;
}

.line {
  width: 85px;
  height: 1px;
  background: rgba(204, 204, 204, 1);
}

.word {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin: 0 5%;
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

.wrapCon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 3.2%;
  background: #fff;
  margin-top: 12px;
}
</style>


