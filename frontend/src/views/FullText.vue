<template>
  <div class="st-view-fulltext">
    <h1 class="st-ft-title">{{ tab.data.title }}</h1>
    <div>{{ tab.data.content }}</div>
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
  .st-ft-title {
    text-align: center;
  }
</style>
