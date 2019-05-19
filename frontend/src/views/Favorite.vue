<template>
  <div class="st-view-favorite">
    <h1>收藏夹</h1>
    <a-list
      :dataSource="favorite"
      itemLayout="horizontal">
      <a-list-item slot="renderItem" slot-scope="news, index" key="news.id">
        <a-popconfirm 
          slot="actions"
          title="确定要取消收藏这条新闻么？"
          @confirm="deleteFavorite(index)"
          okText="是的" cancelText="不了">
          <a>取消收藏</a>
        </a-popconfirm>
        <a-list-item-meta>
          <a slot="title" @click="openNews(index)">{{ news.title }}</a>
        </a-list-item-meta>
        {{ news.publishDate }}
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
async function initializeFavorite() {
  const favoriteData = await this.$request.api('GET', `/favorites`);
  this.favorite = favoriteData;
} 

export default {
  props: [
    'tab'
  ],
  data() {
    return {
      favorite: []
    }
  },
  methods: {
    openNews(index) {
      this.$store.commit('addTab', {
        type: 'fullText',
        name: this.favorite[index].title,
        data: this.favorite[index]
      });
    },
    async deleteFavorite(index) {
      const ret = await this.$request.api('DELETE', `/favorites/${this.favorite[index].id}`);
      if (ret === 'SUCCESS') {
        this.$message.success('取消收藏成功√');
        this.favorite.splice(index, 1);
      } else {
        this.$message.error('取消收藏失败...');
      }
    }
  },
  mounted() {
    initializeFavorite.call(this);
  }
}
</script>

<style>
  .st-view-favorite {
    padding: 24px;
  }
  .ant-list-item-action {
    margin-left: 12px;
  }
  .ant-list-item-content {
    flex: 0;
    min-width: fit-content;
    padding: 0 4px;
  }
</style>
