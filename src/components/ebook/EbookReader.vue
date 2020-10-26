<template>
  <div class="ebook-reader">
  </div>
</template>

<script>
export default {
  mounted() {
    const fileName = this.$route.params.fileName.split('|').join('/')
  }
}
</script>

<style>
</style>
