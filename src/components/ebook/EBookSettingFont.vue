<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size">
        <div
          class="preview"
          :style="{ fontSize: fontSizeList[0].fontSize + 'px' }"
        >
          A
        </div>
        <div class="select">
          <div
            class="select-wrapper"
            v-for="(item, index) in fontSizeList"
            :key="index"
            @click="setFontSize(item.fontSize)"
          >
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="preview"
          :style="{
            fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px',
          }"
        >
          A
        </div>
      </div>
      <div class="setting-font-family" @click="showFontFamilyPopup">
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-text">
            {{ defaultFontFamily }}
          </span>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { FONT_SIZE_LIST } from '@/utils/book'
import { ebookMixin } from '@/utils/mixin'
import { saveFontSize } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST,
    }
  },
  methods: {
    setFontSize(fontSize) {
      this.setDefaultFontSize(fontSize)
      saveFontSize(this.fileName, fontSize)
      this.currentBook.rendition.themes.fontSize(fontSize)
    },
    showFontFamilyPopup() {
      this.setFontFamilyVisible(true)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global';
.setting-wrapper {
  position: absolute;
  bottom: px2rem(96);
  left: 0;
  z-index: 160;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: px2rem(180);
  background: white;
  box-shadow: 0 px2rem(-16) px2rem(16) rgba(0, 0, 0, 0.15);
  .setting-font-size {
    flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 px2rem(80);
      @include center;
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(2) solid #ccc;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: px2rem(14);
          border-left: px2rem(2) solid #ccc;
          .point {
            position: absolute;
            top: px2rem(-16);
            left: px2rem(-20);
            width: px2rem(40);
            height: px2rem(40);
            border-radius: 50%;
            background: white;
            border: px2rem(2) solid #ccc;
            box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              width: px2rem(10);
              height: px2rem(10);
              background: black;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: px2rem(28);
    @include center;
    .setting-font-family-text-wrapper {
      @include center;
    }
    .setting-font-family-icon-wrapper {
      @include center;
    }
  }
}
</style>