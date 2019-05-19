<template>
  <div class="st-view-tab"
    :style="{display: tab.id === activeTab ? 'block' : 'none'}">
    <component :is="tab.type" :tab="tab" />
  </div>
</template>

<script>
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
};
</script>

<style>
.st-view-tab {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
</style>
