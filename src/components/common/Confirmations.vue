<template>
  <div>
    <confir-header></confir-header>
    <confir-middle :moneyAll="moneyAll" v-if="moneyAll"></confir-middle>
    <confir-content :json="json"></confir-content>
    <confir-bottom :moneyAll="moneyAll" v-if="moneyAll"></confir-bottom>
  </div>
</template>

<script type="text/ecmascript-6">
import ConfirHeader from "./components/Header";
import ConfirMiddle from "./components/Price";
import ConfirContent from "./components/Content";
import ConfirBottom from "./components/Bottom";
import { Confirtwo } from "@/components/axios/api";
export default {
  name: "Confirmations",
  components: {
    ConfirHeader,
    ConfirMiddle,
    ConfirContent,
    ConfirBottom
  },
  data() {
    return {
      json: [],
      moneyAll: null
    };
  },
  created: function() {
    // 接受心愿单那边传来的商品id逗号分开
    let routerParams = this.$route.query.dataObjo;
    let routerParamb = this.$route.query.dataObjb;
    let routerParamo = this.$route.query.dataObjc;
    // 发送请求
    Confirtwo(routerParams, routerParamb, routerParamo, 111)
      .then(res => {
      
        this.json = res.data.data.wish_list.list;

        this.moneyAll = res.data.data.wish_list.total_money;
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
</style>
