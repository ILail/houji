<template>
  <div>
    <confir-header></confir-header>
    <confir-middle :moneyAll="moneyAll"></confir-middle>
    <confir-content :json="json"></confir-content>
    <confir-bottom :moneyAll="moneyAll"></confir-bottom>
  </div>
</template>

<script type="text/ecmascript-6">
import ConfirHeader from "./components/Header";
import ConfirMiddle from "./components/Price";
import ConfirContent from "./components/Content";
import ConfirBottom from "./components/Bottom";
import { Confirone } from "@/components/axios/api";

export default {
  name: "Confirmation",
  components: {
    ConfirHeader,
    ConfirMiddle,
    ConfirContent,
    ConfirBottom
  },
  data() {
    return {
      wishid: "",
      json: [],
      moneyAll: null
    };
  },
  created: function() {
    // 接受心愿单那边传来的商品id逗号分开
    let routerParams = this.$route.query.dataObj;
    this.wishid = routerParams.toString();
    // 发送请求
    Confirone(this.wishid, 222)
      .then(res => {
        this.json = res.data.data.wish_list.list;

        this.moneyAll = res.data.data.wish_list.total_money;
        console.log(this.moneyAll);
      })
      .catch(err => {
        console.log(err, "请求失败");
      });

    // 接受详情页
    // let routerParamsa = this.$route.query.dataObjo;
    // console.log(routerParamsa);
    // this.wishida = routerParamsa.toString();
    // // 发送请求
    // Confirone(this.wishida, 111)
    //   .then(res => {
    //     this.json = res.data.data.wish_list.list;

    //     this.moneyAll = res.data.data.wish_list.total_money;
    //     console.log(this.moneyAll);
    //   })
    //   .catch(err => {
    //     console.log(err, "请求失败");
    //   });
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
</style>
