<template>
  <div class="wrap">
    <router-link to="/search">
      <div class="header-input">
        <span class="middle">
          <img src="@/assets/search.png" style="vertical-align: sub;margin-right:4px;width:.28rem">
        </span>
        <input placeholder="输入关键字" class="input">
      </div>
    </router-link>
    <div class="wrapC">
      <div class="left">
        <div
          v-for="(item,index) in tabs"
          :key="item.id"
          :class="{active:index == num}"
          @click="tab(index)"
        >{{item.class_name}}</div>
      </div>
      <div class="right">
        <img :src="img_path" class="titleImg">
        <ul>
          <li
            v-for="(item,index) in options"
            :key="item.id"
            @click="sortClist(item.crowd_funding_class_id,item.crowd_funding_sort_id,index)"
          >
            <img :src="item.icon" class="titleIcon">
            <span>{{item.sort_name}}</span>
          </li>
        </ul>
      </div>
    </div>

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
import Item from "@/components/Item.vue";
import { fs } from "@/components/axios/api";
export default {
  name: "Classify",
  components: {
    Item
  },
  data() {
    return {
      tabs: [],
      num: 0,
      img_path: "",
      options: [],

      selected: "Classify",
      tabbarDes: [
        {
          txt: "首页",
          page: "",
          normalImg: require("@/assets/foot/home.png"),
          activeImg: require("@/assets/foot/homes.png")
        },
        {
          txt: "分类",
          page: "Classify",
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
      ]
    };
  },
  created() {
    fs()
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          this.tabs = res.data;
          console.log(this.tabs);
          this.img_path = this.tabs[0].img_path;
          this.options = this.tabs[0].options;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {
    this.$toast({
      message: "加载中...",
      duration: "1200",
      type: "loading"
    });
  },
  methods: {
    getVal(res) {
      this.selected = res;
    },
    tab(index) {
      console.log(index);
      this.num = index;
      this.img_path = this.tabs[index].img_path;
      this.options = this.tabs[index].options;
    },
    sortClist(crowd_funding_class_id, crowd_funding_sort_id, index) {
      this.$router.push({
        path: "/sortCfList",
        query: {
          crowd_funding_sort_id,
          crowd_funding_class_id,
          index
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;
}

.wrap {
  .header-input {
    flex: 1;
    font-size: 13px;
    position: relative;
    color: #999;

    .input {
      line-height: 0.6rem;
      margin-top: 0.2rem;
      width: 94%;
      margin-left: 3%;
      border-radius: 0.1rem;
      background: #EDEDED;
      text-align: center;
    }

    .middle {
      position: absolute;
      left: 35%;
      top: 0.34rem;
    }
  }
}

.wrapC {
  margin-top: 0.2rem;
  height: 90%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  overflow: hidden;
}

.left {
  width: 28%;
  text-align: center;
  padding-top: 0.3rem;
  border-right: 1px solid #eee;
}

.left div {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333;
  margin-bottom: 0.6rem;
}

.right {
  width: 72%;
  padding: 0.3rem;
}

.right ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0;
}

.right ul li {
  width: 33.33%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.right span {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.5rem;
}

.titleIcon {
  width: 49px;
  height: 49px;
  border-radius: 50%;
}

.titleImg {
  width: 100%;
}

.left .active {
  color: #AF2630;
  border-left: 2px solid #AF2630;
  font-size: 14px;
}

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


