<template>
  <a-card
    hoverable
    :title="news.title"
    style="height: 360px; display: flex; flex-direction: column;"
    :bodyStyle="{ flex: 1, borderBottom: '24px solid white', overflow: 'hidden'}">
      <p class="st-card-secondary">
        <a-icon type="calendar" class="st-card-secondary-icon" />
        {{news.publishDate}}
        <br>
        <a-icon type="tag" class="st-card-secondary-icon" />
        {{news.keywords.join(', ')}}
      </p>
      <div
        class="news_excerpt"
        @click="showFull">{{ news.excerpt }}</div>
      <p></p>
    <template class="ant-card-actions" slot="actions">
      <news-item-action type="full" @click.native.stop="showFull"/>
      <news-item-action type="original" @click.native.stop="showOriginal"/>
      <news-item-action
        :class="news.is_favorite ? 'st-news-action-bookmarked' : ''"
        :type="news.is_favorite ? 'bookmarked' : 'bookmark'"
        @click.native.stop="toggleBookmark"/>
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
        data: this.news.id,
      });
    },
    showOriginal() {
      this.$store.commit('addTab', {
        name: this.news.title,
        type: 'fullPage',
        data: this.news.url,
      });
    },
    async toggleBookmark() {
      if (this.news.is_favorite) {
        this.$store.dispatch('favorite/deleteSingleFavorite', this.news.id);
      } else {
        this.$store.dispatch('favorite/addSingleFavorite', this.news.id);
      }
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
  .st-card-secondary {
    color: rgba(0, 0, 0, .45);
  }
  .st-card-secondary-icon {
    margin-right: 4px;
  }
  .st-news-action-bookmarked {
    color: #1890ff;
  }
</style>
