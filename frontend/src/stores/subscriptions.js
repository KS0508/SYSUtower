/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_vm"] }] */
/* eslint no-param-reassign: ["error", {
  "props": true,
  "ignorePropertyModificationsFor": ["state"],
}] */

const state = {
  items: [],
  newlyAdded: [],
};

const getters = {
  items: (state, rootGetters) => state.items.map(sub => ({
    ...sub,
    news: rootGetters['news/items'].filter(news => news.sourceID === sub.id),
  })),
};

const actions = {
  async fetchSubscription({ commit }) {
    const data = await this._vm.$request.api('GET', '/subscriptions');
    commit('updateSubscriptionData', data);
  },
  async fetchSubscriptionNews({ dispatch }, id) {
    const data = await this._vm.$request.api('GET', `/sources/${id}`);
    dispatch('news/updateNewsList', data.news, { root: true });
  },
  async fetchHome({ dispatch, commit }) {
    const data = await this._vm.$request.api('GET', '/home?limit=6');
    data.forEach((sub) => {
      dispatch('news/updateNewsList', sub.news, { root: true });
    });
    commit('updateSubscriptionData', data);
  },
  async addSingleSubscription({ commit }, source) {
    commit('addSingleSubscription', source);
    const ret = await this._vm.$request.api('POST', `/subscriptions/${source.id}`);
    if (ret === 'SUCCESS') {
      this._vm.$message.success(`订阅 ${source.department} - ${source.name} 成功 👏`);
    } else {
      commit('deleteSingleSubscription', source);
      this._vm.$message.error(`订阅 ${source.department} - ${source.name} 失败...😥`);
    }
  },
  async deleteSingleSubscription({ commit }, source) {
    commit('deleteSingleSubscription', source);
    const ret = await this._vm.$request.api('DELETE', `/subscriptions/${source.id}`);
    if (ret === 'SUCCESS') {
      this._vm.$message.success(`取消订阅 ${source.department} - ${source.name} 成功 👏`);
    } else {
      commit('addSingleSubscription', source);
      this._vm.$message.error(`取消订阅 ${source.department} - ${source.name} 失败...😥`);
    }
  },
};

const mutations = {
  updateSubscriptionData(state, data) {
    state.items = data;
  },
  addSingleSubscription(state, source) {
    const subPos = state.items.findIndex(sub => sub.id === source.id);
    if (subPos === -1) {
      state.items.push({
        id: source.id,
        name: source.name,
        department: source.department,
        is_just_added: true,
      });
    }
  },
  deleteSingleSubscription(state, source) {
    const subPos = state.items.findIndex(sub => sub.id === source.id);
    if (subPos !== -1) {
      state.items.splice(subPos, 1);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
