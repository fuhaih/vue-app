
export default {
  increment(state, num) {
    state.key += num;
    state.name = state.key;
  },
};
