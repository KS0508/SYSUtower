<template>
  <div class="st-view-subscription">
    <h1>订阅管理</h1>
    <a-list
      :dataSource="subscription"
      itemLayout="horizontal">
      <a-list-item slot="renderItem" slot-scope="source, index" key="source.id">
        <a-popconfirm 
          slot="actions"
          title="确定要取消订阅么？"
          @confirm="deleteSubscription(index)"
          okText="是的" cancelText="不了">
          <a>取消订阅</a>
        </a-popconfirm>
        <a-list-item-meta>
          <a slot="title" @click="openSource(index)">{{ source.name }} - {{ source.department }}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
async function initializeSubscription() {
  const subscriptionData = await this.$request.api('GET', `/subscriptions`);
  this.subscription = subscriptionData;
} 

export default {
  props: [
    'tab'
  ],
  data() {
    return {
      subscription: []
    }
  },
  methods: {
    openSource(index) {
      this.$store.commit('addTab', {
        type: 'sourceBrowser',
        name: `${this.source[index].name} - ${this.source[index].department}`,
        data: this.source[index]
      });
    },
    async deleteSubscription(index) {
      const ret = await this.$request.api('DELETE', `/subscriptions/${this.subscription[index].id}`);
      if (ret === 'SUCCESS') {
        this.$message.success('取消订阅成功√');
        this.subscription.splice(index, 1);
      } else {
        this.$message.error('取消收藏失败...');
      }
    }
  },
  mounted() {
    initializeSubscription.call(this);
  }
}
</script>

<style>
  .st-view-subscription {
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
