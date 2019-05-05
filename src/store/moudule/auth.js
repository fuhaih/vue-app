export default {
  namespaced: true,
  state: {
    auth: 1,
  },
  getters: {
    value: state => state.auth,
  },
  mutations: {
    updateValue(state) {
      state.auth += 1;
    },
  },
  actions: {
    updateValue({ commit, dispatch, rootState }) {
      window.console.log(rootState.auth);
      commit('updateValue');
      // 通过命名空间来调用test模块的action，这里需要用到{ root: true }
      // 使用commit来调用也是同理
      dispatch('test/updateValue', {}, { root: true });
    },
  },
};
