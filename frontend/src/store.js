import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newsData: [],

    lastActiveTab: 'home',
    activeTab: 'home',
    tabList: [],
    tabIncrement: 0,
  },
  mutations: {
    setNewsData (state, data) {
      state.newsData = data;
    },
    addTab(state, tab) {
      state.tabIncrement += 1;
      tab.id = state.tabIncrement;
      state.tabList.push(tab);
      state.activeTab = `${tab.type}${tab.id}`;
    },
    removeTab(state, tabKey) {
      const tabPos = state.tabList.findIndex(tab => (`${tab.type}${tab.id}`) === tabKey);
      state.tabList.splice(tabPos, 1);

      const lastTabPos = state.tabList.findIndex(tab => (`${tab.type}${tab.id}`) === state.lastActiveTab);
      if (state.activeTab === tabKey) {
        state.activeTab = lastTabPos === -1 ? 'home' : state.lastActiveTab;
      } else {
        state.lastActiveTab = 'home';
      }
    },
    updateActiveTab(state, tabKey) {
      state.lastActiveTab = state.activeTab;
      state.activeTab = tabKey;
    },
    updateTabList(state, tabList) {
      state.tabList = tabList;
    },
  },
  actions: {

  },
});
