<template>
  <div>
    <div class="header container">
      <div class="header-input">
        <form action="javascript:return true;">
          <input
            v-model.trim="keyword"
            @keypress="searchGoods"
            type="search"
            placeholder="请输入产品名称或关键字"
          >
        </form>
        <b :style="note"></b>
      </div>
      <!-- <router-link to="/"> -->
        <div class="name" @click="chanceS">取消</div>
      <!-- </router-link> -->
    </div>
    <!-- 错误页面 -->
    <div class="hitImg" style="border:none" v-show="ispic">
      <img src="@/assets/woring.png">
      <div class="contenr">空空如也，换个关键词试试吧！</div>
    </div>
    <!-- 图片页面 -->
    <search-detial v-show="islist" :listA="sowingMap"></search-detial>
    <!-- 搜索列表 -->
    <div class="searcCon container" v-show="iscontent">
      <ul>
        <li class="search-item" v-for=" item of sowingMap " :key="item.id" @click="rottera">
          <router-link
            :to="{  
        path: 'show',     
        query: {   
            key: item.crowd_funding_name, // orderNum : this.searchData.orderNo
        }
    }"
          style="line-height: 2.5;">{{item.crowd_funding_name}}</router-link>
        </li>
      </ul>
    </div>
    <!-- 历史搜索 -->
    <div v-show="isbottom">
      <div class="line"></div>
      <div class="hostory container" v-show="isShow">
        <div>
          <span class="suos">历史收索</span>
          <span style="float:right;color:#666666" @click="clickcourse()">清除</span>
        </div>
        <!-- 收索的记录 -->
        <div class="content" v-for=" item of list" :key="item.id">
          <ul>
            <li>
              <router-link
                :to="{  
        path: 'show',     
        query: {   
            key: item, // orderNum : this.searchData.orderNo
        }
    }"
              >{{item}}</router-link>
            </li>
          </ul>
        </div>
      </div>

      <div style="background:#eee;height:10px"></div>
      <div class="hotHis container">
        <div>
          <span class="suos">热门搜索</span>
        </div>
        <!-- 热门的记录 写死给链接跳转-->
        <div>
          <ul>
            <li v-for=" item of host" :key="item.id">
              <router-link
                :to="{  
        path: 'show',     
        query: {   
            key: item.name, // orderNum : this.searchData.orderNo
        }
    }"
              >{{item.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { search } from "@/components/axios/api";
import SearchDetial from "./components/Searchdetial";
export default {
  name: "Search",
  components: {
    SearchDetial
  },
  data() {
    return {
      note: {
        position: "absolute",
        top: "8.5px",
        left: "3%",
        width: "13px",
        height: "13px",
        backgroundImage: "url(" + require("@/assets/search.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      keyword: "",
      timer: null,
      list: [],
      isShow: false,
      isbottom: true,
      sowingMap: [],
      host: [
        {
          name: "蜜桔"
        },
        {
          name: "大米"
        },
        {
          name: "蔬菜"
        },
        {
          name: "肉"
        },
        {
          name: "蜂蜜"
        }
      ],
      // 错误图片
      ispic: false,
      // 图片样式
      islist: false,
      iscontent: false
    };
  },
  computed: {
    hasNoData() {
      return !this.sowingMap.length;
    }
  },
  // 监听input值的变化
  watch: {
    keyword() {
      this.islist = false;
      this.isbottom = false;
      this.iscontent = true;
      this.ispic = false;
      if (!this.keyword) {
        this.sowingMap = [];
        return;
      }
      // this.timer = setTimeout(() => {
      this.created();
      // }, 100);
    }
  },
  mounted() {
    var l = JSON.parse(localStorage.getItem("list") || "[]");
    if (l.length == 0) {
      this.isShow = false;
    } else {
      this.isShow = true;
      this.list = l;
    }
  },
  methods: {
    rottera(){
        this.list.push(this.keyword);
        var r = this.list.filter(function(s) {
          return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        localStorage.setItem("list", JSON.stringify(r));
    },
    created() {
      search(this.keyword)
        .then(res => {
          res = res.data;
          if (res.status && res.data) {
            const data = res.data;
            this.sowingMap = data.result;
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    searchGoods(event) {
      if (event.keyCode == 13) {
        if (this.sowingMap.length == 0) {
          this.ispic = true;
          this.isShow = false
        }
        //台式电脑键盘的enter
        this.islist = true;
        this.iscontent = false;
        event.preventDefault(); //禁止默认事件（默认是换行）
        this.list.push(event.target.value);
        var r = this.list.filter(function(s) {
          return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        localStorage.setItem("list", JSON.stringify(r));
      }
    },
    // 清除缓存 刷新页面
    clickcourse() {
      this.isShow=false
      window.localStorage.clear()
      // window.localStorage.removeItem('list')
    },
    chanceS(){
      this.$router.go(-1);
    }
    // handleCityClick(res) {

    //   this.keyword = res;
    //   this.isbottom = false;
    // }
  }
};
</script>
<style lang="stylus" scoped>
.header {
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  margin-top: 10px;
}

.header-input {
  width: 87%;
}

.searcCon ul {
  margin-top: 10px;
}

.searcCon ul li {
  border-bottom: 1px solid #eeeeee;
  color: #999;
  margin-bottom: 10spx;
  padding-bottom: 5px;
  padding-top: 5px;
}

.header-input input {
  height: 30px;
  line-height: 30px;
  padding-left: 9%;
  width: 100%;
  background: rgba(237, 237, 237, 1);
  border-radius: 6px;
}

.header .name {
  font-size: 13px;
  color: #999999;
}

.header-input input {
  color: #999;
}

.header-input input::-webkit-input-placeholder {
  color: #999;
  font-size: 13px;
}

.line {
  background: #eee;
  height: 1px;
  margin-top: 10px;
}

.hostory .content {
  margin-top: 10px;
}

.hostory .content ul li {
  float: left;
  border: 1px solid rgba(102, 102, 102, 1);
  border-radius: 5px;
  padding: 5px;
  margin-right: 2%;
  margin-bottom: 5px;
}

.hostory, .hotHis {
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 15px;
}

.suos {
  color: #000000;
  font-size: 14px;
}

.hotHis ul {
  margin-top: 10px;
}

.hotHis ul li {
  float: left;
  border: 1px solid rgba(102, 102, 102, 1);
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  margin-right: 2%;
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


