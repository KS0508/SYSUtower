<template>
  <div id="app">
    <a-layout class="layout" style="height: 100%;">
      <a-layout-header>
        <a-tabs
          v-model="activeTab"
          type="editable-card"
          :tabBarGutter="6"
          :hideAdd="true"
          @edit="onTabEdit">
          <a-tab-pane v-for="tabPos in tabListOrder"
            :key="tabPos"
            :closable="!tabTypes[tabList[tabPos].type].prohibitClose">
            <span slot="tab" class="st-tab-text" :title="tabList[tabPos].name">
              <a-icon :type="tabTypes[tabList[tabPos].type].icon" />{{ tabList[tabPos].name ? tabList[tabPos].name : tabTypes[tabList[tabPos].type].name }}
            </span>
          </a-tab-pane>
          <div slot="tabBarExtraContent">
            <a-tooltip title="首页">
              <a-button 
                class="st-tab-extra-btn" 
                shape="circle" size="small" icon="home"
                @click.native="openFunctionTab('home')" />
            </a-tooltip>
            <a-tooltip title="刷新订阅" placement="bottom">
              <a-button 
                class="st-tab-extra-btn"
                shape="circle"
                size="small"
                :icon="loading ? 'loading': 'reload'"
                :disabled="loading ? true : false"
                @click.native="doRefresh" />
            </a-tooltip>
            <a-tooltip title="我的订阅">
              <a-button class="st-tab-extra-btn"
                shape="circle" size="small" icon="user"
                @click.native="openFunctionTab('addSubscription')" />
            </a-tooltip>
            <a-tooltip title="收藏夹">
              <a-button class="st-tab-extra-btn"
                shape="circle" size="small" icon="star"
                @click.native="openFunctionTab('favorite')" />
            </a-tooltip>
          </div>
        </a-tabs>
      </a-layout-header>
      <a-layout-content>
        <div class="st-view-container">
          <tab v-for="(tab, key) in tabList"
            :key="key"
            :tab="tab"
            :activeTab="activeTab" />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import Tab from '@/views/Tab.vue';
import { mapState } from 'vuex';

async function initializeData() {
  const homeData = await this.$request.api('GET', '/home?limit=6');
  this.$store.commit('setNewsData', homeData);
}

export default {
  components: {
    Tab,
  },

  data() {
    return {
      loading: false,
    };
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
    ...mapState([
      'tabTypes',
      'tabListOrder',
    ]),
  },
  methods: {
    onTabEdit(key, action) {
      if (action === 'remove') {
        this.$store.commit('removeTab', key);
      }
    },
    debug(type) {
      console.log(type);
    },
    async doRefresh() {
      this.loading = true;
      try {
        const data = await this.$request.api('POST', '/refresh');
        if (data === 'SUCCESS') {
          this.$message.success('刷新订阅成功👏');
        } else {
          throw data;
        }
        initializeData.call(this);
      } catch (e) {
        this.$message.error(`发生了错误 QwQ：${e}`);
      }
      this.loading = false;
    },

    openFunctionTab(type) {
      this.$store.commit('addTab', { type });
    },
  },

  mounted() {
    this.$store.commit('addTab', {
      type: 'home',
      id: 'home'
    })
    initializeData.call(this);
  },
};
</script>

<style lang="less">
* {
  -webkit-user-select: none;
}
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

.layout {
  overflow: hidden;
}

.st-tab-text {
  max-width: 200px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: top; /* Why? */
}

.ant-layout-header {
  background: transparent;
  padding: 12px 24px 0 12px;
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

.st-tab-extra-btn {
  margin: 0 2px;
}

.st-view-container {
  background: #fff;
  height: 100%;
}
</style>
