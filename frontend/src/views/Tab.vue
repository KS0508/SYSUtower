<template>
  <div class="st-view-tab"
    :style="{display: tab.id === activeTab ? 'block' : 'none'}">
    <a-alert v-if="mayObsolute[tab.type]"
      banner>
      数据可能已经过期，请刷新本页以获取最新数据。
    </a-alert>
    <component :is="tab.type" :tab="tab" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Home from '@/views/Home.vue';
import Subscription from '@/views/Subscription.vue';
import AddSubscription from '@/views/AddSubscription.vue';
import SourceBrowser from '@/views/SourceBrowser.vue';
import Favorite from '@/views/Favorite.vue';
import FullText from '@/views/FullText.vue';
import FullPage from '@/views/FullPage.vue';

export default {
  components: {
    Home,
    Subscription,
    AddSubscription,
    SourceBrowser,
    Favorite,
    FullText,
    FullPage,
  },
  props: [
    'tab',
    'activeTab',
  ],
  computed: {
    ...mapState([
      'mayObsolute'
    ])
  }
};
</script>

<style>
.st-view-tab {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
</style>
