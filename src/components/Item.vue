<template>
  <div class="itemWarp flex_mid" @click="changePage">
    <span v-show="!bol">
      <slot name="normalImg"></slot>
    </span>
    <span v-show="bol">
      <slot name="activeImg"></slot>
    </span>
    <span v-show="!bol">
      <span>{{txt}}</span>
    </span>
    <span v-show="bol">
      <span style="color:#D21623">{{txt}}</span>
    </span>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "Item",
  props: {
    txt: {
      type: String
    },
    page: {
      type: String
    },
    sel: {
      type: String
    }
  },
  computed: {
    bol: function() {
      if (this.sel == this.page) {
        return true;
      }
      return false;
    }
  },
  methods: {
    changePage: function() {
      console.log(this.page);
      this.$router.push("/" + this.page);
      this.$emit("change", this.page);
      let ua = navigator.userAgent.toLowerCase();
      //Android终端
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1;
      //Ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (this.page == "peos") {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          window.location =
            "https://itunes.apple.com/cn/app//id1438399174?mt=8";
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.location = "https://api.ngba.cn/download/houji.apk";
        }
      }
    }
  }
};
</script>
<style type="text/css">
.itemWarp {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.itemWarp span {
  font-size: 12px;
}
</style>
