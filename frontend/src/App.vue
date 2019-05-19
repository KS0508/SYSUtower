<template>
  <div id="app">
    <a-layout class="layout" style="height: 100%;">
      <a-layout-header>
        <a-tabs
          v-model="activeTab"
          type="editable-card"
          @edit="onTabEdit">
          <a-tab-pane tab="Home" key="home" :closable="false">
            <!--<keep-alive>
              <home />
            </keep-alive>-->
          </a-tab-pane>
          <a-tab-pane v-for="tab in tabList" :tab="tab.name" :key="tab.type + tab.id">
              <!--<keep-alive>
                <full-text v-if="tab.type === 'fullText'" :tab="tab" />
                <full-page v-if="tab.type === 'fullPage'" :tab="tab" />
              </keep-alive>-->
          </a-tab-pane>
        </a-tabs>
      </a-layout-header>
      <a-layout-content>
        <div class="st-view-container">
          <div class="st-view-tab" key="home">
            <home />
          </div>
          <div class="st-view-tab" v-for="tab in tabList"
            :key="tab.type + tab.id"
            :style="{visibility: true}">
            <full-text v-if="tab.type === 'fullText'" :tab="tab" />
            <full-page v-else-if="tab.type === 'fullPage'" :tab="tab" />
          </div>
        </div>
      </a-layout-content>
      <!--<a-layout-footer style="text-align: center">
        SYSU Tower Project / Made with ❤
      </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<script>
import Home from '@/views/Home.vue';
import FullText from '@/views/FullText.vue';
import FullPage from '@/views/FullPage.vue';

async function initializeData() {
  const homeData = await this.$request.api('GET', '/home');
  try {
    const homeDataJSON = JSON.parse(homeData);
    this.$store.commit('setNewsData', homeDataJSON);
  } catch (err) {
    // Do nothing
    console.log(err);
  }
}

export default {
  components: {
    Home,
    FullText,
    FullPage,
  },

  computed: {
    activeTab: {
      get() {
        return this.$store.state.activeTab;
      },
      set(tabKey) {
        this.$store.commit('updateActiveTab', tabKey);
      },
    },
    tabList: {
      get() {
        return this.$store.state.tabList;
      },
      set(value) {
        this.$store.commit('updateTabList', value);
      },
    },
  },
  methods: {
    onTabEdit(key, action) {
      if (action === 'remove') {
        this.$store.commit('removeTab', key);
      }
    },
    debug(type) {
      console.log(type);
    }
  },

  mounted() {
    initializeData.call(this);
  },
};
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

.ant-layout-header {
  background: transparent;
  padding: 0;
  height: auto;
}

.ant-tabs-card > .ant-tabs-bar {
  margin: 0;
  border-color: #fff;
  -webkit-app-region: drag;
}

.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
  -webkit-app-region: no-drag;
}

.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}

.st-view-container {
  background: #fff;
  height: 100%;
}
</style>
