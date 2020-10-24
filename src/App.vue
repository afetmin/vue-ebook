<template>
  <div id="app">
    aaaaa
    <router-view />
  </div>
</template>

<script>
export default {}

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = html.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize
})
</script>
<style lang="scss" scoped>
@import './assets/styles/global';
#app {
  font-size: px2rem(80);
}
</style>
