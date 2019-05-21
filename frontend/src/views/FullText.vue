<template>
  <div class="st-view-fulltext">
    <h1 class="st-ft-title">{{ news.title }}</h1>
    <p class="st-ft-info">
      <span class="st-ft-publish-date">发布时间: {{ news.publishDate }}</span>
      <a-divider type="vertical" />
      <span class="st-ft-fetch-time">抓取时间: {{ news.fetchTime }}</span>
      <a-divider type="vertical" />
      <span class="st-ft-keywords">关键字: {{ news.keywords.join(', ') }}</span>
    </p>
    <div v-if="!news.content" class="st-ft-content">
      <a-skeleton active :title="false"></a-skeleton>
    </div>
    <div v-else class="st-ft-container">
      <div v-html="news.content" class="st-ft-content"/>
      <div v-if="news.attachments.length" class="st-ft-att-container">
        <a-divider orientation="left" :style="{marginBottom: 0}">附件下载</a-divider>
        <a-list
          :dataSource="news.attachments"
          itemLayout="horizontal">
          <a-list-item slot="renderItem" slot-scope="attachment" key="attachment.id">
            <a :href="attachment.url" @click="prepareDownload(attachment)">{{ attachment.name }}</a>
          </a-list-item>
        </a-list>
      </div>
      <a class="st-ft-read-original" @click="openOriginal">阅读原文</a>
      <!-- <a-divider type="vertical" />
      <a class="st-ft-delete-news" @click="deleteNews">删除新闻</a> -->
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

async function initializeNews() {
  const newsData = await this.$request.api('GET', `/news/${this.news.id}`);
  this.news = newsData;
}

export default {
  props: [
    'tab',
  ],
  computed: {
    news() {
      return this.$store.getters['news/items'].find(item => item.id === this.tab.data);
    },
  },
  methods: {
    openOriginal() {
      this.$store.commit('addTab', {
        type: 'fullPage',
        name: this.news.title,
        data: this.news.url,
      });
    },
    async deleteNews() {
      const ret = this.$request.api('DELETE', `/news_del/${this.news.id}`);
      this.$message.info(ret);
    },
    prepareDownload(attachment) {
      ipcRenderer.sendSync('prepareDownload', {
        url: attachment.url,
        name: attachment.name,
      });
    },
  },
  mounted() {
    this.$store.dispatch('news/fetchSingleNews', this.tab.data);
  },
};
</script>

<style>
  .st-view-fulltext {
    padding: 24px;
  }
  .st-ft-info {
    color: rgba(0, 0, 0, .45);
  }
  .st-ft-content {
    padding: 12px 0;
  }
  .st-ft-att-container {
    margin-top: 32px;
  }
  .st-ft-read-original {
    display: inline-block;
    margin-top: 36px;
  }
</style>
