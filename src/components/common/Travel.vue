<template>
  <div>
    <div class="peoDela">
      <img :src="imgA" alt="">
    </div>
    <div class="hitImg"  v-show="ispic">
      <img src="@/assets/woring.png">
      <div class="contenr">游记正在更新，静请期待！</div>
    </div>
  </div>
</template>
<script>
import { Travels } from "@/components/axios/api";
export default {
  data() {
    return {
      ispic: false,
      imgA:""
    };
  },
  created() {
    this.id = this.$route.query.key; //获取上个页面传递的id,在下面获取数据的时候先提交id
    Travels(this.id)
      .then(res => {
        // console.log(res.data.data)
        this.imgA = res.data.data
        if (res.data.data.length == 0) {
          this.ispic = true;
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.peoDela img {
  width: 100%;
  margin-top: 22px;
  padding-bottom: 20px;
  margin-top 50px
}

.hitImg {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.hitImg img {
  width: 50%;
  margin-top: 20%;
}

.hitImg .contenr {
  margin-top: 5px;
  color: #999;
}
</style>


