import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
});

// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export const store = new Vuex.Store({
//   state: {
//     key: 1,
//   },
//   mutations: {
//     increment(state, num) {
//       state.key += num;
//     },
//   },
// });
