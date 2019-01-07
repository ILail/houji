<template>
  <div class="active">
    <div class="smal">
      <div class="cont">
        <input type="text" placeholder="姓名" class="inputaa" v-model="names">
      </div>
      <div class="cont">
        <input type="text" placeholder="手机号码" class="inputaa" v-model="phone">
      </div>
      <div class="contS">
        <input type="text" @click="hitShow" placeholder="收货地址" v-model="message">
        <van-popup v-model="show" position="bottom" @click-overlay="Ooverlay">
          <van-area
            :area-list="areaList"
            :columns-num="3"
            title="选址"
            @cancel="onCancel"
            @confirm="onConfirm"
            @change="onChange"
          />
        </van-popup>
        <span>
          <img :src="img" class="contimg">
        </span>
      </div>
      <div class="contB">
        <textarea class="wordAll" v-model="address" placeholder="街道、小区门牌等详细地址"></textarea>
      </div>
    </div>
    <div class="baocun" @click="bnaoc">保存</div>
  </div>
</template>
<script>
import Vue from "vue";
import areaList from "moon/area.js";
// import { getnewAddress } from "@/components/axios/api";
import { newAddress } from "@/components/axios/api";
import { Area } from "vant";
import { Popup } from "vant";

Vue.use(Popup);
Vue.use(Area);
export default {
  name: "Desgreo",
  data() {
    return {
      img: require("@/assets/rr.png"),
      show: false,
      areaList: {},
      message: "",
      names: "",
      phone: "",
      address: "",
      idone: "",
      idtwo: "",
      idthress: "",
      wordA: "",
      cityoL: "",
      cityoM: "",
      cityoN: ""
    };
  },
  // created: function() {
  //   getnewAddress()
  //     .then(res => {
  //       this.list = res.data.data.province_list;
  //       console.log(this.list);
  //     })
  //     .catch(err => {
  //       console.log(err, "请求失败");
  //     });
  // },
  methods: {
    hitShow() {
      this.areaList = areaList;
      this.show = true;
    },
    onChange(picker, value, index) {
      // console.log(value);
    },
    Ooverlay() {
      this.show = false;
      // this.$refs.sames.$el.style.display = "none";
    },
    onCancel() {
      this.show = false;
    },
    onConfirm(picker) {
      this.show = false;
      // console.log(picker);
      const a = picker[0].code;
      const b = picker[1].code;
      const c = picker[2].code;

      const a1 = picker[0].name;
      const b2 = picker[1].name;
      const c3 = picker[2].name;
      // console.log(a, b, c);
      this.idone = a;
      this.idtwo = b;
      this.idthress = c;
      this.cityoL = a1;
      this.cityoM = b2;
      this.cityoN = c3;
      const resule = [];

      resule.push(a1, b2, c3);
      const str = resule.join("");
      this.message = str;
    },
    bnaoc() {
      const arryS = [];
      arryS.push(this.cityoL, this.cityoM, this.cityoN, this.address);
      const strs = arryS.join("");

      this.wordA = strs;
      console.log(this.idone, this.idtwo, this.idthress, this.wordA);
      if (
        this.names == "" ||
        this.idone == "" ||
        this.idtwo == "" ||
        this.idthress == "" ||
        this.wordA == ""
      ) {
        alert("请正确输入");
      } else {
        newAddress(
          this.names,
          this.phone,
          this.idone,
          this.idtwo,
          this.idthress,
          this.wordA
        )
          .then(res => {
            console.log(res.data.data);
            if (res.data.data.length == "0") {
              alert("提交成功");
            }
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
      }
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.contS input {
  width: 80%;
  font-size: 14px;
}

.contS input::-webkit-input-placeholder {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.wordAll::-webkit-input-placeholder {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
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

.word {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333333;
  margin-top: 2px;
}

.yanz {
  margin-top: 2px;
  color: rgba(210, 22, 35, 1);
}

.smal {
  background: #ffffff;
}

.cont {
  display: flex;
  align-items: center;
  padding: 10px 2% 10px 2%;
  line-height: 25px;
  border-bottom: 1px solid #eee;
}

.contimg {
  width: 10px;
}

.contS {
  display: flex;
  align-items: center;
  padding: 10px 2% 10px 2%;
  line-height: 25px;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}

.baocun {
  height: 50px;
  background: rgba(210, 22, 35, 1);
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  line-height: 50px;
  text-align: center;
  width: 96%;
  margin-left: 2%;
  margin-top: 20px;
}

.contB {
  height: 90px;
  padding: 10px 2% 10px 2%;
}

.wordAll {
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.inputaa {
  line-height: 1.2;
}

.inputaa::-webkit-input-placeholder {
  color: #333;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}
</style>
