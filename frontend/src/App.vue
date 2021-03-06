<template>
  <div id="app">
    <a-spin :spinning="loadingStatus !== 'done'" :tip="loadingStatusDesc[loadingStatus]">
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
              <span slot="tab"
                class="st-tab-text"
                :title="tabList[tabPos].name"
                @mouseup.middle="onTabMiddleClick(tabPos)">
                <a-icon :type="tabTypes[tabList[tabPos].type].icon" />{{ tabList[tabPos].name
                  ? tabList[tabPos].name
                  : tabTypes[tabList[tabPos].type].name
                }}
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
            <a-popover
              placement="bottomRight">
              <template slot="content">
                <div class="st-auto-reload-panel" >
                  <a-switch
                    v-model="isAutoReload"
                  />
                  每 30 分钟自动刷新
                </div>
                <div>上次抓取时间：{{ lastRefreshTime.format('YYYY-MM-DD HH:mm:ss') }}</div>
              </template>
                <a-button class="st-tab-extra-btn"
                  shape="circle" size="small" icon="clock-circle" />
            </a-popover>
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
    </a-spin>
  </div>
</template>

<script>
import { remote, ipcRenderer } from 'electron';
import { mapState } from 'vuex';

import Tab from '@/views/Tab.vue';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export default {
  components: {
    Tab,
  },

  data() {
    return {
      loading: false,
      isAutoReload: true,
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
      'lastRefreshTime',
      'loadingStatus',
      'loadingStatusDesc',
    ]),
  },
  methods: {
    onTabEdit(key, action) {
      if (action === 'remove') {
        if (this.$store.getters.tabType(key) === 'fullText') {
          // It's a full news & let's simplify it
          console.log('simplify now!');
          this.$store.commit('news/simplifySingleNews', this.$store.getters.tabData(key));
        }
        this.$store.commit('removeTab', key);
      }
    },
    onTabMiddleClick(key) {
      if (key !== 'home') {
        this.onTabEdit(key, 'remove');
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
        await this.$store.dispatch('subscriptions/fetchHome');

        // Find news
        const newNewsList = this.$store.state.news.items.filter((news) => {
          const isNew = dayjs(news.fetchTime, 'YYYY-MM-DD HH:mm:ss')
            .isAfter(this.$store.state.lastRefreshTime);
          return isNew;
        });

        if (newNewsList.length === 1) {
          const singleNotification = new Notification(newNewsList[0].title, {
            body: newNewsList[0].excerpt,
          });
          singleNotification.onclick = () => {
            this.$store.commit('addTab', {
              type: 'fullText',
              name: newNewsList[0].title,
              data: newNewsList[0].id,
            });
            remote.getCurrentWindow().show();
            remote.getCurrentWindow().focus();
          };
        } else if (newNewsList.length > 1) {
          const singleNotification = new Notification(`有 ${newNewsList.length} 条新的逸仙通知`, {
            body: newNewsList.slice(0, 3).map(news => news.title).join('\n'),
          });
          singleNotification.onclick = () => {
            this.$store.commit('addTab', {
              type: 'home',
            });
            remote.getCurrentWindow().show();
            remote.getCurrentWindow().focus();
          };
        }
        this.$store.commit('updateLastRefreshTime', dayjs());
      } catch (e) {
        this.$message.error(`发生了错误 QwQ：${e}`);
      }
      this.loading = false;
    },

    openFunctionTab(type) {
      this.$store.commit('addTab', { type });
    },
    async doAutoRefresh() {
      if (this.isAutoReload) {
        await this.doRefresh();
      }
      setTimeout(this.doAutoRefresh, 1800000);
    },

    toggleAutoReload() {
      this.isAutoReload = !this.isAutoReload;
    },
  },

  mounted() {
    this.$store.commit('addTab', {
      type: 'home',
      id: 'home',
    });

    // Starting backend
    ipcRenderer.on('startedBackendServer', async (event, port) => {
      this.$request.init(port);
      this.$store.commit('updateLoadingStatus', 'firstRefresh');
      await this.doRefresh();
      this.$store.commit('updateLoadingStatus', 'done');

      setTimeout(() => {
        this.doAutoRefresh.call(this);
      }, 1800000);
    });
    ipcRenderer.send('startBackendServer');
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
  background-color: #f0f2f5;
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

.ant-spin-nested-loading, .ant-spin-nested-loading > .ant-spin-container {
  height: 100%;
}
.ant-spin-nested-loading > div > .ant-spin {
  max-height: 100%;
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
.st-auto-reload-panel {
  margin-bottom: 8px;
}

.st-view-container {
  background: #fff;
  height: 100%;
}
</style>
