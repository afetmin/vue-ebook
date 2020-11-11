<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :style="{ background: item.style.body.background }"
            :class="{ selected: item.name === defaultTheme }"
          ></div>
          <div class="text" :class="{ selected: item.name === defaultTheme }">
            {{ item.alias }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import { saveTheme } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  methods: {
    // 主题只能设置一次的 bug
    setTheme(index) {
      const theme = this.themeList[index]
      const bodyObject = theme.style.body
      for (let key in bodyObject) {
        this.currentBook.rendition.themes.override(key, bodyObject[key], true)
      }
      this.setDefaultTheme(theme.name)
      this.initGlobalStyle()
      saveTheme(this.fileName, theme.name)
      // const theme = this.themeList[index]
      // this.setDefaultTheme(theme.name).then(() => {
      //   this.currentBook.rendition.themes.select(this.defaultTheme)
      // })
    },
  },
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/global';
.setting-wrapper {
  position: absolute;
  bottom: px2rem(96);
  left: 0;
  z-index: 160;
  width: 100%;
  height: px2rem(180);
  background: white;
  box-shadow: 0 px2rem(-16) px2rem(16) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(10);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(2) solid #ccc;
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 px2rem(8) px2rem(12) 0 rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 px2rem(40);
        font-size: px2rem(28);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>
