<template>
  <div>
    <div v-if="show" class="wordss">暂时无优惠卷</div>
    <div class="container heards" ref="refContentss">
      <div class="wrap" v-for="(item , index) in list" :key="item.id">
        <div :style="note" class="content">全场卷</div>
        <div class="left">
          <div class="youhui">全场满{{item.amount_limit}}减{{item.num}}</div>
          <div class="time">
            <span>有效期 :</span>
            <span>{{item.start_time | formatDate}}-{{item.end_time | formatDate}}</span>
          </div>
          <div class="progressAll">
            <div class="progress-outer">
              <span class="progress" :style="{width:item.alr_port+'%'}"></span>
            </div>
          </div>
          <div class="bottom">
            <span class="same">{{item.alr_port}}%</span>
            <span class="same" ref="refContent">未抢</span>
            <span class="sames" @click="hit(index,item.vouchers_id)" ref="refContents">立即领取</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { juanYOU } from "@/components/axios/api";

import { hitLq } from "@/components/axios/api";
export default {
  filters: {
    formatDate: function(value) {
      value *= 1000;
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + MM + "-" + d;
    }
  },
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("@/assets/linjuan/2.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        width: 75 + "px",
        height: 47 + "px"
      },
      list: [],
      show:false
    };
  },

  // computed: {
  //   imgSrc() {
  //     return this.content[this.index];
  //   },
  //   imgSrcs() {
  //     return this.words[this.index];
  //   }
  // },
  created() {
    juanYOU()
      .then(res => {
        this.list = res.data.data.data;
        if (this.list.length == 0) {
          this.show = true
        }
      })
      .catch(err => {
        console.log(err, "请求失败");
      });
   
  },
  methods: {
    hit(index, id) {
      this.$refs.refContent[index].innerHTML = "已抢";
      this.$refs.refContents[index].innerHTML = "已领取";
      hitLq(id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.wordss{
  font-size 14px
  margin-top 180px
  margin-left 40%
}
.heards {
  padding: 15px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.wrap {
  height: 120px;
  background: linear-gradient(90deg, rgba(218, 66, 76, 1) 0%, rgba(223, 87, 96, 1) 100%);
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 8.5%;
  margin-bottom: 20px;
}

.content {
  text-align: center;
  line-height: 47px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(161, 44, 44, 1);
}

.progressAll {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progressA {
  font-size: 12px;
  color: #D21623;
}

.progress-outer {
  width: 93%;
  height: 0.04rem;
  position: relative;
  background-color: #FEBDC3;
  border-radius: 5px;
}

.progress-outer .progress {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  background: #BB040E;
}

.youhui {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.time {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 10px 0;
}

.time span {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  font-size: 12px;
  transform: scale(0.83);
  transform-origin: 0% 0%;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.same {
  font-size: 12px;
  font-family: ChalkboardSE-Regular;
  font-weight: 400;
  transform: scale(0.83);
  display: inline-block;
  color: rgba(255, 255, 255, 1);
}

.sames {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(161, 44, 44, 1);
  background: #fff;
  padding: 5px 10px;
  margin-top: 10px;
}

.left {
  margin-left: 8.5%;
}
</style>
