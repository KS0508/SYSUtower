<template>
  <section class="st-view-home">
    <news-feed v-for="category in newsData" :key="category.id" :category="category" />
    <a-button block size="large" icon="plus">添加订阅</a-button>
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
};
</script>

<style>
  .st-view-home {
    padding: 24px;
  }
</style>
