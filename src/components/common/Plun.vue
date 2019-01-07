<template>
  <div class="container">
    <div class="title">
      <span
        v-for="(item,index) in navList"
        :key="item.id"
        :class="{'active': nowIndex===index}"
        @click="handClick(index)"
      >{{item.name}}</span>
    </div>
    <div>
      <form action="javascript:return true;">
        <input
          type="text"
          placeholder="点击评论..."
          @keypress="searchGoods"
          class="pluna"
          v-model="value"
        >
      </form>
    </div>
    <!-- 评论内容 -->
    <div
      class="content"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd()"
      id="page"
    >
      <div
        class="level has-text-centered"
        v-show="isLoadMoreShow"
        style="margin:10px 2px 0 2px;background-color:white;"
      >{{loadWords}}</div>
      <div class="peosCon" v-for="(item,index) in list" :key="index" :id="item.id">
        <div class="left">
          <img :src="item.headimages">
        </div>
        <div class="right">
          <div class="word" style="color:#E88A25">{{item.username}}</div>
          <div class="wordC">{{item.content}}</div>
          <div class="childC" v-for="(pl,index) in list[index].option" :key="index">
            <!-- 二级评论数组套数组 -->
            <div class="childCa" v-for="(pla,index) in pl" :key="index">
              <span class="plaW">{{pla.username}}:</span>
              <span class="plad">{{pla.content}}</span>
            </div>
          </div>
          <div class="number">
            <div>{{item.addtime}}</div>

            <div class="pl">
              <img :src="require('@/assets/pl.png')">
            </div>
          </div>
        </div>
      </div>
      <div class="has-text-centered" v-show="loadding">正在加载中状态...</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { plun } from "@/components/axios/api";
import { plunPush } from "@/components/axios/api";
import Vue from "vue";
export default {
  data() {
    return {
      navList: [{ name: "全部消息" }, { name: "我的互动" }],
      nowIndex: 0,
      list: [],
      istext: false,
      value: "",

      top: 0,
      state: 0,
      startY: 0, //保存开始滑动时，y轴位置
      touching: false,
      isLoadMoreShow: false,
      loadWords: "松开刷新页面",
      loadding: false
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    searchGoods(event) {
      this.id = this.$route.query.key;
      if (event.keyCode == 13) {
        let word = this.value.replace(/[^\w\u4E00-\u9FA5]/g, "");
        if (word) {
          plunPush(this.id, this.value)
            .then(res => {
              this.value = "";212
              this.refresh();

              if (res.config.headers.token == "") {
                this.$router.push({ path: "/phone" });
              }
              alert("评论成功");
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
        }
      }
    },
    handClick(index) {
      this.nowIndex = index;
    },
    // 触摸开始（手指放在触摸屏上）
    touchStart: function(e) {},
    // 绑定touchmove （手指拖动）
    touchMove: function(e) {},
    // 绑定touchend 触摸结束（手指从触摸屏上移开）
    touchEnd: function() {},
    // 后台请求数据
    refresh: function() {
      this.id = this.$route.query.key; //获取上个页面传递的id,在下面获取数据的时候先提交id
      plun(this.id)
        .then(res => {
          this.list = res.data.data;
          console.log(this.list);
          // Vue.set(this.list);
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
.plaW {
  color: #0072D2;
  font-size: 13px;
}

.childCa {
  display: flex;
  align-items: center;
}

.plad {
  margin: -2px 0 0 5px;
}

.childC {
  background: rgba(247, 247, 247, 1);
  padding: 10px;
  margin-top: 10px;
}

.title {
  text-align: center;
  margin-top: 62px;
}

.title span {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  border: 1px solid rgba(102, 102, 102, 1);
  border-radius: 11px;
  padding: 3px 18px;
}

.title span:nth-child(2) {
  margin-left: 10px;
}

.title .active {
  background: #D21623;
  color: #fff;
  border: none;
  border-radius: 11px;
  padding: 3px 18px;
  border: 1px solid #D21623;
}

.pluna {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: rgba(247, 247, 247, 1);
  border: 1px solid rgba(153, 153, 153, 1);
  border-radius: 4px;
  margin-top: 20px;
}

.pluna::-webkit-input-placeholder {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding: 0 0 0 10px;
}

.content {
  margin-top: 20px;
}

.peosCon {
  overflow: hidden;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
}

.left img {
  width: 100%;
}

.left {
  width: 12%;
}

.right {
  width: 86%;
}

.right .word {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.right .wordC {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 10px;
  width: 100%;
  line-height: 1.2;
}

.number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  border-bottom: 1px solid #CCCCCC;
  padding-bottom: 10px;
}

.pl img {
  width: 16px;
}
</style>
