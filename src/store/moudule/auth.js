export default {
  // 命名空间，当不设置命名空间时，该moudule所有元素会放在root下，需要注意不同moudule间的命名冲突
  namespaced: true,
  state: {
    Num: 1,
  },
  getters: {
    value: state => state.Num,
    // value: (state) => {
    //   if (state.Num === 1) {
    //     return state.Num;
    //   }
    //   return state.Num;
    // },
  },
  mutations: {
    updateValue(state) {
      state.Num += 1;
    },
  },
  actions: {
    updateValue({ commit, dispatch, rootState }) {
      // auth moudule state
      window.console.log(rootState.auth.Num);
      commit('updateValue');
      // 通过命名空间来调用test模块的action，这里需要用到{ root: true }
      // 使用commit来调用也是同理
      dispatch('other/updateValue', {}, { root: true });
    },
  },
};
