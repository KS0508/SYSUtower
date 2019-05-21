import Vue from 'vue';

const state = {
  items: [],
};

const getters = {
  items: (state, getters, rootState) => state.items.map(news => ({
    ...news,
    is_favorite: rootState.favorite.items.indexOf(news.id) !== -1,
  })),
};

const actions = {
  async fetchSingleNews({
    dispatch, state, commit, rootState,
  }, id) {
    const data = await this._vm.$request.api('GET', `/news/${id}`);
    dispatch('updateSingleNews', data);
  },
  async updateSingleNews({
    dispatch, state, commit, rootState,
  }, news) {
    commit('updateSingleNews', news);
    if (news.is_favorite) {
      commit('favorite/addSingleFavorite', news.id, { root: true });
    } else {
      commit('favorite/deleteSingleFavorite', news.id, { root: true });
    }
  },
  async deleteSingleNews({
    dispatch, state, commit, rootState,
  }, id) {
    const data = await this._vm.$request.api('DELETE', `/news_del/${id}`);
  },
  async updateNewsList({
    dispatch, state, commit, rootState,
  }, newsList) {
    newsList.forEach(news => dispatch('updateSingleNews', news));
  },
};

const mutations = {
  updateSingleNews(state, newItem) {
    const newsPos = state.items.findIndex(news => news.id === newItem.id);
    if (newsPos === -1) {
      state.items.push(newItem);
      state.items.sort((front, back) => (front.id < back.id ? 1 : -1));
    } else {
      Vue.set(state.items, newsPos, { ...state.items[newsPos], ...newItem });
    }
  },
  deleteSingleNews(state, id) {
    const newsPos = state.items.findIndex(news => news.id === id);
    if (newsPos !== -1) {
      Vue.delete(state.items, newsPos);
    }
  },
  simplifySingleNews(state, id) {
    const newsPos = state.items.findIndex(news => news.id === id);
    if (newsPos !== -1) {
      Vue.delete(state.items[newsPos], 'content');
      Vue.delete(state.items[newsPos], 'attachments');
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
