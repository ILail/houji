<template>
  <li class="r-swiper-out-item" :style="itemStyle">
    <div
      class="r-swiper-out-item-content"
      ref="content"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    >
      <slot></slot>
    </div>
    <div class="r-swiper-out-item-btns" ref="btns">
      <slot name="btns">
        <div class="r-swiper-out-item-btn" @click="delItem">删除</div>
      </slot>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      speed: 300,
      startX: 0,
      translateX: 0,
      oldPoint: null,
      btnsWidth: 0
    };
  },
  computed: {
    itemStyle() {
      return {
        transform: `translate3d(${this.translateX}px, 0, 0)`,
        transition: `all ${this.speed}ms`
      };
    }
  },
  methods: {
    touchstart(e) {
      this.oldPoint = e.touches[0];
      this.speed = 0;
      this.startX = this.translateX;
    },
    touchmove(e) {
      let moveX = e.touches[0].pageX - this.oldPoint.pageX;
      let moveY = e.touches[0].pageY - this.oldPoint.pageY;
      if (
        Math.abs(moveX) < Math.abs(moveY) ||
        Math.abs(moveX) < 20 ||
        Math.abs(moveY) > 30
      )
        return;

      e.preventDefault();
      // console.log( this.$parent)
      this.$parent.$emit("changeActiveItem", this);
      moveX = this.startX * 1 + moveX * 1;

      if (moveX < -this.btnsWidth) {
        moveX = -this.btnsWidth;
      } else if (moveX > 0) {
        moveX = 0;
      }

      this.translateX = moveX;
    },
    touchend(e) {
      let moveX = -this.translateX > 30 ? -this.btnsWidth : 0;
      this.speed = 300;
      this.translateX = moveX;
    },
    close() {
      this.translateX = 0;
    },
    delItem() {
      this.$parent.$emit("childRemove", this.$el,this.$el.id);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.btnsWidth = this.$refs.btns.offsetWidth;
    });
  }
};
</script>

<style lang="scss">
.r-swiper-out-item {
  position: relative;
  &-btns {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    transform: translateX(100%);
    -webkit-overflow-scrolling: touch;
  }
  &-btn {
    background-color: #d21623;
    color: #fff;
    width: 100px;
    text-align: center;
    height: 100%;
    line-height: 88px;
    font-size: 14px
  }
}
</style>
