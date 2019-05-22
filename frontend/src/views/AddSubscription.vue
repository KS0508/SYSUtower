<template>
  <div class="st-view-add-subscription">
    <h1>管理订阅</h1>
    <p class="st-as-secondary">点按卡片即可添加 / 删除订阅</p>
    <p class="st-as-secondary">添加 / 删除订阅后，需要手动刷新首页才能看到新的订阅内容喔</p>
    <a-list
      :grid="subscriptionGrid"
      :dataSource="subOnSource"
      :locale="{emptyText: '正在加载可供订阅的新闻源 ...'}">
      <a-list-item slot="renderItem" slot-scope="source" key="source.id">
        <a-card
          :title="source.department"
          :hoverable="true"
          :class="{'st-card-subscribed': source.isSubscribed}"
          @click.native="toggleSubscription(source)">
          <a-icon
            :type="source.isSubscribed ? 'check' : 'plus-circle'"
            :style="{fontSize: '150%', verticalAlign: 'middle'}"
            slot="extra"></a-icon>
          {{ source.name }}
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';

async function initializeSource() {
  this.source = await this.$request.api('GET', '/sources');
}
async function initializeSubscription() {
  this.subscription = await this.$request.api('GET', '/subscriptions');
}

export default {
  props: [
    'tab',
  ],
  data() {
    return {
      source: [],
    };
  },
  computed: {
    subscription() {
      return this.$store.state.subscriptions.items;
    },
    subOnSource() {
      return this.source.map(src => ({
        ...src,
        isSubscribed: !!this.subscription.find(sub => sub.id === src.id),
      }));
    },
    ...mapState([
      'subscriptionGrid',
    ]),
  },
  methods: {
    async addSubscription(source) {
      this.subscription.push({
        id: source.id,
      });
      const ret = await this.$request.api('POST', `/subscriptions/${source.id}`);
      if (ret === 'SUCCESS') {
        this.$message.success(`订阅 ${source.department} - ${source.name} 成功√`);
      } else {
        this.$message.error(`订阅 ${source.department} - ${source.name} 失败...`);
      }
      initializeSubscription.call(this);
    },
    async deleteSubscription(source) {
      this.subscription.splice(this.subscription.findIndex(sub => sub.id === source.id), 1);
      const ret = await this.$request.api('DELETE', `/subscriptions/${source.id}`);
      if (ret === 'SUCCESS') {
        this.$message.success(`取消订阅 ${source.department} - ${source.name} 成功√`);
      } else {
        this.$message.error(`取消订阅 ${source.department} - ${source.name} 失败...`);
      }
      initializeSubscription.call(this);
    },
    toggleSubscription(source) {
      if (source.isSubscribed) {
        this.$store.dispatch('subscriptions/deleteSingleSubscription', source);
      } else {
        this.$store.dispatch('subscriptions/addSingleSubscription', source);
      }
    },
  },
  mounted() {
    this.$store.dispatch('subscriptions/fetchSubscription');
    initializeSource.call(this);
  },
};
</script>

<style lang="less">
  .st-view-add-subscription {
    padding: 24px;

    .st-as-secondary {
      color: rgba(0, 0, 0, .45);
    }

    .st-card-subscribed {
      color: rgba(255, 255, 255, .95);
      background: linear-gradient(top, #40a9ff, #1890ff);
      border-color: rgba(255, 255, 255, .5);

      .ant-card-head {
        color: rgba(255, 255, 255, .95);
        border-bottom-color: rgba(255, 255, 255, .2);
      }
      .ant-card-extra {
        color: rgba(255, 255, 255, .95);
      }
    }
  }
</style>
