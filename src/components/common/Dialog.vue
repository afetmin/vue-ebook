<template>
  <transition name="fade">
    <div class="dialog" v-show="visible">
      <div class="dialog-wrapper">
        <div class="dialog-title-wrapper">
          <span class="dialog-title-text">{{ title }}</span>
        </div>
        <slot></slot>
        <div class="dialog-btn-wrapper">
          <slot name="btn">
            <div class="dialog-btn" @click="hide">{{ $t('shelf.cancel') }}</div>
            <div class="dialog-btn">{{ $t('shelf.confirm') }}</div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';

.dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  font-size: px2rem(32);
  color: #333;
  @include center;

  .dialog-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 60%;
    max-height: 80%;
    background: white;
    border-radius: px2rem(20);

    .dialog-title-wrapper {
      font-size: px2rem(44);
      font-weight: bold;
      text-align: center;
      padding: px2rem(60) 0 px2rem(40) 0;
    }

    .dialog-btn-wrapper {
      display: flex;
      width: 100%;
      background: $color-blue;
      font-size: px2rem(28);
      font-weight: bold;
      color: white;
      text-align: center;
      padding: px2rem(30) 0;
      box-sizing: border-box;
      border-radius: 0 0 px2rem(20) px2rem(20);

      .dialog-btn {
        flex: 1;

        &.is-empty {
          color: rgba(255, 255, 255, 0.5);
        }
        &:active {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>
