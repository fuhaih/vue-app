import Vue from 'vue';
import Vuex from 'vuex';
// import mutations from './mutations';
// import state from './state';
import auth from './moudule/auth';
import other from './moudule/other';
import user from './moudule/user';

Vue.use(Vuex);

export default new Vuex.Store({
  // state,
  // mutations,
  modules: {
    auth,
    other,
    user,
  },
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
