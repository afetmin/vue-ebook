<template>
  <div>
    <div class="store-loging" v-if="login">登录中……</div>
    <div class="store-home" v-else>
      <search-bar></search-bar>
      <div v-if="lists != null">
        <flap-card :data="random"></flap-card>
        <scroll
          :top="scrollTop"
          :bottom="scrollBottom"
          @onScroll="onScroll"
          ref="scroll"
        >
          <div class="banner-wrapper">
            <div
              v-if="banner != null"
              class="banner-img"
              :style="{ backgroundImage: `url('${banner}')` }"
            ></div>
          </div>
          <div v-if="guessYouLike != null">
            <guess-you-like :data="guessYouLike"></guess-you-like>
          </div>

          <div v-if="recommend != null">
            <recommend :data="recommend" class="recommend"></recommend>
          </div>

          <div v-if="featured != null">
            <featured
              :data="featured"
              :titleText="$t('home.featured')"
              :btnText="$t('home.seeAll')"
              class="featured"
            ></featured>
          </div>
          <div v-if="categoryList != null">
            <div
              class="category-list-wrapper"
              v-for="(item, index) in categoryList"
              :key="index"
            >
              <category-book :data="item"></category-book>
            </div>
          </div>

          <div v-if="categories != null">
            <category :data="categories" class="categories"></category>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import { home } from '../../api/store'
import SearchBar from '../../components/home/SearchBar'
import Scroll from '../../components/common/Scroll'
import FlapCard from '../../components/home/FlapCard'
import GuessYouLike from '../../components/home/GuessYouLike'
import Recommend from '../../components/home/Recommend'
import Featured from '../../components/home/Featured'
import CategoryBook from '../../components/home/CategoryBook'
import Category from '../../components/home/Category'

export default {
  mixins: [storeHomeMixin],
  components: {
    Category,
    CategoryBook,
    Featured,
    Recommend,
    GuessYouLike,
    SearchBar,
    Scroll,
    FlapCard,
  },
  data() {
    return {
      lists: null,
      scrollBottom: 55,
      scrollTop: 94,
      random: null,
      banner: '',
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null,
      login: false,
      openid: null,
      error: null,
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scrollTop = 52
        this.scrollBottom = 55
      } else {
        this.scrollTop = 94
        this.scrollBottom = 97
      }
      this.$refs.scroll.refresh()
    },
  },
  mounted() {
    home().then((response) => {
      this.lists = response.data
      console.log(this.lists)
      const randomIndex = Math.floor(Math.random() * this.lists.random.length)
      this.random = this.lists.random[randomIndex]
      this.banner = this.lists.banner
      this.guessYouLike = this.lists.guessYouLike
      this.recommend = this.lists.recommend
      this.featured = this.lists.featured
      this.categoryList = this.lists.categoryList
      this.categories = this.lists.categories
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.store-loging {
  width: 100%;
  height: 100%;
  @include center;
}

.store-home {
  width: 100%;
  height: 100%;

  .banner-wrapper {
    width: 100%;
    padding: px2rem(20);
    box-sizing: border-box;

    .banner-img {
      width: 100%;
      height: px2rem(300);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .recommend {
    margin-top: px2rem(40);
  }

  .featured {
    margin-top: px2rem(40);
  }

  .category-list-wrapper {
    margin-top: px2rem(40);
  }

  .categories {
    margin-top: px2rem(40);
  }
}
</style>
