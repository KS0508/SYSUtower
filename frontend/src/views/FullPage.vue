<template>
  <div class="st-view-fullpage">
    <div class="st-fp-control-bar">
      <a-input :value="currentLocation"/>
      <a-button-group>
        <a-button icon="reload" @click.native="doRefresh">刷新</a-button>
        <a-button icon="paper-clip" @click.native="doCopy">复制链接</a-button>
        <!--<a-button icon="paper-clip" @click.native="doDebug">Debug</a-button>-->
      </a-button-group>
    </div>
    <keep-alive>
      <webview class="st-fp-iframe" ref="webviewEl" frameborder="0"></webview>
    </keep-alive>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  props: [
    'tab',
  ],
  computed: {
    currentLocation() {
      return this.$store.state.tabList[this.tab.id].data;
    },
  },
  methods: {
    doRefresh() {
      this.$refs.webviewEl.reload();
    },
    doCopy() {
      require('electron').clipboard.writeText(this.$refs.webviewEl.getURL());
      this.$message.success('链接已复制 🎉');
    },
    doDebug() {
      console.log('currentLocation', this.currentLocation);
      console.log('$store', this.$store.state.tabList[this.tab.id].data);
    },
  },

  mounted() {
    this.$refs.webviewEl.setAttribute('src', this.tab.data);
    this.$refs.webviewEl.addEventListener('page-title-updated', (event) => {
      this.$store.commit('updateTabTitle', { id: this.tab.id, title: event.title });
    });
    this.$refs.webviewEl.addEventListener('did-navigate', (event) => {
      this.$store.commit('updateTabURL', { id: this.tab.id, url: event.url });
      console.log(event.url);
    });
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
