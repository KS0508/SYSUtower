<template>
  <div class="st-view-source">
    <h1>{{ this.source.name }} - {{ this.source.department }}</h1>

    <a-list
      :dataSource="source.news"
      itemLayout="horizontal"
      :locale="{emptyText: '还没有新闻'}">
      <a-list-item slot="renderItem" slot-scope="news" key="news.id">
        <a-list-item-meta>
          <a slot="title" @click="openNews(news)">{{ news.title }}</a>
        </a-list-item-meta>
        {{ news.publishDate }}
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
async function initializeSource() {
  const sourceData = await this.$request.api('GET', `/sources/${this.source.id}`);
  console.log(sourceData);
  this.source = sourceData;
}

export default {
  props: [
    'tab',
  ],
  computed: {
    source() {
      return this.$store.getters['subscriptions/items'].find(sub => sub.id === this.tab.data);
    },
  },
  methods: {
    openNews(news) {
      this.$store.commit('addTab', {
        type: 'fullText',
        name: news.title,
        data: news.id,
      });
    },
  },
  mounted() {
    this.$store.dispatch('subscriptions/fetchSubscriptionNews', this.tab.data);
  },
};
</script>

<style lang="less">
  .st-view-source {
    padding: 24px;

    .ant-list-item-content {
      flex: 0;
      min-width: fit-content;
      padding: 0 4px;
    }
  }
</style>
