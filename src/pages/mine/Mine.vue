<template>
  <div>
    <mine-header></mine-header>
    <mine-order></mine-order>
    <div style="background:#eee;height:10px"></div>
    <mine-severs></mine-severs>
    <div style="background:#eee;height:10px"></div>
    <mine-foryou :like = "list"></mine-foryou>
    <div class="tabberWarp">
      <div class="warp">
        <Item
          :txt="item.txt"
          :page="item.page"
          v-on:change="getVal"
          v-for="item in tabbarDes"
          :sel="selected"
          :key="item.id"
        >
          <img :src="item.normalImg" slot="normalImg">
          <img :src="item.activeImg" slot="activeImg">
        </Item>
      </div>
    </div>
  </div>
</template>

<script>
import MineHeader from "./components/Header";
import MineOrder from "./components/Order";
import MineSevers from "./components/Severs";
import MineForyou from "./components/Foryou";
import Item from "@/components/Item.vue";
import { foryou } from "@/components/axios/api";
export default {
  name: "Mine",
  components: {
    MineHeader,
    MineOrder,
    MineSevers,
    MineForyou,
    Item
  },
  data() {
    return {
      selected: "mines",
      tabbarDes: [
        {
          txt: "首页",
          page: "",
          normalImg: require("@/assets/foot/home.png"),
          activeImg: require("@/assets/foot/homes.png")
        },
        {
          txt: "分类",
          page: "feilei",
          normalImg: require("@/assets/foot/fix.png"),
          activeImg: require("@/assets/foot/fixs.png")
        },
        {
          txt: "花果山",
          page: "peos",
          normalImg: require("@/assets/foot/peos.png"),
          activeImg: require("@/assets/foot/peoss.png")
        },
        {
          txt: "心愿单",
          page: "wishs",
          normalImg: require("@/assets/foot/wish.png"),
          activeImg: require("@/assets/foot/wishs.png")
        },
        {
          txt: "我的",
          page: "mines",
          normalImg: require("@/assets/foot/mine.png"),
          activeImg: require("@/assets/foot/mines.png")
        }
      ],
      list:[]
    };
  },
  created() {
    foryou()
      .then(res => {
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;
          this.list = data.data;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  methods: {
    getVal: function(res) {
      this.selected = res;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
// 底部
.warp {
  width: 100%;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0;
}

.warp img {
  width: 20px;
  height: 20px;
}

.tabberWarp img {
  margin-top: 10px;
  margin-bottom: 5px;
}

.tabberWarp {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 5px;
  background: #fff;
  z-index: 9999;
}

.active span {
  color: #d21623;
}
</style>
