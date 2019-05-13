<template>
  <a-card
    hoverable
    :title="news.title"
    style="height: 300px; display: flex; flex-direction: column;"
    bodyStyle="flex: 1; border-bottom: 24px solid white; overflow: hidden;">
      <div class="news_excerpt">
        {{ news.excerpt }}
      </div>
    <template class="ant-card-actions" slot="actions">
      <span><a-icon type="ellipsis" /> 阅读全文</span>
      <span><a-icon type="link"/> 原文链接</span>
      <span><a-icon type="share-alt"/> 分享</span>
    </template>
  </a-card>
</template>

<script>
export default {
  props: ['news']
}
</script>

<style>
  .news_excerpt {
    overflow: hidden;
  }
  .ant-card-head-title {
    white-space: normal;
  }
</style>
