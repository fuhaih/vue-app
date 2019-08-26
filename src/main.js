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
Vue.directive('toc', (el, binding) => {
  const GetNode = (hel) => {
    const nodeli = document.createElement('li');
    const text = document.createElement('a');
    // text.href = 'javascript:void(0)';
    text.innerHTML = hel.innerHTML;
    text.dataset.toc = hel.id;
    text.onclick = (item) => {
      const anchor = document.querySelector(`#${item.currentTarget.dataset.toc}`);
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      // 不同浏览器默认block不一样，这里直接指定为start
    };
    nodeli.appendChild(text);
    return nodeli;
  };
  const head = el.querySelectorAll('h1,h2,h3,h4,h5,h6,h7');
  const stack = [];
  const root = document.createElement('ul');
  let currentIndex = 0;
  let tag = 0;
  let currentparent = root;
  currentparent.dataset.level = 0;
  for (let i = 0; i < head.length; i += 1) {
    const index = head[i].tagName.substring(1);
    if (currentIndex > 0 && currentIndex < index) {
      const ulnode = document.createElement('ul');
      ulnode.dataset.level = index - 1;
      currentparent.appendChild(ulnode);
      stack.push(currentparent);
      currentparent = ulnode;
    } else if (currentIndex > 0 && currentIndex > index) {
      while (currentparent.dataset.level >= index) {
        currentparent = stack.pop();
      }
    }
    tag += 1;
    currentIndex = index;
    // head[i].id = `${currentparent.dataset.level}-${tag}`;
    head[i].id = `toc-${tag}`;
    const current = GetNode(head[i]);
    currentparent.appendChild(current);
  }
  // 目录插入位置
  if (binding.value === null || binding.value === undefined) {
    el.insertBefore(root, el.firstChild);
  } else {
    const content = document.querySelector(binding.value);
    if (content === null) {
      return;
    }
    content.innerHTML = '';
    content.appendChild(root);
  }
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
