<template>
  <div class="category">
    <h2 class="ant-typography">{{ category.name }} - {{ category.department }}</h2>
    <a-row :gutter="16">
      <a-col v-for="news in newsList" :key="news.id" :span="8">
        <news-item :news="news" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import NewsItem from '@/components/NewsItem.vue';

export default {
  components: {
    NewsItem,
  },
  props: ['category'],
  computed: {
    newsList() {
      return this.category.news.slice(0, 3);
    },
  },
};
</script>

<style>
  .category {
    margin-bottom: 36px;
  }
</style>
