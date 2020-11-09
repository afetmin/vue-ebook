<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-bookmark></ebook-bookmark>
  </div>
</template>

<script>
import EbookReader from '@/components/ebook/EbookReader'
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookMenu from '@/components/ebook/EbookMenu'
import EbookBookmark from '@/components/ebook/EbookBookmark'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookBookmark,
  },
  watch: {
    // 监听下拉offsetY 出现菜单和分页时无法下拉
    offsetY(newVal) {
      if (!this.menuVisible && this.bookAvailable) {
        if (newVal > 0) {
          this.move(newVal)
        } else if (newVal === 0) {
          this.restore()
        }
      }
    },
  },
  methods: {
    restore() {
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all .2s linear'
      // 不重置的话，每次下拉都会触发0.2s的动画，导致卡顿
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    },
    move(newVal) {
      this.$refs.ebook.style.top = newVal + 'px'
    },
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global';
.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
