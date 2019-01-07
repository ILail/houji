<template>
  <ul class="r-swiper-out" ref="swiperOut">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeItem: null
    };
  },
  methods: {
    changeActiveItem(item) {
      if (this.activeItem === item) return;
      if (this.activeItem && this.activeItem.close) {
        this.activeItem.close();
      }
      this.activeItem = item;
    },
    childRemove(childNode, childNodeid) {
      // var lit = document.getElementById(childNodeid);
      // let litLength = lit.parentNode.getElementsByClassName(
      //   "r-swiper-out-item item"
      // ).length;
      // console.log(
      //   this.$refs.swiperOut.childNodes[lit.parentNode.id].childNodes);
      // if (
      //   this.$refs.swiperOut.childNodes[lit.parentNode.id].childNodes.length ==
      //   3
      // ) {
        // this.$refs.swiperOut.childNodes[lit.parentNode.id].remove();
        // this.$refs.swiperOut.childNodes[lit.parentNode.id].style.display='none';
      // }
      // this.$refs.swiperOut.childNodes[lit.parentNode.id].removeChild(childNode);
      //  if (this.$refs.swiperOut.childNodes[lit.parentNode.id].length == 2) {
      //   console.log(121);
      // }
      this.$emit("onremove", childNode);
      // lit.removeChild(lit.childNodes[0]);
    }
  },
  created() {
    this.$on("changeActiveItem", this.changeActiveItem);
    this.$on("childRemove", this.childRemove);
  }
};
</script>

<style lang="scss">
.r-swiper-out {
  position: relative;
  width: 100%;
  overflow: hidden;
}
</style>
