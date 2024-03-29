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
          v-model="searchText"
          :placeholder="$t('book.searchHint')"
          @keyup.enter.exact="search()"
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
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{
            metadata.title
          }}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{ metadata.creator }}</span>
          </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{ progress + '%' }}</span>
          <span class="progress-text">{{ $t('book.haveRead2') }}</span>
        </div>
        <div class="slide-contents-book-time">{{ getReadTimeText() }}</div>
      </div>
    </div>
    <scroll
      class="slide-contents-list"
      :top="156"
      :bottom="20"
      v-show="!searchVisible"
    >
      <div
        class="slide-contents-item"
        v-for="(item, index) in navigation"
        :key="index"
      >
        <span
          class="slide-contents-item-label"
          :style="contentItemStyle(item)"
          :class="{ selected: section === index }"
          @click="displayContent(item.href)"
          >{{ item.label }}</span
        >
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <scroll
      class="slide-search-list"
      :top="55"
      :bottom="42"
      v-show="searchVisible"
    >
      <div
        class="slide-search-item"
        v-for="(item, index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayContent(item.cfi, true)"
      ></div>
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
      searchList: null,
      searchText: '',
    }
  },
  methods: {
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then((list) => {
          this.searchList = list
          this.searchList.map((item) => {
            item.excerpt = item.excerpt.replace(
              this.searchText,
              `<span class="content-search-text">${this.searchText}</span>`
            )
            return item
          })
        })
      }
    },
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(
          (section) =>
            section
              .load(this.currentBook.load.bind(this.currentBook)) // section绑定内容
              .then(section.find.bind(section, q)) // 章节内搜索
              .finally(section.unload.bind(section)) // 释放section
        )
      ).then((results) => Promise.resolve([].concat.apply([], results)))
    },
    displayContent(target, highlight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target) // 高亮元素
        }
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
      this.searchText = ''
      this.searchList = null
    },
  },
  mounted() {},
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
        // width: px2rem(327.25);
        font-size: px2rem(28);
        @include left;
        .slide-contents-book-title-text {
          @include ellipsis2(3);
        }
      }
      .slide-contents-book-author {
        // width: px2rem(327.25);
        font-size: px2rem(24);
        margin-top: px2rem(10);
        @include left;
        .slide-contents-book-author-text {
          // 设置省略时必须设置准确的宽度
          @include ellipsis2(1);
        }
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
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 px2rem(30);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(28);
      padding: px2rem(40) 0;
      box-sizing: border-box;
    }
  }
}
</style>
