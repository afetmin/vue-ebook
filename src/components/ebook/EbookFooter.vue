<template>
  <div class="ebook-footer">
    <span class="ebook-footer-text">{{this.progress + '%'}}</span>
    <!-- <span class="ebook-footer-text">{{this.paginate}}</span> -->
  </div>
</template>

<script>
  import { ebookMixin } from '@/utils/mixin'

  export default {
    mixins: [ebookMixin]
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global";

  .ebook-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(96);
    padding: 0 px2rem(30);
    box-sizing: border-box;
    @include right;
    .ebook-footer-text {
      font-size: px2rem(12);
      color: #6d7178;
    }
  }
</style>
