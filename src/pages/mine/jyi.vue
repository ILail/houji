<template>
  <div class="active">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div
        class="wrapaa"
        v-for="item in list"
        :key="item.id"
        @click="hit(item.account_id,item.addtime,item.amount_after_pay,item.change_type)"
      >
        <div class="wraps">
          <span>{{item.change_type}}</span>
          <span style="margin-top:3px">{{item.addtime}}</span>
        </div>
        <div v-show="item.amount_out < item.amount_in" class="eeee">+ {{item.amount_in}}</div>
        <div v-show="item.amount_out > item.amount_in">- {{item.amount_out}}</div>
      </div>
    </van-list>
    <div class="word" v-if="show">没有交易记录</div>
  </div>
</template>
<script>
import Vue from "vue";
import { jiaoY } from "@/components/axios/api";
import { List } from "vant";

Vue.use(List);
export default {
  data() {
    return {
      list: [],
      show: false,
      same: true,
      loading: false,
      finished: false,
      num: 1
    };
  },
  created() {
    console.log(this.num)
    jiaoY(this.num)
      .then(res => {
        this.list = res.data.data;
        console.log(res.data);
        if (this.list.length == 0) {
          this.show = true;
          return false;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    hit(one, two, three, four) {
      let num = [];
      num.push(one, two, three, four);
      this.$router.push({
        path: "/jioayid",
        query: {
          dataObjo: num
        }
      });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // i为页数
        // for (let i = 0; i < 2; i++) {
          // this.list.push(this.list.length + 1);
          this.num ++;
        // }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.num >= 5) {
          this.finished = true;
        }
      }, 500);
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
  -webkit-overflow-scrolling: touch;
  background-color: #f4f4f4;
}

.word {
  text-align: center;
  margin-top: 40%;
}

.active >>> .van-list .wrapaa {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 12px 3.2%;
  margin-bottom: 1px;
}

.wraps {
  display: flex;
  flex-direction: column;
}

.eeee {
  color: red;
}
</style>


