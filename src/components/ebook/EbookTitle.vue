<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    back() {
      this.$router.go(-1) // 返回上一級
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global';
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 210;
  display: flex;
  width: 100%;
  height: px2rem(96);
  background: white;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(40);
  .left {
    flex: 0 0 px2rem(60);
    //global里面的center，使左侧居中
    @include center;
    margin-left: px2rem(30);
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(80);
      @include center;
      .icon-shelf {
        font-size: px2rem(44);
      }
      .icon-cart {
        font-size: px2rem(44);
      }
    }
  }
}
</style>
