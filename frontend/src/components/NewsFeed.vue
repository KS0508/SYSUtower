<template>
  <div class="category">
    <h2
      class="st-nf-title"
      @click="openSourceBrowser">
      {{ category.name }} - {{ category.department }}
      <a-icon
        type="right"
        class="st-nf-btn-enter" />
    </h2>
    <a-list
      :grid="homeGrid"
      :dataSource="newsList"
      :locale="{emptyText: '刚刚添加的订阅需要手动刷新才能获取到新闻 👌'}"
    >
      <a-list-item slot="renderItem" slot-scope="news" :key="news.id">
        <news-item :news="news" />
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import NewsItem from '@/components/NewsItem.vue';
import { mapState } from 'vuex';

export default {
  components: {
    NewsItem,
  },
  props: ['category', 'count'],
  computed: {
    newsList() {
      return this.count ? this.category.news.slice(0, this.count) : this.category.news;
    },
    ...mapState([
      'homeGrid',
    ]),
  },
  methods: {
    openSourceBrowser() {
      this.$store.commit('addTab', {
        type: 'sourceBrowser',
        name: `${this.category.name} - ${this.category.department}`,
        data: this.category.id,
      });
    },
  },
};
</script>

<style scoped>
  .category {
    margin-bottom: 36px;
  }
  .st-nf-title {
    cursor: pointer;
  }
  .st-nf-btn-enter {
    /* margin-left: 4px; */
    font-size: 85%;
  }
</style>
