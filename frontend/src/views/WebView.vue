<template>
  <div class="st-view-webview">
    <div class="st-wv-control-bar">
      <a-input v-model="inputUrl" />
      <a-button-group>
        <a-button icon="reload">刷新</a-button>
        <a-button icon="paper-clip">复制链接</a-button>
      </a-button-group>
    </div>
    <iframe class="st-wv-iframe" :src="tab.data.url" frameborder="0"></iframe>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: [
    'tab'
  ],
  data () {
    return {
      inputUrl: this.tab.data.url
    }
  },
  
  beforeUpdate () {
    console.log('Im going to update');
  }
}
</script>

<style>
  .st-view-webview {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .st-wv-control-bar {
    display: flex;
    flex-direction: row;
    padding: 8px;
  }
  .st-wv-control-bar .ant-input {
    flex: 1;
    margin-right: 8px;
  }
  .st-wv-iframe {
    flex: 1;
  }
</style>
