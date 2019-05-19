<template>
  <div class="category">
    <h2 
      class="st-nf-title"
      @click="openSourceBrowser">
      {{ category.name }} - {{ category.department }}
      <!--<a-button
        class="st-nf-btn-enter"
        type="normal"
        shape="circle"
        icon="right"
        size="small" />-->
      <a-icon 
        type="right"
        class="st-nf-btn-enter" />
    </h2>
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
  methods: {
    openSourceBrowser() {
      this.$store.commit('addTab', {
        type: 'sourceBrowser',
        name: `${this.category.name} - ${this.category.department}`,
        data: this.category,
      })
    },
  },
};
</script>

<style>
  .category {
    margin-bottom: 36px;
  }
  .st-nf-title {
    cursor: pointer;
  }
  .st-nf-btn-enter {
    margin-left: 6px;
    font-size: 85%;
  }
</style>
