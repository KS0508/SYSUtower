<template>
  <a-card
    hoverable
    :title="news.title"
    style="height: 300px; display: flex; flex-direction: column;"
    :bodyStyle="{ flex: 1, borderBottom: '24px solid white', overflow: 'hidden'}">
      <div class="news_excerpt">{{ news.excerpt }}</div>
    <template class="ant-card-actions" slot="actions">
      <news-item-action type="full" @click.native="showFull"/>
      <news-item-action type="original" @click.native="showOriginal"/>
      <news-item-action type="share" @click.native="share"/>
    </template>
  </a-card>
</template>

<script>
import NewsItemAction from '@/components/NewsItemAction.vue';

export default {
  props: ['news'],
  components: {
    NewsItemAction
  },

  methods: {
    showFull () {
      this.$store.commit('addTab', {
        type: 'fullText',
        name: this.news.title,
        data: {
          title: this.news.title,
          content: this.news.content
        }
      })
    },
    showOriginal () {
      alert(this.news.url);
    },
    share () {
      alert('share');
    }
  }
}
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
