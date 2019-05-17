<template>
  <div class="st-view-tab"
    :style="{display: tabKey === activeTab ? 'block' : 'none'}">
    <home v-if="tab.type === 'home'" />
    <full-text v-else-if="tab.type === 'fullText'" :tab="tab" />
    <full-page v-else-if="tab.type === 'fullPage'" :tab="tab" />
  </div>
</template>

<script>
import Home from '@/views/Home.vue';
import FullText from '@/views/FullText.vue';
import FullPage from '@/views/FullPage.vue';

export default {
  components: {
    Home,
    FullText,
    FullPage,
  },
  props: [
    'tab',
    'activeTab'
  ],
  computed: {
    tabKey () {
      return `${this.tab.type}${this.tab.id}`;
    }
  }
}
</script>

<style>
.st-view-tab {
  overflow: auto;
  height: 100%;
}
</style>
