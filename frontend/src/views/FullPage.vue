<template>
  <div class="st-view-fullpage" v-once>
    <div class="st-fp-control-bar">
      <a-input v-model="inputUrl" />
      <a-button-group>
        <a-button icon="reload">刷新</a-button>
        <a-button icon="paper-clip">复制链接</a-button>
      </a-button-group>
    </div>
    <keep-alive>
      <webview class="st-fp-iframe" ref="webviewEl" frameborder="0"></webview>
    </keep-alive>
  </div>
</template>

<script>
export default {
  props: [
    'tab',
  ],
  data() {
    return {
      inputUrl: this.tab.data.url,
    };
  },

  mounted () {
    console.log(this.$refs.webviewEl);
    this.$refs.webviewEl.setAttribute('src', this.tab.data.url);
  },

  beforeUpdate() {
    console.log('Im going to update');
  },
};
</script>

<style>
  .st-view-fullpage {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .st-fp-control-bar {
    display: flex;
    flex-direction: row;
    padding: 8px;
  }
  .st-fp-control-bar .ant-input {
    flex: 1;
    margin-right: 8px;
  }
  .st-fp-iframe {
    flex: 1;
  }
</style>
