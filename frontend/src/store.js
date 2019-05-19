import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newsData: [],

    tabTypes: {
      home: {
        name: '首页',
        icon: 'home',
        single: true,
        priority: 0,
        prohibitClose: true,
      },
      subscription: {
        name: '订阅管理',
        icon: 'home',
        single: true,
        priority: 2,
      },
      addSubscription: {
        name: '添加订阅',
        icon: 'plus',
        single: true,
        priority: 1,
      },
      sourceBrowser: {
        name: '分类浏览',
        icon: 'home',
        single: false,
        priority: 4,
      },
      favorite: {
        name: '收藏管理',
        icon: 'star',
        single: true,
        priority: 3,
      },
      fullText: {
        name: '阅读全文',
        icon: 'read',
        single: false,
        singleDataField: 'id',
        priority: 5,
      },
      fullPage: {
        name: '原文浏览',
        icon: 'full-text',
        single: false,
        singleDataField: 'url',
        priority: 6,
      },
    },

    lastActiveTab: 'home',
    activeTab: 'home',
    tabList: {},
    tabListOrder: [],

    tabIncrement: 0,
  },
  mutations: {
    setNewsData(state, data) {
      state.newsData = data;
    },
    addTab(state, tab) {
      const tabArray = Object.entries(state.tabList);
      let existTab;

      const currentTabType = state.tabTypes[tab.type];

      if (currentTabType.single) {
        existTab = tabArray.find(obj => obj[1].type === tab.type);
      } else {
        existTab = tabArray.find(obj =>
          (obj[1].type === tab.type) &&
          (obj[1].data[currentTabType.singleDataField] === tab.data[currentTabType.singleDataField]));
      }

      state.lastActiveTab = state.activeTab;
      
      if (existTab) {
        state.activeTab = existTab[0];
      } else {
        if (currentTabType.single) {
          tab.id = `${tab.type}`;
        } else {
          state.tabIncrement += 1;
          tab.id = `${state.tabIncrement}`;
        }
        Vue.set(state.tabList, tab.id, tab);
        state.tabListOrder.push(tab.id);
        state.activeTab = tab.id;
      }
    },
    removeTab(state, tabKey) {
      Vue.delete(state.tabList, tabKey);
      state.tabListOrder.splice(state.tabListOrder.indexOf(tabKey), 1);

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
