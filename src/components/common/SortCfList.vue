<template>
  <div class="wrap">
    <div v-wechat-title="title"></div>
    <van-tabs v-model="active" swipeable sticky animated @change="changeHandle">
      <van-tab v-for="(item) in tabs" :key="item.id">
        <div slot="title">{{item.sort_name}}</div>
        <!-- 下面内容 -->
        <!-- <div class="wrapS">
          <div class="wrapC" v-for="(item) in cons" :key="item.id">
            <div>
              <img :src="item.pic" class="wrapSimg">
            </div>
          </div>
        </div>-->
        <div class="hitImg" v-show="ispic">
          <img src="@/assets/woring.png">
          <div class="contenr">敬请期待</div>
        </div>
        <ul class="clearfloat">
          <li v-for="(item) in cons" :key="item.id" @click="DEtails(item.crowd_funding_id)">
            <div class="box">
              <div class="img">
                <span class="padding_img">
                  <img :src="item.pic">
                </span>
              </div>

              <div class="progressAll">
                <div class="progress-outer">
                  <span class="progress" :style="{width:computedResidualTimea(item)+'%'}"></span>
                </div>
                <span class="progressA">{{item.progress}}%</span>
              </div>
              <div class="fundingName">{{item.crowd_funding_name}}</div>
              <div class="price">
                <span>¥{{item.price}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div></div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { crowdFundingClass } from "@/components/axios/api";


export default {
  data() {
    return {
      crowd_funding_class_id: this.$route.query.crowd_funding_class_id,
      crowd_funding_sort_id: this.$route.query.crowd_funding_sort_id,
      active: this.$route.query.index,
      page: 1,
      tabs: [],
      cons: [],
      ispic: false,
      title: ""
    };
  },
  created() {
    this.refrech();
    // crowdFundingClass(
    //   this.crowd_funding_sort_id,
    //   this.crowd_funding_class_id,
    //   this.page
    // )
    //   .then(res => {
    //     if (res.status && res.data) {
    //       const data = res.data.data;
    //       console.log(data);
    //       this.tabs = data.sort_list;
    //       this.cons = data.cf_sort_list.data;
    //     }
    //     if (this.cons.length == 0) {
    //       // console.log(123455);
    //       this.ispic = true;
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err, "请求失败");

    //   });
  },
  methods: {
    changeHandle() {
      if (this.cons.length == 0) {
        this.ispic = false;
      }
      const Tvu = this.tabs[this.active];
      this.title = Tvu.sort_name;
      const crowd_funding_class_id = Tvu.crowd_funding_class_id;
      const crowd_funding_sort_id = Tvu.crowd_funding_sort_id;
      this.crowd_funding_class_id = crowd_funding_class_id;
      this.crowd_funding_sort_id = crowd_funding_sort_id;
      this.refrech();
    },
    mounted() {},
    refrech() {
      crowdFundingClass(
        this.crowd_funding_sort_id,
        this.crowd_funding_class_id,
        this.page
      )
        .then(res => {
          if (res.status && res.data) {
            const data = res.data.data;
            // console.log(data);
            this.tabs = data.sort_list;

            this.cons = data.cf_sort_list.data;
          }
          this.$nextTick(() => {
            this.title = this.tabs[this.active].sort_name;
          });
          if (this.cons.length == 0) {
            // console.log(123455);
            this.ispic = true;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    DEtails(id) {
      this.$router.push({
        path: "/Detail",
        query: {
          key: id
        }
      });
    },
    computedResidualTimea: function(itemCon) {
      let progress = itemCon.progress;
      if (progress >= 100) {
        progress = 100;
      }
      return `${progress}`;
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  width: 85%;
  margin: 0 auto;
  position: relative;
}

.clearfloat {
  margin-top: 15px;
}

.wrap li {
  float: left;
  width: 50%;
}

.wrap >>> .van-tab {
  color: #333;
}

.wrap >>> .van-tab--active {
  color: #D21623;
}

.wrap >>> .van-tabs__line {
  background-color: #D21623;
  height: 2px;
}

.wrapS {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.3rem;
  padding: 0 0.1rem;
}

.wrapC {
  width: 46%;
  margin-bottom: 0.3rem;
}

.wrapSimg {
  max-width: 100%;
  height: 175px;
  flex-shrink: 0;
}

.progressAll {
  position: relative;
}

.progressA {
  font-size: 12px;
  color: #887D5F;
  position: absolute;
  right: 0;
  top: 1px;
}

.progress-outer {
  height: 15px;
  position: relative;
  background-color: #F3F3F3;
}

.progress-outer .progress {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #DED2B2;
}

.fundingName {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 0;
}

.price {
  font-size: 16px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(210, 22, 35, 1);
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


