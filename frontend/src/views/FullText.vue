<template>
  <div class="st-view-fulltext">
    <h1 class="st-ft-title">{{ news.title }}</h1>
    <p class="st-ft-info">
      <span class="st-ft-publish-date">发布时间：{{ news.publishDate }}</span> /
      <span class="st-ft-fetch-time">抓取时间：{{ news.fetchTime }}</span> /
      <span class="st-ft-keywords">关键字：{{ news.keywords.join(', ') }}</span>
    </p>
    <div v-if="!news.content">
      <div>{{ news.excerpt }}</div>
      <a-skeleton active></a-skeleton>
    </div>
    <div v-else v-html="news.content" />
  </div>
</template>

<script>
async function initializeNews() {
  const newsData = await this.$request.api('GET', `/news/${this.news.id}`);
  this.news = newsData;
}

export default {
  props: [
    'tab',
  ],
  data() {
    return {
      news: {
        ...this.tab.data,
        content: '',
        attachments: [],
      }
    }
  },

  mounted() {
    initializeNews.call(this);
  },
};
</script>

<style>
  .st-view-fulltext {
    padding: 24px;
  }

  .st-ft-title {
  }
</style>
