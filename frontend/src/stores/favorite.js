const state = {
  items: [],
};

const getters = {
  items: (state, getters, rootState) => state.items.map(fav => rootState.news.items.find(news => news.id === fav)),
};

const actions = {
  async fetchFavorite({ state, commit, rootState }) {
    const data = await this._vm.$request.api('GET', '/favorites');
    commit('updateFavoriteData', data.map(fav => fav.id));
  },
  async addSingleFavorite({ state, commit, rootState }, id) {
    commit('addSingleFavorite', id);
    const data = await this._vm.$request.api('POST', `/favorites/${id}`);
    if (data === 'SUCCESS') {
      this._vm.$message.success('收藏成功 👏');
    } else {
      this._vm.$message.error('收藏失败 😰');
      commit('deleteSingleFavorite', id);
    }
  },
  async deleteSingleFavorite({ state, commit, rootState }, id) {
    commit('deleteSingleFavorite', id);
    const data = await this._vm.$request.api('DELETE', `/favorites/${id}`);
    if (data === 'SUCCESS') {
      this._vm.$message.success('取消收藏成功 👏');
    } else {
      this._vm.$message.error('取消收藏失败 😰');
      commit('addSingleFavorite', id);
    }
  },
};

const mutations = {
  updateFavoriteData(state, data) {
    state.items = data;
  },
  addSingleFavorite(state, id) {
    if (state.items.indexOf(id) === -1) {
      state.items.unshift(id);
    }
  },
  deleteSingleFavorite(state, id) {
    const favoritePos = state.items.indexOf(id);
    if (favoritePos !== -1) {
      state.items.splice(favoritePos, 1);
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
