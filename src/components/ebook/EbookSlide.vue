<template>
  <transition name="fade">
    <div
      class="slide-content-wrapper"
      v-show="menuVisible && settingVisible === 3"
    >
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab === 1 ? content : bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{ selected: currentTab === 1 }"
                @click="selectTab(1)"
              >
                {{ $t('book.navigation') }}
              </div>
              <div
                class="content-page-tab-item"
                :class="{ selected: currentTab === 2 }"
                @click="selectTab(2)"
              >
                {{ $t('book.bookmark') }}
              </div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu()"></div>
    </div>
  </transition>
</template>

<script>
import EbookSlideContents from './EbookSlideContents'
import EbookSlideBookmark from './EbookSlideBookmark'
import EbookLoading from './EbookLoading'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookLoading
  },
  data() {
    return {
      currentTab: 1,
      content: EbookSlideContents,
      bookmark: EbookSlideBookmark
    }
  },
  methods: {
    selectTab(tab) {
      this.currentTab = tab
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/global';
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
  display: flex;
  width: 100%;
  height: 100%;
  .content {
    flex: 0 0 85%;
    width: 85%; // 设置flex同时设置宽度，解决某些情况下flex布局挤压塌陷
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 px2rem(96);
        height: px2rem(96);
        width: 100%;
        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(24);
          @include center;
        }
      }
    }
    .content-empty {
      width: 100%;
      height: 100%;
      @include center;
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
