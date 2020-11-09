<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{ text }}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper">
      <bookmark :color="color"></bookmark>
    </div>
  </div>
</template>

<script>
import { realPx } from '@/utils/utils'
import { ebookMixin } from '@/utils/mixin'
import Bookmark from '@/components/common/Bookmark'
export default {
  mixins: [ebookMixin],
  components: {
    Bookmark,
  },
  data() {
    return {
      text: '',
      color: '#fff',
    }
  },
  computed: {
    height() {
      return realPx(50)
    },
    // 临界值
    threshold() {
      return realPx(60)
    },
  },
  watch: {
    offsetY(val) {
      const iconDown = this.$refs.iconDown
      // 没到临界,使书签做相对运动，看起来像是吸顶
      if (val >= this.height && val < this.threshold) {
        this.$refs.bookmark.style.top = `${-val}px`
        this.text = this.$t('book.pulldownAddMark')
        this.color = '#fff'
        if (iconDown.style.transform === 'rotate(180deg)') {
          iconDown.style.transform = 'rotate(0deg)'
        }
        // 到达超过临界
      } else if (val >= this.threshold) {
        this.$refs.bookmark.style.top = `${-val}px`
        this.text = this.$t('book.releaseAddMark')
        this.color = 'blue'
        if (
          (iconDown.style.transform === '' ||
          iconDown.style.transform === 'rotate(0deg)')
        ) {
          iconDown.style.transform = 'rotate(180deg)'
        }
      }
    },
  },
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/global';
.ebook-bookmark {
  position: absolute;
  top: px2rem(-70);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(70);
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(90);
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(28);
      color: white;
      transition: all 0.2s linear;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: px2rem(28);
      color: white;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(30);
  }
}
</style>
