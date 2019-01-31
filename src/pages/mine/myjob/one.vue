<template>
  <div class="one">
    <p v-show="shows">暂无项目</p>
    <div v-for="item of list" :key="item.id" v-show="showa">
      <div style="height:100%;height:8px;background:#eee"></div>
      <div class="content" @click="localsa(item.crowd_funding_id)">
        <div class="first">
          <div class="time">{{item.start_date | formatDate}}</div>
          <div>已发起</div>
        </div>
        <div class="middles">
          <div class="left">
            <img :src="item.pic">
          </div>
          <div class="right">
            <div class="wordss">{{item.crowd_funding_name}}</div>
            <div class="moneyss">
              <span class="mains">目标金额</span>
              <span class="monets">¥{{item.goal_money}}</span>
            </div>
            <div class="progressAll">
              <div class="progress-outer">
                <span class="progress" :style="{width:item.progress+'%'}"></span>
                <span class="progressA">{{item.progress}}%</span>
              </div>
            </div>
            <div class="objes">项目结束时间：{{item.end_date | formatDate}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { MyObject } from "@/components/axios/api";
export default {
  filters: {
    formatDate: function(value) {
      value *= 1000;
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  data() {
    return {
      shows: false,
      list: [],
      showa: true
    };
  },
  created: function() {
    MyObject()
      .then(res => {
        if (res.data.data.length == 0) {
          this.shows = true;
          this.showa = false;
        }
        this.list = res.data.data;
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    computedResidualTime: function(item) {
      let residualTime = item.start_date;

      return `${residualTime}`;
    },
    localsa(INDE) {
      this.$router.push({
        path: "/Detail",
        query: {
          key: INDE
        }
      });
    }
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

.content {
  padding: 8px 0;
}

.first {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  padding-left: 3.2%;
  padding-right: 3.2%;
}

.left img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background: pink;
}

.progressAll {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 5px 0;
}

.progressA {
  position: absolute;
  top: 0.03rem;
  right: 26%;
  font-size: 12px;
  color: #F44A28;
}

.progress-outer {
  width: 46%;
  height: 0.3rem;
  position: relative;
  background-color: #fff;
  border-radius: 6.5px;
  overflow: hidden;
  border: 1px solid rgba(244, 74, 40, 1);
}

.progress-outer .progress {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  background: #FFE0AA;
}

.middles {
  display: flex;
  align-items: center;
  padding: 8px 3.2%;
}

.right {
  margin-left: 3%;
  width: 76%;
}

.wordss {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 550;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: -1px;
  margin-bottom: 6px;
}

.mains {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.monets {
  font-size: 16px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(210, 22, 35, 1);
  margin-left: 8px;
}

.objes {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.moneyss {
  display: flex;
  align-items: center;
}
</style>
