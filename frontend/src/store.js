import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newsData: [],

    lastActiveTab: 'home',
    activeTab: 'home',
    tabList: {},
    tabIncrement: 0,
  },
  mutations: {
    setNewsData(state, data) {
      state.newsData = data;
    },
    addTab(state, tab) {
      const tabArray = Object.entries(state.tabList);
      let existTab;
      if (tab.type === 'fullText') {
        existTab = tabArray.find(obj => obj[1].data.newsID === tab.data.newsID);
      } else {
        existTab = tabArray.find(obj => obj[1].data.url === tab.data.url);
      }

      if (existTab) {
        state.lastActiveTab = state.activeTab;
        state.activeTab = existTab[0];
      } else {
        state.tabIncrement += 1;
        tab.id = `${state.tabIncrement}`;
        Vue.set(state.tabList, tab.id, tab);
        state.activeTab = `${tab.id}`;
      }
    },
    removeTab(state, tabKey) {
      Vue.delete(state.tabList, tabKey);

      if (state.activeTab === tabKey) {
        state.activeTab = state.tabList[state.lastActiveTab] ? state.lastActiveTab : 'home';
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
    updateTabTitle(state, {id, title}) {
      Vue.set(state.tabList[id], 'name', title);
      console.log(id, title);
    },
    updateTabURL(state, {id, url}) {
      Vue.set(state.tabList[id].data, 'url', url);
      console.log(id, url);
    }
  },
  actions: {

  },
});
