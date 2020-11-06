<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          class="slide-contents-search-input"
          :placeholder="$t('book.searchHint')"
          @click="showSearchPage()"
        />
      </div>
      <transition name="fade">
        <div
          class="slide-contents-search-cancel"
          v-if="searchVisible"
          @click="hideSearchPage()"
        >
          {{ $t('book.cancel') }}
        </div>
      </transition>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{ metadata.title }}</div>
        <div class="slide-contents-book-author">{{ metadata.creator }}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{ progress + '%' }}</span>
          <span class="progress-text">{{ $t('book.haveRead2') }}</span>
        </div>
        <div class="slide-contents-book-time">{{ getReadTimeText() }}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="156" :bottom="20" ref="scroll">
      <div
        class="slide-contents-item"
        v-for="(item, index) in navigation"
        :key="index"
      >
        <span
          class="slide-contents-item-label"
          :style="contentItemStyle(item)"
          :class="{ selected: section === index }"
          @click="displayNavigation(item.href)"
          >{{ item.label }}</span
        >
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import Scroll from '@/components/common/Scroll'
import { px2rem } from '@/utils/utils'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll,
  },
  data() {
    return {
      searchVisible: false,
    }
  },
  methods: {
    displayNavigation(target) {
      this.display(target, () => {
        this.hideTitleAndMenu()
      })
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 30)}rem`,
      }
    },
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
    },
  },
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/global';
.ebook-slide-contents {
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(72);
    margin: px2rem(40) 0 px2rem(20) 0;
    padding: 0 px2rem(30);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(56);
        font-size: px2rem(24);
        @include center;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(64);
        font-size: px2rem(28);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(100);
      font-size: px2rem(28);
      @include center;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(180);
    padding: px2rem(20) px2rem(30) px2rem(40) px2rem(30);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(90);
      .slide-contents-book-img {
        width: px2rem(90);
        height: px2rem(120);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 px2rem(20);
      box-sizing: border-box;
      .slide-contents-book-title {
        width: px2rem(327.25);
        font-size: px2rem(28);
        @include ellipsis2(2);
      }
      .slide-contents-book-author {
        width: px2rem(327.25);
        font-size: px2rem(24);
        margin-top: px2rem(10);
        // 设置省略时必须设置准确的宽度
        @include ellipsis;
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(140);
      .slide-contents-book-progress {
        .progress {
          font-size: px2rem(28);
        }
        .progress-text {
          font-size: px2rem(24);
        }
      }
      .slide-contents-book-time {
        font-size: px2rem(24);
        margin-top: px2rem(10);
      }
    }
  }
  .slide-contents-list {
    padding: 0 px2rem(30);
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: px2rem(40) 0;
      box-sizing: border-box;
      .slide-contents-item-label {
        flex: 1;
        font-size: px2rem(28);
        @include ellipsis;
      }
      .slide-contents-item-page {
      }
    }
  }
}
</style>
