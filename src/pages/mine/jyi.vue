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
      <div>- {{item.amount_out}}</div>
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
      show:false
    };
  },
  created() {
    jiaoY()
      .then(res => {
        // console.log(res.data.data)
        this.list = res.data.data;
        if(this.list.length == 0){
          this.show = true
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
  overflow-y: auto;
  background-color: #f4f4f4;
}
.word{
  text-align center
  margin-top 40%
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
</style>


