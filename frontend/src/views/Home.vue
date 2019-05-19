<template>
  <section class="st-view-home">
    <news-feed v-for="category in newsData" :key="category.id" :category="category" />
    <a-button block size="large" icon="plus" @click.native="openAddSubscription">添加订阅</a-button>
    <a-button block size="large" icon="star" @click.native="openFavorite">打开收藏夹</a-button>
    <a-button block size="large" icon="star" @click.native="openSubscription">打开订阅列表</a-button>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapState } from 'vuex';
import NewsFeed from '@/components/NewsFeed.vue';

export default {
  name: 'home',
  components: {
    NewsFeed,
  },
  computed: {
    ...mapState([
      'newsData',
    ]),
  },
  methods: {
    openAddSubscription() {
      this.$store.commit('addTab', {
        type: 'addSubscription',
      });
    },
    openFavorite() {
      this.$store.commit('addTab', {
        type: 'favorite',
      });
    },
    openSubscription() {
      this.$store.commit('addTab', {
        type: 'subscription',
      });
    },
  },
};
</script>

<style>
  .st-view-home {
    padding: 24px;
  }
</style>
