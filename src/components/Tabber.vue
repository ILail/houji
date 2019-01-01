<template>
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
</template>
<script type="text/javascript">
import Item from "./Item.vue";
export default {
  components: {
    Item
  },
  data: function() {
    return {
      tabbarDes: [
        {
          txt: "首页",
          page: "",
          normalImg: require("@/assets/foot/home.png"),
          activeImg: require("@/assets/foot/homes.png")
        },
        {
          txt: "分类",
          page: "fs",
          normalImg: require("@/assets/foot/fix.png"),
          activeImg: require("@/assets/foot/fixs.png")
        },
        {
          txt: "家长会",
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
      ]
    };
  },
  // 利用sessionStorage 储存点击的selected 刚刚开始判断一下
  // mounted() {
  //   if (sessionStorage.getItem("selected") == null) {
  //     this.selected = this.selected;
  //   } else {
  //     this.selected = sessionStorage.getItem("selected");
  //   }
  // },
  // methods: {
  //   getVal: function(res) {
  //     this.selected = res;
  //     console.log(res)
  //     sessionStorage.setItem("selected", this.selected);
  //   }
  // }
  methods:{
			getVal:function(res){
				this.selected = res;
			}
		}

};
</script>
<style type="text/css">
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
