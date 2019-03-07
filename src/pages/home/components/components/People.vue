<template>
  <div class="contentNav">
    <ul>
      <li v-for=" (item,index) in larity" :key="item.id" @click="linkAll(index)">
        <!-- <router-link
            :to="{  
        path: 'feilei',     
        query: {   
            num:index,// orderNum : this.searchData.orderNo
        }
    }"
        >-->
        <img v-lazy="item.icon">
        <span>{{item.class_name}}</span>
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "HomePeople",
  props: {
    larity: Array
  },
  data() {
    return {
      imgObj: {
        error: "@/assets/err2.png",
        loading: "@/assets/err2.png"
      }
    };
  },
  methods: {
    linkAll(active) {
      this.$router.push({
        path: "/feilei"
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.contentNav{
  height 184px
}
.contentNav img {
  width: 50px;
  height 50px;
  border-radius 50%
}

.contentNav span {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333;
  margin-top: 10px;
}

.contentNav ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.contentNav ul li {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}
</style>



