<template>
  <div id="app">
    <a-layout class="layout" style="height: 100%;">
      <a-layout-content>
        <a-tabs
          v-model="activeTab"
          type="editable-card"
          @edit="onTabEdit">
          <a-tab-pane style="padding: 24px;" tab="Home" key="home" :closable="false">
            <home />
          </a-tab-pane>
          <a-tab-pane v-for="tab in tabList" :tab="tab.name" :key="tab.type + tab.id">
            <full-text v-if="tab.type === 'fullText'" :tab="tab" />
            <web-view v-else-if="tab.type === 'webView'" :tab="tab" />
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        SYSU Tower Project / Made with ❤
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Home from '@/views/Home.vue';
import FullText from '@/views/FullText.vue';
import WebView from '@/views/WebView.vue';

export default {
  components: {
    Home,
    FullText,
    WebView,
  },

  computed: {
    activeTab: {
      get () {
        return this.$store.state.activeTab || 'home';
      },
      set (tabKey) {
        this.$store.commit('updateActiveTab', tabKey)
      }
    },
    ...mapState([
      'tabList'
    ])
  },
  methods: {
    onTabEdit (key, action) {
      if (action === 'remove') {

      }
    }
  }
}
</script>


<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.ant-tabs-card > .ant-tabs-content {
  margin-top: -16px;
}

.ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
