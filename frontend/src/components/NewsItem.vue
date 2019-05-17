<template>
  <a-card
    hoverable
    :title="news.title"
    style="height: 300px; display: flex; flex-direction: column;"
    :bodyStyle="{ flex: 1, borderBottom: '24px solid white', overflow: 'hidden'}">
      <div
        class="news_excerpt"
        @click.native="showFull">{{ news.excerpt }}</div>
    <template class="ant-card-actions" slot="actions">
      <news-item-action type="full" @click.native.stop="showFull"/>
      <news-item-action type="original" @click.native.stop="showOriginal"/>
      <news-item-action :type="news.is_favorite ? 'bookmarked' : 'bookmark'" @click.native.stop="bookmark"/>
    </template>
  </a-card>
</template>

<script>
import NewsItemAction from '@/components/NewsItemAction.vue';

export default {
  props: ['news'],
  components: {
    NewsItemAction,
  },

  methods: {
    showFull() {
      this.$store.commit('addTab', {
        name: this.news.title,
        type: 'fullText',
        data: {
          title: this.news.title,
          content: this.news.content,
        },
      });
    },
    showOriginal() {
      this.$store.commit('addTab', {
        name: this.news.title,
        type: 'fullPage',
        data: {
          url: this.news.url,
        },
      });
    },
    share() {
    },
  },
};
</script>

<style>
  .news_excerpt {
    overflow: hidden;
    white-space: pre-line;
  }
  .ant-card-head-title {
    white-space: normal;
  }
</style>
