<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {}

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = html.innerWidth / 5
  fontSize = fontSize > 100 ? 100 : fontSize
  html.style.fontSize = fontSize
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/global';
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
