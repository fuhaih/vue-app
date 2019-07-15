// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import ZhCN from 'vee-validate/dist/locale/zh_CN';
// import Veevalidae, { Validator } from 'vee-validate';
// import App from './App';
import MyApp from './CustomApp';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
// Vue.use(Veevalidae);
// Vue.use(iView);
Vue.directive('highlight', (el) => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((bk) => {
    window.hljs.highlightBlock(bk);
  });
});
// Validator.localize('Zh_CN', ZhCN);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>',
  components: { MyApp },
  template: '<MyApp/>',
});
