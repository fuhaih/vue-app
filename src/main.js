// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ZhCN from 'vee-validate/dist/locale/zh_CN';
import Veevalidae, { Validator } from 'vee-validate';
import App from './App';
import router from './router';
import store from './store';


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Veevalidae);
Validator.localize('Zh_CN', ZhCN);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
