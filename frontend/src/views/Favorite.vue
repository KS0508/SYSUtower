<template>
  <div class="st-view-favorite">
    <h1>收藏夹</h1>
    <a-list
      :dataSource="favorite"
      itemLayout="horizontal"
      :locale="{emptyText: '好像没有收藏了的新闻'}">
      <a-list-item slot="renderItem" slot-scope="news" key="news.id">
        <a-popconfirm
          slot="actions"
          title="确定要取消收藏这条新闻么？"
          placement="left"
          @confirm="$store.dispatch('favorite/deleteSingleFavorite', news.id)"
          okText="是的" cancelText="不了">
          <a>取消收藏</a>
        </a-popconfirm>
        <a-list-item-meta>
          <a slot="title" @click="openNews(news)">{{ news.title }}</a>
        </a-list-item-meta>
        {{ news.publishDate }}
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  props: [
    'tab',
  ],
  computed: {
    favorite() {
      return this.$store.getters['favorite/items'];
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
    async deleteFavorite(index) {
      const ret = await this.$request.api('DELETE', `/favorites/${this.favorite[index].id}`);
      if (ret === 'SUCCESS') {
        this.$message.success('取消收藏成功√');
        this.favorite.splice(index, 1);
      } else {
        this.$message.error('取消收藏失败...');
      }
    },
  },
  mounted() {
    this.$store.dispatch('favorite/fetchFavorite');
  },
};
</script>

<style lang="less">
  .st-view-favorite {
    padding: 24px;

    .ant-list-item-action {
      margin-left: 12px;
    }
    .ant-list-item-content {
      flex: 0;
      min-width: fit-content;
      padding: 0 4px;
    }
  }
</style>
