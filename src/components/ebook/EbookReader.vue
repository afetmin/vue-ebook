<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { mapGetters } from 'vuex'
global.epub = Epub
export default {
  computed: {
    ...mapGetters(['fileName']),
  },
  methods: {
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
