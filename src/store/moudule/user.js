export default {
  namespaced: true,
  state: {
    Num: 1,
  },
  getters: {
    value: state => state.Num,
  },
  mutations: {
    updateValue(state) {
      state.Num += 1;
    },
  },
  actions: {
    updateValue({ commit }) {
      commit('updateValue');
    },
  },
};
