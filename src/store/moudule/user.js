export default {
  namespaced: true,
  state: {
    user: 1,
  },
  getters: {
    value: state => state.user,
  },
  mutations: {
    updateValue(state) {
      state.user += 1;
    },
  },
  actions: {
    updateValue({ commit }) {
      commit('updateValue');
    },
  },
};
