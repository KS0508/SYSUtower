<template>
  <section>
    <news-feed v-for="category in newsData" :key="category.id" :category="category" />
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

</style>
