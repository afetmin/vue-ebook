<template>
  <div class="m-tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'm-tabbar',
    props: ['value']
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global";

  .m-tabbar {
    flex: 1;
    flex-direction: row;
    position: relative;
    width: 25%;
    height: px2rem(100);
    overflow: hidden;
    background: #fff;
    border-top: px2rem(2) solid #e4e4e4;
    box-sizing: border-box;
    @include center;
  }
</style>
