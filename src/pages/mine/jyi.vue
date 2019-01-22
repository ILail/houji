<template>
  <div class="active">
    <div
      class="wrap"
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

    <div class="word" v-if="show">没有交易记录</div>
  </div>
</template>
<script>
import { jiaoY } from "@/components/axios/api";
export default {
  data() {
    return {
      list: [],
      show: false,
      same: true
    };
  },
  created() {
    jiaoY()
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

.wrap {
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


