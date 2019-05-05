export default {
  namespaced: true,
  state: {
    test: 1,
  },
  getters: {
    value: state => state.test,
  },
  mutations: {
    updateValue(state) {
      state.test += 1;
    },
  },
  actions: {
    updateValue({ commit }) {
      commit('updateValue');
    },
  },
};
