<template>
  <div class="active">
    <div
      class="wrap"
      v-for="item in list"
      :key="item.id"
      @click="hit(item.account_id,item.addtime,item.amount_after_pay,item.change_type)"
    >
      <div class="wraps">
        <span ref="wraps">{{item.change_type}}</span>
        <span style="margin-top:3px">{{item.addtime}}</span>
      </div>
      <div v-show="same">+ {{item.amount_in}}</div>
      <div v-show="sames">- {{item.amount_out}}</div>
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
      same: false,
      sames: true
    };
  },
  created() {
    jiaoY()
      .then(res => {
        this.list = res.data.data;
        if (this.list.length == 0) {
          this.show = true;
          return false;
        }
        console.log(this.list[0]);
        this.list.forEach((item, index) => {
          if (item.change_type == "订单支持") {
            this.same = false;
            this.sames = true;
          } else {
            this.same = true;
            this.sames = false;
          }
          //1,2,3,4,5
        });
        // if (this.list[0].change_type == "订单支持") {
        //   this.same = false;
        //   this.sames = true;
        // } else {
        //   this.same = true;
        //   this.sames = false;
        // }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  updated() {
    // console.log(this.list);
    // if(this.$refs.wrapps[0].innerHTML.split('+')[1] == 0.00){
    //   console.log()
    // };
    // if (this.$refs.wrapps[0].innerHTML.split("+")[1] != 0.0) {
    //   this.same = true;
    // }
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
  display none 
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
</style>


