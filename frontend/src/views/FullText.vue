<template>
  <div class="st-view-fulltext">
    <h1 class="st-ft-title">{{ tab.data.title }}</h1>
    <div>{{ tab.data.excerpt }}</div>
  </div>
</template>

<script>
export default {
  props: [
    'tab',
  ],
};
</script>

<style>
  .st-view-fulltext {
    padding: 24px;
  }

  .st-ft-title {
    text-align: center;
  }
</style>
