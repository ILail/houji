<template>
  <div>
    <div class="wrapword container">
      <span>
        <img src="@/assets/one.png">24小时监控
      </span>
      <span>
        <img src="@/assets/two.png">权威保障
      </span>
      <span>
        <img src="@/assets/three.png">假一赔十
      </span>
    </div>
    <img v-lazy="adInfo.ad_img" class="tImg" @click="imgJ">
    <home-people :larity="popuLarity"></home-people>
    <div style="background:#eee;height:10px"></div>
    <home-new :product="dayProduct"></home-new>
    <div style="background:#eee;height:10px"></div>
    <home-like :gass="gass"></home-like>
  </div>
</template>

<script>
import HomePeople from "./components/People";
import HomeNew from "./components/New";
import HomeLike from "./components/Like";
import { lookOption } from "@/components/axios/api";
import { gass } from "@/components/axios/api";
export default {
  name: "Home",
  components: {
    HomePeople,
    HomeNew,
    HomeLike
  },
  data() {
    return {
      popuLarity: [],
      dayProduct: [],
      gass: [],
      adInfo: ""
    };
  },
  created: function() {
    lookOption()
      .then(res => {
        res = res.data;

        if (res.status && res.data) {
          const data = res.data;
          this.adInfo = data.adInfo;
         
          this.popuLarity = data.popularity;
           console.log(this.popuLarity)
          this.dayProduct = data.dayProduct.slice(0,2);
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });

    gass()
      .then(res => {
        res = res.data;
        if (res.status && res.data) {
          const data = res.data;
          this.gass = data.result;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  },
  mounted() {

    // setTimeout(() => {
    //   this.$refs.wrapps.style.visibility = "visible";
    // }, 100);
  },
  methods: {
    imgJ() {
      this.$router.push({ path: "/linjuan" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.tImg {
  height:96.41px;
  width: 100%;
  margin-top: 10px;
}

.wrapword {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrapword span {
  font-size: 12px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(178, 24, 34, 1);
  line-height: 23px;
  display: flex;
  align-items: center;
}

.wrapword img {
  width: 10px;
  margin-right: 3px;
}
</style>
