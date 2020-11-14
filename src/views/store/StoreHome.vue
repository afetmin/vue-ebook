<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flip-card></flip-card>
  </div>
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
import FlipCard from '@/components/home/FlipCard'
export default {
  components: {
    SearchBar,
    FlipCard,
  },
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/global';
.store-home {
  width: 100%;
  height: 100%;
}
</style>
