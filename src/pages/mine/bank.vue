<template>
  <div class="active">
    <div style="background:#fff">
      <div class="wrap" @click="wrapIn">
        <div class="wrapc">
          <span>银行名称</span>
          
          <input type="text" placeholder="选择银行" class="sames" v-model="one">
        </div>
        <img :src="img" alt>
      </div>

      <div class="next">
        <span>开户行名称</span>
        <input type="text" placeholder="请输入开户行名称" v-model="two">
      </div>

      <div class="next">
        <span>银行卡卡号</span>
        <input type="tel" placeholder="请输入卡号" v-model="three">
      </div>

      <div class="next">
        <span>持卡人姓名</span>
        <input type="text" placeholder="请输入姓名" v-model="four">
      </div>
    </div>

    <div class="action" @click="enter">确认</div>

    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import { Picker } from "vant";

import Bus from "@/bus/Bus.vue";
import { getBank } from "@/components/axios/api";
import { Popup } from "vant";
Vue.use(Picker);
Vue.use(Popup);

import { putBank } from "@/components/axios/api";
export default {
  data() {
    return {
      img: require("@/assets/rr.png"),
      list: [],
      show: false,
      columns: [],
      one: "",
      two: "",
      three: "",
      four: "",
      id: null
    };
  },
  created() {
    getBank()
      .then(res => {
        const array = [];
        for (let i in res.data.data) {
          array.push(res.data.data[i]); //属性
        }
        console.log(array);
        this.columns = array;
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    onConfirm(value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.one = value;
      this.show = false;
      switch (index) {
        case 0:
          this.id = 1;
          break;
        case 1:
          this.id = 2;
          break;
        case 2:
          this.id = 3;
          break;
        case 3:
          this.id = 4;
          break;
        case 4:
          this.id = 5;
          break;
        case 5:
          this.id = 10;
          break;
        case 6:
          this.id = 22;
          break;
      }
    },
    onCancel() {
      // Toast("取消");
      this.show = false;
    },
    wrapIn() {
      this.show = true;
    },
    enter() {
      putBank(this.id, this.three, this.four, this.two)
        .then(res => {
          // alert("绑定成功");
        })
        .catch(err => {
          alert("绑定失败重新填写");
          console.log(err, "请求失败");
        });
      this.$router.push({
        path: "/tixian",
        query: {
          dataObjo: this.one,
          dataObjb: this.three
        }
      });
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.sames {
  margin-top: 2px;
  margin-left: 45px;
}

.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
}

.wrapc {
  display: flex;
  align-items: center;
}

.wrapc span {
  margin-right: 5px;
  margin-top: 2px;
}

.heard {
  text-align: center;
  overflow: hidden;
}

.heardone {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 50px;
}

.heardtwo {
  font-size: 24px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 10px;
}

.next {
  padding: 12px 3% 12px 3%;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.next input {
  margin-left: 35px;
}

.next span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 3% 15px 3%;
  border-bottom: 1px solid #eee;
}

.wrap span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wrap img {
  width: 10px;
}

.action {
  text-align: center;
  line-height: 50px;
  height: 50px;
  background: rgba(210, 22, 35, 1);
  border-radius: 5px;
  font-size: 15px;
  color: #fff;
  margin-top: 30px;
  width: 94%;
  margin-left: 3%;
}
</style>

