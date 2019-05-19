<template>
  <div class="st-view-source">
    <h1>{{ this.source.name }} - {{ this.source.department }}</h1>

    <a-list
      :dataSource="source.news"
      itemLayout="horizontal">
      <a-list-item slot="renderItem" slot-scope="news, index" key="news.id">
        <a-list-item-meta>
          <a slot="title" @click="openNews(index)">{{ news.title }}</a>
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
    'tab'
  ],
  data() {
    return {
      source: {
        ...this.tab.data
      }
    }
  },
  methods: {
    openNews(index) {
      this.$store.commit('addTab', {
        type: 'fullText',
        name: this.source.news[index].title,
        data: this.source.news[index]
      });
    }
  },
  mounted() {
    initializeSource.call(this);
  }
}
</script>

<style>
  .st-view-source {
    padding: 24px;
  }
  .ant-list-item-content {
    flex: 0;
    min-width: fit-content;
    padding: 0 4px;
  }
</style>
