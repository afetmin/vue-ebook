<template>
  <div class="cover-title-wrapper">
    <div class="cover-title-left-wrapper">
      <img class="cover-img" :src="cover" />
    </div>
    <div class="cover-title-right-wrapper">
      <div class="detail-cover-title-wrapper">
        <div class="cover-title-text">{{ title }}</div>
      </div>
      <div class="cover-author-wrapper">
        <div class="cover-author-text">{{ author }}</div>
      </div>
      <div class="detail-cover-description-wrapper">
        <div class="detail-cover-description-text">{{ desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cover: String,
    title: String,
    author: String,
    desc: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global';
.cover-title-wrapper {
  display: flex;
  width: 100%;
  padding: px2rem(20) 0;
  border-bottom: px2rem(2) solid #eee;
  box-sizing: border-box;
  .cover-title-left-wrapper {
    flex: 0 0 px2rem(206);
    padding: px2rem(20) 0 px2rem(20) px2rem(30);
    box-sizing: border-box;
    @include top;
    .cover-img {
      width: px2rem(206);
      height: px2rem(292);
    }
  }
  .cover-title-right-wrapper {
    flex: 1;
    padding: px2rem(20) px2rem(30);
    box-sizing: border-box;
    .detail-cover-title-wrapper {
      .cover-title-text {
        font-size: px2rem(48);
        line-height: px2rem(52);
        font-weight: bold;
        color: #333;
      }
    }
    .cover-author-wrapper {
      margin-top: px2rem(20);
      .cover-author-text {
        font-size: px2rem(28);
        line-height: px2rem(32);
        color: $color-blue;
      }
    }
    .detail-cover-description-wrapper {
      margin-top: px2rem(20);
      .detail-cover-description-text {
        font-size: px2rem(28);
        line-height: px2rem(32);
        color: #666;
        word-break: keep-all;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
      }
    }
  }
}
</style>
