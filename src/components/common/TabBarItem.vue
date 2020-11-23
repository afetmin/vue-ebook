<template>
  <div class="m-tabbar-item-wrapper">
    <a
      class="m-tabbar-item"
      :class="{ 'is-active': isActive }"
      @click.stop="goto(data.id, data.link)"
    >
      <span class="m-tabbar-item-icon" v-show="!isActive"
        ><slot name="icon-normal"></slot
      ></span>
      <span class="m-tabbar-item-icon" v-show="isActive"
        ><slot name="icon-active"></slot
      ></span>
      <span class="m-tabbar-item-text"><slot></slot></span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  computed: {
    isActive() {
      if (this.$parent.value === this.data.id) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    goto(id, link) {
      this.$parent.$emit('input', id)
      this.$parent.$emit('select', id)
      this.$router.push(link)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.m-tabbar-item-wrapper {
  .m-tabbar-item {
    height: 100%;
    width: 100%;
    flex: 1;
    @include center;
    padding: px2rem(4);
    font-weight: bold;

    .m-tabbar-item-icon {
      display: block;
      padding: px2rem(2);
      img {
        width: px2rem(56);
        height: px2rem(56);
      }
    }
    .m-tabbar-item-text {
      display: block;
      font-size: px2rem(20);
      padding: px2rem(2);
      color: #999;
    }
    &.is-active {
      .m-tabbar-item-text {
        color: green;
      }
    }
  }
}
</style>
