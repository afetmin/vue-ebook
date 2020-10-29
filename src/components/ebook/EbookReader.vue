<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '@/utils/mixin'
global.epub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      this.$store.dispatch('setMenuVisible', !this.menuVisible)
    },
    hideTitleAndMenu() {
      this.$store.dispatch('setMenuVisible', false)
    },
    initEpub() {
      const url = this.fileName + '.epub'
      console.log(url)
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default', // 微信兼容
      })
      this.rendition.display()
      this.rendition.on('touchstart', (event) => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
      })
    },
  },
  mounted() {
    this.$store
      .dispatch('setFileName', this.$route.params.fileName)
      .then(() => {
        this.initEpub()
      })
  },
}
</script>

<style>
</style>
